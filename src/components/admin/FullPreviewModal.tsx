import { useEffect, useMemo, useState } from "react";
import {
  X, Monitor, Tablet, Smartphone, ArrowLeft, ChevronRight,
  Award, Box, ShieldCheck, User, Calendar, Clock, Share2,
  Phone, Sparkles, ArrowRight
} from "lucide-react";
import { processHtml, extractHeadings } from "../../lib/html";
import { modeloName } from "../../lib/modelosMeta";

interface FullPreviewModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  excerpt: string;
  content: string;
  image?: string | null;
  modelo: string;
  author?: string;
  date?: string;
  readTime?: string;
  isNew?: boolean | number;
  featured?: boolean | number;
  kind?: "blog" | "casos";
  gallery?: string[] | null;
}

type DeviceMode = "desktop" | "tablet" | "mobile";

export default function FullPreviewModal({
  open,
  onClose,
  title,
  excerpt,
  content,
  image,
  modelo,
  author,
  date,
  readTime,
  isNew,
  featured,
  kind = "casos",
  gallery,
}: FullPreviewModalProps) {
  const [device, setDevice] = useState<DeviceMode>("desktop");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const processedHtml = useMemo(() => processHtml(content || ""), [content]);
  const tocItems = useMemo(() => extractHeadings(content || ""), [content]);

  const formattedDate = useMemo(() => {
    try {
      const d = date ? new Date(date) : new Date();
      return d.toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return "4 de setiembre de 2026";
    }
  }, [date]);

  const modelTitle = modeloName(modelo || "multispace");

  const galleryImages: string[] = Array.isArray(gallery)
    ? gallery
    : typeof gallery === "string"
      ? (() => { try { return JSON.parse(gallery); } catch { return []; } })()
      : [];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex flex-col overflow-hidden text-white font-sans animate-in fade-in duration-200">
      {/* ─── BARRA DE CONTROL SUPERIOR ─────────────────────────── */}
      <div className="h-14 bg-jet-950/90 border-b border-jet-800/80 px-4 sm:px-6 flex items-center justify-between shrink-0 z-50">
        {/* Izquierda: Badge y nombre */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-gold-500/10 border border-gold-500/30 text-gold-500 font-mono text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Preview Completo
          </div>
          <span className="hidden sm:inline text-xs font-mono text-jet-400">
            Vista previa 1:1 de publicación web
          </span>
        </div>

        {/* Centro: Selector de Dispositivo */}
        <div className="flex items-center bg-jet-900 border border-jet-800 rounded-lg p-1">
          <button
            type="button"
            onClick={() => setDevice("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-colors ${
              device === "desktop" ? "bg-gold-500 text-black font-bold" : "text-jet-400 hover:text-white"
            }`}
            title="Vista de escritorio"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Escritorio</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice("tablet")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-colors ${
              device === "tablet" ? "bg-gold-500 text-black font-bold" : "text-jet-400 hover:text-white"
            }`}
            title="Vista tablet (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded transition-colors ${
              device === "mobile" ? "bg-gold-500 text-black font-bold" : "text-jet-400 hover:text-white"
            }`}
            title="Vista móvil (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Móvil</span>
          </button>
        </div>

        {/* Derecha: Botón Cerrar */}
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-jet-900 hover:bg-jet-800 border border-jet-700 hover:border-gold-500/50 text-jet-300 hover:text-white text-xs font-mono uppercase tracking-wider rounded transition-colors"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline">Cerrar [ESC]</span>
        </button>
      </div>

      {/* ─── ÁREA DE SCROLL DE LA PÁGINA COMPLETA ───────────────── */}
      <div className="flex-1 overflow-y-auto bg-jet-950/70 p-0 sm:p-4 flex justify-center">
        <div
          className={`w-full transition-all duration-300 bg-jet-950 shadow-2xl relative border-x border-jet-800/80 ${
            device === "desktop"
              ? "max-w-7xl"
              : device === "tablet"
                ? "max-w-3xl my-4 rounded-xl border border-jet-800 overflow-hidden"
                : "max-w-md my-4 rounded-xl border border-jet-800 overflow-hidden"
          }`}
        >
          {/* Header Simulado de la Web */}
          <div className="w-full bg-jet-950/60 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-2">
              <img src="/logo/beyritech-logo.webp" alt="Beyritech" className="h-7 w-auto" />
            </div>
            <div className="hidden md:flex items-center gap-6 text-xs font-mono text-jet-300 uppercase tracking-wider">
              <span>Soluciones</span>
              <span>Modelos</span>
              <span>Proceso</span>
              <span className="text-gold-500 font-bold underline underline-offset-8">
                {kind === "blog" ? "Blog" : "Proyectos"}
              </span>
              <span>Nosotros</span>
            </div>
            <span className="px-4 py-1.5 bg-gold-500 text-black font-bold text-xs uppercase tracking-wider rounded">
              Cotizar
            </span>
          </div>

          {/* ─── HERO SECTION 1:1 FULL-BLEED ──────────────────────── */}
          <section className="relative w-full h-[55vh] md:h-[65vh] min-h-[420px] max-h-[640px] overflow-hidden border-b border-jet-800/80">
            {image ? (
              <img
                src={image}
                alt={title || "Hero"}
                className="absolute inset-0 w-full h-full object-cover scale-105"
                style={{ objectPosition: "center 35%" }}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-jet-950 via-jet-900 to-jet-950">
                <div className="absolute inset-0 gold-grid-overlay opacity-50" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,201,52,0.12),transparent_70%)]" />
              </div>
            )}

            {/* Gradientes idénticos */}
            <div className="absolute inset-0 bg-gradient-to-t from-jet-950 via-jet-950/60 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-jet-950/80 via-transparent to-transparent" />
            <div className="absolute inset-0 gold-grid-overlay opacity-25 pointer-events-none" />

            {/* Contenido del Hero */}
            <div className="absolute inset-0 flex flex-col justify-end">
              <div className="max-w-7xl mx-auto w-full px-6 pb-10 md:pb-14 relative z-20">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs font-mono text-jet-300 mb-4 font-medium flex-wrap">
                  <span className="hover:text-gold-500 transition-colors flex items-center gap-1">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    {kind === "blog" ? "Blog" : "Casos de éxito"}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-jet-600" />
                  <span className="uppercase tracking-wider text-gold-500 font-semibold">
                    {modelTitle}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-jet-600" />
                  <span className="text-jet-400 truncate max-w-[200px] sm:max-w-md">{title}</span>
                </nav>

                {/* Badges de Categoría */}
                <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                  {kind === "blog" ? (
                    <span className="bg-gold-500 text-black text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded shadow-sm flex items-center gap-1">
                      <Box className="w-3 h-3" />
                      Artículo Técnico
                    </span>
                  ) : (
                    <span className="bg-gold-500 text-black text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded shadow-sm flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Caso Real Auditado
                    </span>
                  )}
                  <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-semibold uppercase tracking-wider px-3 py-1 rounded">
                    {modelTitle}
                  </span>
                  {isNew ? (
                    <span className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded">
                      {kind === "blog" ? "Nuevo" : "Reciente"}
                    </span>
                  ) : null}
                  {featured ? (
                    <span className="bg-gold-500/20 backdrop-blur-md border border-gold-500/40 text-gold-400 text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded">
                      Destacado
                    </span>
                  ) : null}
                </div>

                {/* Título Principal (H1) */}
                <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-5 max-w-4xl">
                  {title || "Título de la publicación..."}
                </h1>

                {/* Metadatos */}
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono text-jet-300">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-gold-500" />
                    <strong className="text-white font-semibold">{author || "Beyritech"}</strong>
                  </span>
                  <span className="text-jet-600">·</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gold-500" />
                    {formattedDate}
                  </span>
                  <span className="text-jet-600">·</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gold-500" />
                    {readTime || "5 min lectura"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ─── MAIN LAYOUT: CONTENIDO + SIDEBAR ─────────────────── */}
          <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative z-10">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
              {/* Contenido Principal */}
              <main className="flex-1 min-w-0">
                {/* Extracto */}
                {excerpt ? (
                  <div className="border-l-4 border-gold-500 bg-jet-900/70 p-6 sm:p-7 rounded-r-xl mb-10 border-y border-r border-jet-800/80 shadow-md">
                    <p className="text-lg text-jet-100 italic font-light leading-relaxed">
                      "{excerpt}"
                    </p>
                  </div>
                ) : null}

                {/* Cuerpo del contenido prose */}
                {processedHtml ? (
                  <div
                    className="prose max-w-none mb-12 text-jet-200"
                    dangerouslySetInnerHTML={{ __html: processedHtml }}
                  />
                ) : (
                  <div className="py-12 text-center text-jet-500 font-light italic">
                    Sin contenido redactado aún.
                  </div>
                )}

                {/* Galería (si aplica) */}
                {galleryImages.length > 0 && (
                  <div className="my-14 pt-10 border-t border-jet-800">
                    <div className="flex items-center gap-2 mb-6">
                      <Award className="w-5 h-5 text-gold-500" />
                      <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                        Evidencia fotográfica en obra
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {galleryImages.map((img, i) => (
                        <div key={i} className="rounded-lg overflow-hidden border border-jet-800 h-36 bg-jet-900">
                          <img src={img} alt={`Galería ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bloque CTA inferior oficial */}
                <div className="mt-12 rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl relative">
                  <div className="bg-gradient-to-br from-jet-900 via-jet-950 to-black p-8 sm:p-10 relative">
                    <div className="absolute inset-0 gold-grid-overlay opacity-30 pointer-events-none" />
                    <div className="relative z-10">
                      <span className="text-gold-500 text-xs font-mono font-bold uppercase tracking-widest mb-2 block flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        ¿Desea resultados como este para su operación?
                      </span>
                      <h3 className="font-display font-extrabold text-white text-2xl sm:text-3xl mb-3 leading-tight">
                        Habilite infraestructura modular<br />en tiempo récord
                      </h3>
                      <p className="text-jet-300 text-sm leading-relaxed mb-6 max-w-xl font-light">
                        Suministramos, transportamos e instalamos módulos de alta resistencia certificados en campamentos mineros, agrícolas y corporativos en todo el Perú.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3.5">
                        <span className="inline-flex items-center justify-center gap-2 bg-gold-500 text-black font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl">
                          Cotizar proyecto similar <ArrowRight className="w-4 h-4" />
                        </span>
                        <span className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/15 text-white font-mono text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl">
                          <Phone className="w-4 h-4 text-gold-500" /> +51 993 694 677
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              {/* Sidebar derecho (Índice de Contenidos + Compartir) */}
              <aside className="lg:w-80 shrink-0 lg:self-start space-y-6">
                {/* 1. Tabla de contenidos automática */}
                {tocItems.length > 0 && (
                  <div className="bg-jet-900/80 border border-jet-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 gold-grid-overlay opacity-20 pointer-events-none" />
                    <h4 className="font-mono font-bold text-gold-500 mb-3 uppercase tracking-widest text-xs flex items-center gap-2 relative z-10">
                      <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                      En este {kind === "blog" ? "artículo" : "caso"}
                    </h4>
                    <nav className="relative z-10">
                      <ul className="space-y-2">
                        {tocItems.map((item, i) => (
                          <li key={item.id} className="text-xs text-jet-300 leading-snug py-1 flex items-start gap-2">
                            <span className="text-gold-500 font-mono font-bold shrink-0">{i + 1}.</span>
                            <span className="line-clamp-2">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                )}

                {/* 2. Compartir */}
                <div className="bg-jet-900/80 border border-jet-800 rounded-2xl p-5 shadow-lg">
                  <h4 className="font-mono font-bold text-white mb-3 uppercase tracking-widest text-xs flex items-center gap-2">
                    <Share2 className="w-3.5 h-3.5 text-gold-500" />
                    Compartir publicación
                  </h4>
                  <p className="text-xs text-jet-400 font-light">
                    Los visitantes podrán compartir esta publicación directamente por WhatsApp, LinkedIn y Twitter.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
