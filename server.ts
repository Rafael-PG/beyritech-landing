import express from "express";
import path from "path";
import fs from "fs";
import zlib from "zlib";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import mysql from "mysql2/promise";
import crypto from "crypto";
import multer from "multer";
import sharp from "sharp";
import dotenv from "dotenv";

dotenv.config();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

function stripHtml(html: string): string {
  return (html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadTime(html: string, fallback: string): string {
  const text = stripHtml(html);
  if (!text) return fallback || "5 min";
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min lectura`;
}

// Pre-compress static assets with brotli at startup (faster than gzip, ~20% smaller)
const brotliCache = new Map<string, { data: Buffer; type: string }>();

function compressStaticAssets(distPath: string) {
  const assetsDir = path.join(distPath, "assets");
  if (!fs.existsSync(assetsDir)) return;
  const files = fs.readdirSync(assetsDir);
  for (const file of files) {
    if (file.endsWith(".js") || file.endsWith(".css")) {
      const filePath = path.join(assetsDir, file);
      const content = fs.readFileSync(filePath);
      const compressed = zlib.brotliCompressSync(content, {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 4,
          [zlib.constants.BROTLI_PARAM_SIZE_HINT]: content.length,
        },
      });
      const type = file.endsWith(".js") ? "application/javascript" : "text/css";
      brotliCache.set(`/assets/${file}`, { data: compressed, type });
    }
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  if (process.env.NODE_ENV === "production") {
    app.use(compression());
    app.use(helmet({
      contentSecurityPolicy: false,
    }));
    const distPath = path.join(process.cwd(), "dist");
    compressStaticAssets(distPath);
  }
  app.use(express.json({ limit: "5mb" }));

  // Rate limiter for contact endpoint
  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: "Demasiadas solicitudes. Intente en 15 minutos." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Pre-cache resources at startup (avoid sync I/O in request handlers)
  const logoPath = path.join(process.cwd(), "public/logo/beyritech-logo.png");
  let logoAttachment: Buffer | undefined;
  if (fs.existsSync(logoPath)) {
    logoAttachment = fs.readFileSync(logoPath);
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // MySQL pool
  const db = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "landing_beyritech",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Rate limiter for API reads
  const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Rate limiter for tracking endpoints
  const trackLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: { error: "Demasiadas solicitudes. Intente en 15 minutos." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  const ALLOWED_MODELS = ["multispace", "doble-ala", "mini-doble-ala"];
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function clientIp(req: any): string | null {
    const forwarded = req.headers["x-forwarded-for"];
    const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded;
    return (ip || req.socket?.remoteAddress || req.ip || null)?.slice(0, 45) || null;
  }

  function trackMetadata(req: any, body: any) {
    return {
      page: typeof body.page === "string" ? body.page.slice(0, 255) : null,
      referer: typeof body.referer === "string" ? body.referer.slice(0, 255) : null,
      source: typeof body.source === "string" ? body.source.slice(0, 50) : "organic",
      user_agent: req.headers["user-agent"]?.slice(0, 255) || null,
      ip: clientIp(req),
    };
  }

  // API: WhatsApp click tracking
  app.post("/api/track/whatsapp-click", trackLimiter, async (req, res) => {
    try {
      const m = trackMetadata(req, req.body);
      await db.execute(
        "INSERT INTO whatsapp_clicks (page, referer, source, user_agent, ip) VALUES (?, ?, ?, ?, ?)",
        [m.page, m.referer, m.source, m.user_agent, m.ip]
      );
      res.json({ success: true });
    } catch (err) {
      console.error("WhatsApp click tracking error:", err);
      res.status(500).json({ error: "Error al registrar la interacción." });
    }
  });

  // API: WhatsApp lead tracking
  app.post("/api/track/whatsapp-lead", trackLimiter, async (req, res) => {
    try {
      const { modelo, message } = req.body;
      const modelName = typeof modelo === "string" ? modelo.trim() : "";
      if (!modelName) {
        return res.status(400).json({ error: "Seleccione un modelo." });
      }
      const m = trackMetadata(req, req.body);
      await db.execute(
        "INSERT INTO whatsapp_leads (modelo, message, page, referer, source, user_agent, ip) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [modelName.slice(0, 100), typeof message === "string" ? message.slice(0, 2000) : null, m.page, m.referer, m.source, m.user_agent, m.ip]
      );
      res.json({ success: true });
    } catch (err) {
      console.error("WhatsApp lead tracking error:", err);
      res.status(500).json({ error: "Error al registrar el lead." });
    }
  });

  // API: Ficha técnica lead tracking
  app.post("/api/track/ficha-download", trackLimiter, async (req, res) => {
    try {
      const { email, modelo } = req.body;
      const em = typeof email === "string" ? email.trim() : "";
      const slug = typeof modelo === "string" ? modelo.trim() : "";
      if (!EMAIL_REGEX.test(em)) {
        return res.status(400).json({ error: "Correo electrónico inválido." });
      }
      if (!ALLOWED_MODELS.includes(slug)) {
        return res.status(400).json({ error: "Modelo no válido." });
      }
      const m = trackMetadata(req, req.body);
      await db.execute(
        "INSERT INTO ficha_leads (email, modelo, page, referer, source, user_agent, ip) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [em.slice(0, 255), slug, m.page, m.referer, m.source, m.user_agent, m.ip]
      );
      res.json({ success: true });
    } catch (err) {
      console.error("Ficha lead tracking error:", err);
      res.status(500).json({ error: "Error al registrar el lead." });
    }
  });

  // ─── API: Blog ────────────────────────────────────────
  app.get("/api/blog", apiLimiter, async (_req, res) => {
    try {
      const [rows] = await db.execute(
        "SELECT idBlog, slug, modelo, title, excerpt, date, author, readTime, image, featured, trafficRank, isNew, keywords FROM blog_posts WHERE published = TRUE ORDER BY date DESC"
      );
      res.json(rows);
    } catch (err) {
      console.error("Blog list error:", err);
      res.status(500).json({ error: "Error al obtener artículos." });
    }
  });

  app.get("/api/blog/:modelo/:slug", apiLimiter, async (req, res) => {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM blog_posts WHERE modelo = ? AND slug = ? AND published = TRUE",
        [req.params.modelo, req.params.slug]
      );
      const posts = rows as any[];
      if (posts.length === 0) {
        return res.status(404).json({ error: "Artículo no encontrado." });
      }
      res.json(posts[0]);
    } catch (err) {
      console.error("Blog single error:", err);
      res.status(500).json({ error: "Error al obtener el artículo." });
    }
  });

  // ─── API: Casos de éxito ──────────────────────────────
  app.get("/api/casos-exito", apiLimiter, async (_req, res) => {
    try {
      const [rows] = await db.execute(
        "SELECT idCasos, slug, modelo, title, excerpt, date, author, readTime, image, featured, trafficRank, isNew, keywords FROM casos_exito WHERE published = TRUE ORDER BY date DESC"
      );
      res.json(rows);
    } catch (err) {
      console.error("Casos list error:", err);
      res.status(500).json({ error: "Error al obtener casos de éxito." });
    }
  });

  app.get("/api/casos-exito/:modelo/:slug", apiLimiter, async (req, res) => {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM casos_exito WHERE modelo = ? AND slug = ? AND published = TRUE",
        [req.params.modelo, req.params.slug]
      );
      const casos = rows as any[];
      if (casos.length === 0) {
        return res.status(404).json({ error: "Caso de éxito no encontrado." });
      }
      res.json(casos[0]);
    } catch (err) {
      console.error("Casos single error:", err);
      res.status(500).json({ error: "Error al obtener el caso de éxito." });
    }
  });

  // API Route: Contact form — send email notification
  app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      const { name, company, email, phone, industry, moduleType, area, capacity, location, sustainability, insulation, timeline, additionalSpecs } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required." });
      }

      const html = buildEmailTemplate({ name, company, email, phone, industry, moduleType, area, capacity, location, sustainability, insulation, timeline, additionalSpecs });

      const mailOptions: any = {
        from: `"Beyritech Web" <${process.env.SMTP_USER}>`,
        to: process.env.EMAIL_TO || "asistente.comercial@beyritech.com",
        replyTo: email || undefined,
        subject: `Nueva cotización — ${name} — ${moduleType || "Módulo"}`,
        html,
      };

      if (logoAttachment) {
        mailOptions.attachments = [
          {
            filename: "beyritech-logo.png",
            content: logoAttachment,
            cid: "logo@beyritech",
          },
        ];
      }

      await transporter.sendMail(mailOptions);

      res.json({ success: true, message: "Solicitud enviada correctamente." });
    } catch (error: any) {
      console.error("Email send failed:", error);
      res.status(500).json({ error: "Error al enviar el correo. Intente nuevamente." });
    }
  });

  // ─── Dashboard: autenticación y datos ─────────────────
  const DASHBOARD_PASSWORD = process.env.DASHBOARD_PASSWORD || "MEGUSTA.trabajar#26";
  const sessions = new Map<string, number>();

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: "Demasiados intentos. Intente en 15 minutos." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  function isAuthed(req: any): boolean {
    const header = req.headers["authorization"] || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token || !sessions.has(token)) return false;
    const lastSeen = sessions.get(token)!;
    if (Date.now() - lastSeen > 8 * 60 * 60 * 1000) {
      sessions.delete(token);
      return false;
    }
    sessions.set(token, Date.now());
    return true;
  }

  function requireAuth(req: any, res: any, next: any) {
    if (!isAuthed(req)) {
      return res.status(401).json({ error: "No autorizado." });
    }
    next();
  }

  app.post("/api/login", loginLimiter, async (req, res) => {
    const { password } = req.body || {};
    if (typeof password !== "string" || password !== DASHBOARD_PASSWORD) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }
    const token = crypto.randomUUID();
    sessions.set(token, Date.now());
    res.json({ token });
  });

  app.get("/api/dashboard/whatsapp-clicks", requireAuth, async (_req, res) => {
    try {
      const [rows] = await db.execute(
        "SELECT idClicks, page, referer, source, user_agent, created_at FROM whatsapp_clicks ORDER BY created_at DESC LIMIT 1000"
      );
      res.json(rows);
    } catch (err) {
      console.error("Dashboard whatsapp-clicks error:", err);
      res.status(500).json({ error: "Error al obtener datos." });
    }
  });

  app.get("/api/dashboard/whatsapp-leads", requireAuth, async (_req, res) => {
    try {
      const [rows] = await db.execute(
        "SELECT idWspLead, modelo, message, page, referer, source, created_at FROM whatsapp_leads ORDER BY created_at DESC LIMIT 1000"
      );
      res.json(rows);
    } catch (err) {
      console.error("Dashboard whatsapp-leads error:", err);
      res.status(500).json({ error: "Error al obtener datos." });
    }
  });

  app.get("/api/dashboard/ficha-leads", requireAuth, async (_req, res) => {
    try {
      const [rows] = await db.execute(
        "SELECT idFichaLead, email, modelo, page, referer, source, created_at FROM ficha_leads ORDER BY created_at DESC LIMIT 1000"
      );
      res.json(rows);
    } catch (err) {
      console.error("Dashboard ficha-leads error:", err);
      res.status(500).json({ error: "Error al obtener datos." });
    }
  });

  // ─── CMS Admin: Blog y Casos de éxito ─────────────────
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 8 * 1024 * 1024 },
  });

  function validateModel(modelo: any): string | null {
    if (!ALLOWED_MODELS.includes(modelo)) return null;
    return modelo;
  }

  function pickPostMeta(body: any) {
    return {
      title: typeof body.title === "string" ? body.title.trim() : "",
      excerpt: typeof body.excerpt === "string" ? body.excerpt.trim() : "",
      content: typeof body.content === "string" ? body.content : "",
      date: body.date || new Date().toISOString().slice(0, 19).replace("T", " "),
      author: typeof body.author === "string" ? body.author.trim() : "Beyritech",
      readTime: typeof body.readTime === "string" ? body.readTime.trim() : "",
      image: typeof body.image === "string" ? body.image : null,
      keywords: typeof body.keywords === "string" ? body.keywords.trim() : null,
      featured: body.featured === true || body.featured === 1 ? 1 : 0,
      trafficRank: Number.isFinite(Number(body.trafficRank)) ? Number(body.trafficRank) : 0,
      isNew: body.isNew === true || body.isNew === 1 ? 1 : 0,
      slug: typeof body.slug === "string" && body.slug.trim() ? slugify(body.slug) : "",
      published: body.published === true || body.published === 1 ? 1 : 0,
    };
  }

  // Listado admin (incluye borradores)
  app.get("/api/admin/blog", requireAuth, async (_req, res) => {
    try {
      const [rows] = await db.execute(
        "SELECT idBlog, slug, modelo, title, excerpt, date, author, readTime, image, featured, trafficRank, isNew, keywords, published, createdAt, updatedAt FROM blog_posts ORDER BY updatedAt DESC"
      );
      res.json(rows);
    } catch (err) {
      console.error("Admin blog list error:", err);
      res.status(500).json({ error: "Error al obtener artículos." });
    }
  });

  app.get("/api/admin/blog/:id", requireAuth, async (req, res) => {
    try {
      const [rows] = await db.execute("SELECT * FROM blog_posts WHERE idBlog = ?", [req.params.id]);
      const posts = rows as any[];
      if (!posts.length) return res.status(404).json({ error: "Artículo no encontrado." });
      res.json(posts[0]);
    } catch (err) {
      console.error("Admin blog single error:", err);
      res.status(500).json({ error: "Error al obtener el artículo." });
    }
  });

  app.post("/api/admin/blog", requireAuth, async (req, res) => {
    try {
      const modelo = validateModel(req.body.modelo);
      if (!modelo) return res.status(400).json({ error: "Modelo no válido." });
      const m = pickPostMeta(req.body);
      if (!m.slug || !m.title) return res.status(400).json({ error: "Slug y título son obligatorios." });
      m.readTime = m.readTime || estimateReadTime(m.content, "5 min");
      const [check] = await db.execute("SELECT idBlog FROM blog_posts WHERE modelo = ? AND slug = ?", [modelo, m.slug]);
      if ((check as any[]).length) return res.status(409).json({ error: "Ya existe un artículo con ese slug en este modelo." });
      const [result]: any = await db.execute(
        "INSERT INTO blog_posts (slug, modelo, title, excerpt, content, date, author, readTime, image, featured, trafficRank, isNew, keywords, published) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [m.slug, modelo, m.title, m.excerpt, m.content, m.date, m.author, m.readTime, m.image, m.featured, m.trafficRank, m.isNew, m.keywords, m.published || 1]
      );
      res.status(201).json({ id: result.insertId });
    } catch (err) {
      console.error("Admin blog create error:", err);
      res.status(500).json({ error: "Error al crear el artículo." });
    }
  });

  app.put("/api/admin/blog/:id", requireAuth, async (req, res) => {
    try {
      const modelo = validateModel(req.body.modelo);
      if (!modelo) return res.status(400).json({ error: "Modelo no válido." });
      const m = pickPostMeta(req.body);
      if (!m.slug || !m.title) return res.status(400).json({ error: "Slug y título son obligatorios." });
      m.readTime = m.readTime || estimateReadTime(m.content, "5 min");
      const [check] = await db.execute(
        "SELECT idBlog FROM blog_posts WHERE modelo = ? AND slug = ? AND idBlog <> ?",
        [modelo, m.slug, req.params.id]
      );
      if ((check as any[]).length) return res.status(409).json({ error: "Ya existe un artículo con ese slug en este modelo." });
      await db.execute(
        "UPDATE blog_posts SET slug=?, modelo=?, title=?, excerpt=?, content=?, date=?, author=?, readTime=?, image=?, featured=?, trafficRank=?, isNew=?, keywords=?, published=? WHERE idBlog=?",
        [m.slug, modelo, m.title, m.excerpt, m.content, m.date, m.author, m.readTime, m.image, m.featured, m.trafficRank, m.isNew, m.keywords, m.published || 1, req.params.id]
      );
      res.json({ ok: true });
    } catch (err) {
      console.error("Admin blog update error:", err);
      res.status(500).json({ error: "Error al actualizar el artículo." });
    }
  });

  app.delete("/api/admin/blog/:id", requireAuth, async (req, res) => {
    try {
      const [rows] = await db.execute("SELECT modelo, slug FROM blog_posts WHERE idBlog = ?", [req.params.id]);
      const row = (rows as any[])[0];
      if (row) {
        const dir = path.join(process.cwd(), "public/blog", row.modelo, row.slug);
        fs.rmSync(dir, { recursive: true, force: true });
      }
      await db.execute("DELETE FROM blog_posts WHERE idBlog = ?", [req.params.id]);
      res.json({ ok: true });
    } catch (err) {
      console.error("Admin blog delete error:", err);
      res.status(500).json({ error: "Error al eliminar el artículo." });
    }
  });

  // ─── CMS Admin: Casos de éxito ────────────────────────
  app.get("/api/admin/casos-exito", requireAuth, async (_req, res) => {
    try {
      const [rows] = await db.execute(
        "SELECT idCasos, slug, modelo, title, excerpt, date, author, readTime, image, featured, trafficRank, isNew, keywords, published, createdAt, updatedAt FROM casos_exito ORDER BY updatedAt DESC"
      );
      res.json(rows);
    } catch (err) {
      console.error("Admin casos list error:", err);
      res.status(500).json({ error: "Error al obtener casos de éxito." });
    }
  });

  app.get("/api/admin/casos-exito/:id", requireAuth, async (req, res) => {
    try {
      const [rows] = await db.execute("SELECT * FROM casos_exito WHERE idCasos = ?", [req.params.id]);
      const casos = rows as any[];
      if (!casos.length) return res.status(404).json({ error: "Caso no encontrado." });
      res.json(casos[0]);
    } catch (err) {
      console.error("Admin casos single error:", err);
      res.status(500).json({ error: "Error al obtener el caso." });
    }
  });

  app.post("/api/admin/casos-exito", requireAuth, async (req, res) => {
    try {
      const modelo = validateModel(req.body.modelo);
      if (!modelo) return res.status(400).json({ error: "Modelo no válido." });
      const m = pickPostMeta(req.body);
      if (!m.slug || !m.title) return res.status(400).json({ error: "Slug y título son obligatorios." });
      m.readTime = m.readTime || estimateReadTime(m.content, "5 min");
      const [check] = await db.execute("SELECT idCasos FROM casos_exito WHERE modelo = ? AND slug = ?", [modelo, m.slug]);
      if ((check as any[]).length) return res.status(409).json({ error: "Ya existe un caso con ese slug en este modelo." });
      const gallery = Array.isArray(req.body.gallery) ? JSON.stringify(req.body.gallery) : null;
      const [result]: any = await db.execute(
        "INSERT INTO casos_exito (slug, modelo, title, excerpt, content, date, author, readTime, image, featured, trafficRank, isNew, keywords, published, gallery) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [m.slug, modelo, m.title, m.excerpt, m.content, m.date, m.author, m.readTime, m.image, m.featured, m.trafficRank, m.isNew, m.keywords, m.published || 1, gallery]
      );
      res.status(201).json({ id: result.insertId });
    } catch (err) {
      console.error("Admin casos create error:", err);
      res.status(500).json({ error: "Error al crear el caso." });
    }
  });

  app.put("/api/admin/casos-exito/:id", requireAuth, async (req, res) => {
    try {
      const modelo = validateModel(req.body.modelo);
      if (!modelo) return res.status(400).json({ error: "Modelo no válido." });
      const m = pickPostMeta(req.body);
      if (!m.slug || !m.title) return res.status(400).json({ error: "Slug y título son obligatorios." });
      m.readTime = m.readTime || estimateReadTime(m.content, "5 min");
      const [check] = await db.execute(
        "SELECT idCasos FROM casos_exito WHERE modelo = ? AND slug = ? AND idCasos <> ?",
        [modelo, m.slug, req.params.id]
      );
      if ((check as any[]).length) return res.status(409).json({ error: "Ya existe un caso con ese slug en este modelo." });
      const gallery = Array.isArray(req.body.gallery) ? JSON.stringify(req.body.gallery) : null;
      await db.execute(
        "UPDATE casos_exito SET slug=?, modelo=?, title=?, excerpt=?, content=?, date=?, author=?, readTime=?, image=?, featured=?, trafficRank=?, isNew=?, keywords=?, published=?, gallery=? WHERE idCasos=?",
        [m.slug, modelo, m.title, m.excerpt, m.content, m.date, m.author, m.readTime, m.image, m.featured, m.trafficRank, m.isNew, m.keywords, m.published || 1, gallery, req.params.id]
      );
      res.json({ ok: true });
    } catch (err) {
      console.error("Admin casos update error:", err);
      res.status(500).json({ error: "Error al actualizar el caso." });
    }
  });

  app.delete("/api/admin/casos-exito/:id", requireAuth, async (req, res) => {
    try {
      const [rows] = await db.execute("SELECT modelo, slug FROM casos_exito WHERE idCasos = ?", [req.params.id]);
      const row = (rows as any[])[0];
      if (row) {
        const dir = path.join(process.cwd(), "public/blog", row.modelo, row.slug);
        fs.rmSync(dir, { recursive: true, force: true });
      }
      await db.execute("DELETE FROM casos_exito WHERE idCasos = ?", [req.params.id]);
      res.json({ ok: true });
    } catch (err) {
      console.error("Admin casos delete error:", err);
      res.status(500).json({ error: "Error al eliminar el caso." });
    }
  });

  // Upload de imágenes → WebP en public/blog/{modelo}/{slug}/
  app.post("/api/admin/upload", requireAuth, upload.single("file"), async (req, res) => {
    try {
      const modelo = validateModel(req.body.modelo);
      const slug = typeof req.body.slug === "string" && req.body.slug.trim() ? slugify(req.body.slug) : "temp";
      if (!modelo) return res.status(400).json({ error: "Falta el modelo." });
      if (!req.file) return res.status(400).json({ error: "No se recibió ningún archivo." });

      const dir = path.join(process.cwd(), "public/blog", modelo, slug);
      fs.mkdirSync(dir, { recursive: true });

      const basename = `${Date.now()}`;
      const webpPath = path.join(dir, `${basename}.webp`);
      await sharp(req.file.buffer)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(webpPath);

      const url = `/blog/${modelo}/${slug}/${basename}.webp`;
      res.status(201).json({ url });
    } catch (err) {
      console.error("Admin upload error:", err);
      res.status(500).json({ error: "Error al subir la imagen." });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    // Serve brotli-compressed assets when client supports it
    app.get('/assets/*', (req, res, next) => {
      if (req.acceptsEncodings('br')) {
        const cached = brotliCache.get(req.path);
        if (cached) {
          res.setHeader('Content-Encoding', 'br');
          res.setHeader('Content-Type', cached.type);
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          return res.send(cached.data);
        }
      }
      next();
    });
    app.use(express.static(distPath));
    app.use(express.static(path.join(process.cwd(), "public")));
    // SPA fallback: serve index.html for all non-file routes
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: "API endpoint not found" });
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

function buildEmailTemplate(data: {
  name: string; company: string; email?: string; phone: string;
  industry: string; moduleType: string; area: string; capacity: string;
  location: string; sustainability: boolean; insulation: boolean;
  timeline: string; additionalSpecs: string;
}) {
  const fields = [
    { label: "Nombre", value: data.name },
    { label: "Empresa", value: data.company },
    { label: "Teléfono", value: data.phone },
    { label: "Sector", value: data.industry },
    { label: "Tipo de módulo", value: data.moduleType },
    { label: "Área (m²)", value: data.area },
    { label: "Capacidad", value: data.capacity },
    { label: "Ubicación", value: data.location },
    { label: "Plazo (semanas)", value: data.timeline },
    { label: "Aislamiento PIR", value: data.insulation ? "Sí" : "No" },
    { label: "Sostenibilidad Solar-Ready", value: data.sustainability ? "Sí" : "No" },
  ];

  if (data.email) {
    fields.splice(2, 0, { label: "Correo", value: data.email });
  }

  const rows = fields.map(f => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #2a2a2a;color:#909090;font-size:13px;font-family:'Courier New',monospace;text-transform:uppercase;letter-spacing:0.5px;width:180px">${f.label}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #2a2a2a;color:#ffffff;font-size:14px;font-family:Arial,sans-serif">${f.value}</td>
    </tr>
  `).join("");

  const hasNotes = data.additionalSpecs && data.additionalSpecs.trim();

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#050505">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#090A0A;border:1px solid #1c1c1c;border-radius:8px;overflow:hidden">

        <!-- Header -->
        <tr>
          <td style="padding:32px 32px 20px;text-align:center;border-bottom:2px solid #FEC93430">
            <img src="cid:logo@beyritech" alt="Beyritech" style="height:36px;opacity:0.8" />
            <h1 style="color:#FEC934;font-family:'Raleway',Arial,sans-serif;font-size:20px;font-weight:700;letter-spacing:1px;margin:16px 0 0;text-transform:uppercase">Nueva Solicitud de Cotización</h1>
            <p style="color:#606060;font-family:Arial,sans-serif;font-size:12px;margin:6px 0 0;font-family:'Courier New',monospace">SISTEMA CONSTRUCTIVO VOLUMÉTRICO</p>
          </td>
        </tr>

        <!-- Data table -->
        <tr><td style="padding:24px 32px">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${rows}
          </table>
        </td></tr>

        <!-- Notes -->
        ${hasNotes ? `
        <tr><td style="padding:0 32px 24px">
          <div style="border-left:3px solid #FEC934;padding:12px 16px;background-color:#0a0e12;border-radius:4px">
            <p style="color:#909090;font-size:11px;font-family:'Courier New',monospace;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px">Notas del proyecto</p>
            <p style="color:#e0e0e0;font-size:13px;font-family:Arial,sans-serif;margin:0;line-height:1.5">${data.additionalSpecs}</p>
          </div>
        </td></tr>` : ""}

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;background-color:#050505;border-top:1px solid #1c1c1c;text-align:center">
            <p style="color:#505050;font-size:11px;font-family:Arial,sans-serif;margin:0">© ${new Date().getFullYear()} Beyritech — Sistemas Modulares Multipropósito</p>
            <p style="color:#404040;font-size:10px;font-family:'Courier New',monospace;margin:4px 0 0">Este correo fue generado automáticamente desde el formulario web</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

startServer();
