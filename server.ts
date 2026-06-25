import express from "express";
import path from "path";
import fs from "fs";
import zlib from "zlib";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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
  app.use(express.json({ limit: "10kb" }));

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
  const logoAttachment = fs.readFileSync(logoPath);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // API Route: Contact form — send email notification
  app.post("/api/contact", contactLimiter, async (req, res) => {
    try {
      const { name, company, email, phone, industry, moduleType, area, capacity, location, sustainability, insulation, timeline, additionalSpecs } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required." });
      }

      const html = buildEmailTemplate({ name, company, email, phone, industry, moduleType, area, capacity, location, sustainability, insulation, timeline, additionalSpecs });

      await transporter.sendMail({
        from: `"Beyritech Web" <${process.env.SMTP_USER}>`,
        to: process.env.EMAIL_TO || email,
        replyTo: email,
        subject: `Nueva cotización — ${name} — ${moduleType || "Módulo"}`,
        html,
        attachments: [
          {
            filename: "beyritech-logo.png",
            content: logoAttachment,
            cid: "logo@beyritech",
          },
        ],
      });

      res.json({ success: true, message: "Solicitud enviada correctamente." });
    } catch (error: any) {
      console.error("Email send failed:", error);
      res.status(500).json({ error: "Error al enviar el correo. Intente nuevamente." });
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
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

function buildEmailTemplate(data: {
  name: string; company: string; email: string; phone: string;
  industry: string; moduleType: string; area: string; capacity: string;
  location: string; sustainability: boolean; insulation: boolean;
  timeline: string; additionalSpecs: string;
}) {
  const fields = [
    { label: "Nombre", value: data.name },
    { label: "Empresa", value: data.company },
    { label: "Correo", value: data.email },
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
