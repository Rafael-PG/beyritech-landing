import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar, Clock, User, ArrowLeft, ArrowRight, Phone, ChevronRight,
  ShieldCheck, Share2, Check, Copy, Box, Sparkles, Award
} from "lucide-react";
import SEO from "../components/SEO";
import ReadingProgressBar from "../components/shared/ReadingProgressBar";
import { modeloName } from "../lib/modelosMeta";
import { processArticleHtml } from "../lib/contentProcessing";

interface BlogPostItem {
  idBlog: number;
  slug: string;
  modelo: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image: string | null;
  featured: boolean;
  isNew: boolean;
  keywords?: string;
  modifiedDate?: string | null;
}

export default function BlogArticle() {
  const { modelo, slug } = useParams();
  const [article, setArticle] = useState<BlogPostItem | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    // Fetch main article
    fetch(`/api/blog/${modelo}/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch(() => {
        setArticle(null);
        setLoading(false);
      });

    // Fetch related articles (same model or latest)
    fetch("/api/blog")
      .then((r) => r.json())
      .then((all: BlogPostItem[]) => {
        if (Array.isArray(all)) {
          const related = all
            .filter((p) => p.slug !== slug)
            .sort((a, b) => (a.modelo === modelo ? -1 : 1))
            .slice(0, 3);
          setRelatedPosts(related);
        }
      })
      .catch(() => {});
  }, [modelo, slug]);

  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-jet-950 flex flex-col items-center justify-center gap-3">
        <div className="w-9 h-9 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-jet-400 font-mono text-xs uppercase tracking-widest">
          Cargando publicación técnica...
        </span>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-jet-950 text-white flex flex-col items-center justify-center gap-6 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 gold-grid-overlay opacity-30 pointer-events-none" />
        <h1 className="font-display text-3xl font-bold text-white relative z-10">Artículo no encontrado</h1>
        <p className="text-jet-400 text-sm max-w-md relative z-10 font-light">
          El artículo que busca no existe o ha sido reubicado.
        </p>
        <Link
          to="/blog"
          className="relative z-10 inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-xs rounded transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al blog
        </Link>
      </div>
    );
  }

  const { html: htmlContent, toc: tocItems } = processArticleHtml(article.content || `<p>${article.excerpt}</p>`);
  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://beyritech.com/blog/${article.modelo}/${article.slug}`;
  const modelTitle = modeloName(article.modelo);

  const formattedDate = new Date(article.date).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative bg-jet-950 min-h-screen text-white font-sans overflow-x-hidden">
      {/* ─── FONDO TEXTURADO SUTIL (GRID + DOTS) ───────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 gold-grid-overlay opacity-40" />
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle,#FEC934_0.8px,transparent_0.8px)] bg-[size:16px_16px]" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-500/5 rounded-full blur-[160px]" />
      </div>

      {/* ─── BARRA DE PROGRESO FIJA (Z-50, 3PX, ORO) ───────────── */}
      <ReadingProgressBar />

      {/* ─── SEO Y SCHEMA.ORG JSON-LD ─────────────────────────── */}
      <SEO
        title={article.title}
        description={article.excerpt}
        url={`/blog/${article.modelo}/${article.slug}`}
        type="article"
        keywords={article.keywords}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.excerpt,
          image: article.image ? `https://beyritech.com${article.image}` : "https://beyritech.com/logo/beyritech-logo.png",
          datePublished: article.date,
          dateModified: article.modifiedDate || article.date,
          author: {
            "@type": "Organization",
            name: article.author,
          },
          publisher: {
            "@type": "Organization",
            name: "Beyritech Modular Systems",
            logo: {
              "@type": "ImageObject",
              url: "https://beyritech.com/logo/beyritech-logo.png",
            },
          },
        }}
      />

      {/* ─── HERO SECTION (55-65vh) FULL-BLEED ─────────────────── */}
      <section className="relative w-full h-[60vh] md:h-[70vh] min-h-[480px] max-h-[720px] overflow-hidden border-b border-jet-800/80">
        {/* Imagen de fondo full-bleed o plano técnico de alta resolución */}
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            className="absolute inset-0 w-full h-full object-cover scale-105"
            style={{ objectPosition: "center 35%" }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-jet-950 via-jet-900 to-jet-950">
            <div className="absolute inset-0 gold-grid-overlay opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,201,52,0.12),transparent_70%)]" />
          </div>
        )}

        {/* Gradientes de superposición para legibilidad y elegancia */}
        <div className="absolute inset-0 bg-gradient-to-t from-jet-950 via-jet-950/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-jet-950/80 via-transparent to-transparent" />
        <div className="absolute inset-0 gold-grid-overlay opacity-25 pointer-events-none" />

        {/* Contenido del Hero */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-6 pb-10 md:pb-14 pt-28 sm:pt-32 relative z-20">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-mono text-jet-300 mb-4 font-medium flex-wrap">
              <Link to="/blog" className="hover:text-gold-500 transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                Blog
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-jet-600" />
              <Link
                to={`/blog?modelo=${article.modelo}`}
                className="hover:text-gold-500 transition-colors uppercase tracking-wider text-gold-500 font-semibold"
              >
                {modelTitle}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-jet-600" />
              <span className="text-jet-400 truncate max-w-[200px] sm:max-w-md">{article.title}</span>
            </nav>

            {/* Badges de Categoría y Nuevo */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="bg-gold-500 text-black text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded shadow-sm flex items-center gap-1">
                <Box className="w-3 h-3" />
                {modelTitle}
              </span>
              {article.isNew && (
                <span className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded">
                  Nuevo
                </span>
              )}
              {article.featured && (
                <span className="bg-gold-500/20 backdrop-blur-md border border-gold-500/40 text-gold-400 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded">
                  Destacado
                </span>
              )}
            </div>

            {/* Título Principal (H1) */}
            <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-5 max-w-4xl">
              {article.title}
            </h1>

            {/* Metadatos: Autor, Fecha, Tiempo */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono text-jet-300">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-gold-500" />
                <strong className="text-white font-semibold">{article.author}</strong>
              </span>
              <span className="text-jet-600">·</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gold-500" />
                {formattedDate}
              </span>
              <span className="text-jet-600">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gold-500" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAIN LAYOUT: CONTENT + SIDEBAR (FLEX) ─────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* ════ IZQUIERDA (flex-1 min-w-0): CONTENIDO PRINCIPAL ════ */}
          <main className="flex-1 min-w-0">
            {/* Extracto/Intro (cursiva, borde oro izquierdo) */}
            <div className="border-l-4 border-gold-500 bg-jet-900/70 p-6 sm:p-7 rounded-r-xl mb-10 border-y border-r border-jet-800/80 shadow-md">
              <p className="text-lg text-jet-100 italic font-light leading-relaxed">
                "{article.excerpt}"
              </p>
            </div>

            {/* Contenido del Artículo con Prose Styles */}
            <div
              id="article-content"
              className="prose max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* ─── BLOQUE CTA (Gradiente oscuro, texturizado, contacto + teléfono) ─── */}
            <div className="mt-12 rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl relative">
              <div className="bg-gradient-to-br from-jet-900 via-jet-950 to-black p-8 sm:p-10 relative">
                {/* Patrón texturizado a cuadros decorativo */}
                <div className="absolute inset-0 gold-grid-overlay opacity-30 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <span className="text-gold-500 text-xs font-mono font-bold uppercase tracking-widest mb-2 block flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    ¿Necesita asesoría técnica para su terreno?
                  </span>
                  <h3 className="font-display font-extrabold text-white text-2xl sm:text-3xl mb-3 leading-tight">
                    Diseñamos la solución modular<br />ideal para su empresa
                  </h3>
                  <p className="text-jet-300 text-sm leading-relaxed mb-6 max-w-xl font-light">
                    Nuestros ingenieros evalúan requerimientos de habitabilidad, aislamiento térmico ignífugo y logística de entrega en tiempo récord a nivel nacional.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3.5">
                    <Link
                      to="/contacto"
                      className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-black font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl transition-all shadow-[0_4px_16px_rgba(254,201,52,0.25)] hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Solicitar cotización sin costo
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                      href="https://wa.me/51993694677?text=Hola%2C%20le%C3%AD%20el%20art%C3%ADculo%20en%20el%20blog%20y%20deseo%20asesor%C3%ADa%20t%C3%A9cnica"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all"
                    >
                      <Phone className="w-4 h-4 text-gold-500" />
                      +51 993 694 677
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── FOOTER DE COMPARTIR Y VOLVER ──────────────────── */}
            <div className="mt-8 bg-jet-900/60 rounded-2xl px-6 py-5 border border-jet-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-jet-300 font-light">
                ¿Le resultó útil este artículo técnico? <strong className="text-white font-medium">Compártalo con su equipo de operaciones.</strong>
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-jet-950 border border-jet-700 hover:border-gold-500/60 text-white text-xs font-mono uppercase tracking-wider font-bold rounded-xl transition-colors shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-gold-500" />
                Volver al blog
              </Link>
            </div>
          </main>

          {/* ════ DERECHA: SIDEBAR (w-80, sticky) ══════════════════ */}
          <aside className="lg:w-80 shrink-0 lg:self-start">
            <div className="lg:sticky lg:top-24 space-y-6">

              {/* 1. Tabla de Contenidos (extraída de h2) */}
              {tocItems.length > 0 && (
                <div className="bg-jet-900/80 border border-jet-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 gold-grid-overlay opacity-20 pointer-events-none" />
                  <h4 className="font-mono font-bold text-gold-500 mb-3 uppercase tracking-widest text-xs flex items-center gap-2 relative z-10">
                    <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                    En este artículo
                  </h4>
                  <nav className="relative z-10">
                    <ul className="space-y-2">
                      {tocItems.map((item, i) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="flex items-start gap-2 text-xs text-jet-300 hover:text-gold-500 transition-colors leading-snug py-1"
                          >
                            <span className="text-gold-500 font-mono font-bold shrink-0">{i + 1}.</span>
                            <span className="line-clamp-2">{item.text}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}

              {/* 2. Botones de compartir */}
              <div className="bg-jet-900/80 border border-jet-800 rounded-2xl p-5 shadow-lg relative">
                <h4 className="font-mono font-bold text-white mb-3 uppercase tracking-widest text-xs flex items-center gap-2">
                  <Share2 className="w-3.5 h-3.5 text-gold-500" />
                  Compartir
                </h4>
                <div className="flex gap-2">
                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(article.title + " " + currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-black text-xs font-bold transition-colors shadow-sm"
                  >
                    WhatsApp
                  </a>
                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    LinkedIn
                  </a>
                  {/* Copiar enlace */}
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-2.5 rounded-lg bg-jet-950 border border-jet-700 hover:border-gold-500/50 text-white text-xs font-mono transition-colors flex items-center justify-center"
                    title="Copiar enlace"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-jet-400" />}
                  </button>
                </div>
              </div>

              {/* 3. Tarjeta CTA Sidebar */}
              <div className="bg-gradient-to-br from-jet-900 via-jet-950 to-jet-900 border border-gold-500/30 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 gold-grid-overlay opacity-30 pointer-events-none" />
                <div className="relative z-10">
                  <span className="text-gold-500 text-[10px] font-mono font-bold uppercase tracking-widest mb-1.5 block">
                    Fabricación & Entrega
                  </span>
                  <h4 className="font-display font-bold text-lg text-white mb-2 leading-tight">
                    ¿Cotización formal en 24 horas?
                  </h4>
                  <p className="text-xs text-jet-300 font-light leading-relaxed mb-4">
                    Envíenos sus especificaciones de distribución y le enviaremos la propuesta técnica y costos.
                  </p>
                  <Link
                    to="/contacto"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-gold-500 hover:bg-gold-600 text-black font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg transition-colors shadow-md mb-2"
                  >
                    Solicitar cotización
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <p className="text-[11px] font-mono text-center text-jet-400">
                    Central: <span className="text-white">+51 993 694 677</span>
                  </p>
                </div>
              </div>

              {/* 4. Tarjeta Info del Modelo (Stats técnicas) */}
              <div className="bg-jet-900/80 border border-jet-800 rounded-2xl p-5 shadow-lg relative">
                <h4 className="font-mono font-bold text-white mb-3 uppercase tracking-widest text-xs flex items-center gap-1.5">
                  <Box className="w-3.5 h-3.5 text-gold-500" />
                  Ficha {modelTitle}
                </h4>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between py-1.5 border-b border-jet-800/80">
                    <span className="text-jet-400">Despliegue:</span>
                    <span className="text-gold-500 font-bold">&lt; 15 a 30 min</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-jet-800/80">
                    <span className="text-jet-400">Aislamiento:</span>
                    <span className="text-white">Lana ignífuga</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-jet-800/80">
                    <span className="text-jet-400">Resistencia sismo:</span>
                    <span className="text-white">Nivel 8</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-jet-800/80">
                    <span className="text-jet-400">Vida útil:</span>
                    <span className="text-white">&gt; 20 años</span>
                  </div>
                </div>
                <Link
                  to={`/modelos/${article.modelo}`}
                  className="mt-4 inline-flex items-center gap-1 text-[11px] font-mono text-gold-500 hover:text-gold-400 uppercase tracking-wider font-semibold"
                >
                  Ver especificaciones completas →
                </Link>
              </div>

              {/* 5. Badges de Confianza ("¿Por qué Beyritech?") */}
              <div className="bg-jet-900/60 border border-jet-800 rounded-2xl p-5 shadow-lg">
                <h4 className="font-mono font-bold text-white mb-3 uppercase tracking-widest text-xs">
                  Garantía Beyritech
                </h4>
                <ul className="space-y-2.5 text-xs text-jet-300 font-light">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span>Estructura de acero galvanizado anticorrosión zinc 80 g/m².</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span>Certificación de calidad ISO 9001:2015 & CPR 1090-1.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span>Instalación limpia sin residuos de obra húmeda.</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>

        {/* ─── SECCIÓN DE ARTÍCULOS RELACIONADOS (GRID 3 COLUMNAS) ─── */}
        {relatedPosts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-jet-800/80">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold block mb-1">
                  Publicaciones recomendadas
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Los artículos más consultados
                </h3>
              </div>
              <Link
                to="/blog"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-gold-500 hover:text-gold-400 uppercase tracking-wider font-semibold"
              >
                Ver todos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.idBlog}
                  to={`/blog/${rel.modelo}/${rel.slug}`}
                  className="group relative bg-jet-900/90 border border-jet-800 hover:border-gold-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l-2 border-t-2 border-gold-500/40 group-hover:border-gold-500 z-20" />
                  <div className="absolute top-0 right-0 w-2.5 h-2.5 border-r-2 border-t-2 border-gold-500/40 group-hover:border-gold-500 z-20" />

                  <div>
                    {/* Imagen / Thumb */}
                    <div className="h-44 w-full relative overflow-hidden bg-jet-950">
                      <div className="absolute inset-0 gold-grid-overlay opacity-30 z-10 pointer-events-none" />
                      <div className="absolute inset-0 bg-gradient-to-t from-jet-900 via-transparent to-black/30 z-10" />
                      {rel.image ? (
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-0"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-jet-950 to-jet-900 relative z-0">
                          <Box className="w-8 h-8 text-gold-500/50" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 z-20 text-[9px] font-mono uppercase tracking-wider text-gold-500 bg-black/75 backdrop-blur-md border border-gold-500/30 px-2 py-0.5 rounded font-semibold">
                        {modeloName(rel.modelo)}
                      </span>
                    </div>

                    {/* Texto */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-jet-400 mb-2">
                        <Clock className="w-3 h-3 text-gold-500/70" />
                        {rel.readTime}
                      </div>
                      <h4 className="font-display font-bold text-white group-hover:text-gold-500 transition-colors line-clamp-2 text-base leading-snug mb-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-jet-300 font-light line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-gold-500 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Leer artículo <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
