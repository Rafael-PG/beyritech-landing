import type { CSSProperties } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Ruler, ArrowRight, CheckCircle2, Download, Clock, MapPin, Layers, BedDouble, Droplet, Utensils, Stethoscope, Briefcase, Sun, Beaker, Warehouse, Building2, ShowerHead, Boxes, Shield, Zap, FlameKindling, DoorOpen, PanelTop, Plug } from "lucide-react";
import SEO from "../components/SEO";
import ScrollReveal from "../hooks/ScrollReveal";
import FichaModal from "../components/modals/FichaModal";
import { getModel, getSortedModels } from "../data/modelos";

const G = "#FEC934";

const HERO_IMAGES: Record<string, string> = {
  multispace: "/images/models/multispace/hero/desktop.webp",
  "modulo-plegable-z": "/images/models/modulo-plegable-z/hero/desktop.webp",
  "doble-ala": "/images/models/doble-ala/hero/desktop.webp",
};

const HERO_IMAGES_MOBILE: Record<string, string> = {
  multispace: "/images/models/multispace/hero/mobile.webp",
  "modulo-plegable-z": "/images/models/modulo-plegable-z/hero/mobile.webp",
  "doble-ala": "/images/models/doble-ala/hero/mobile.webp",
};

function HeroImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-jet-950 gold-grid-overlay ${className ?? ""}`}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}

function ZoneTag({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={5.4}
      fontFamily="ui-monospace,monospace"
      fill={G}
      fillOpacity={0.72}
      textAnchor="middle"
      stroke="none"
      style={{ pointerEvents: "none" }}
    >
      {label.toUpperCase()}
    </text>
  );
}

function FloorPlan({ slug, del }: { slug: string; del: (extra: number) => CSSProperties }) {
  return (
    <svg viewBox="0 0 330 180" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      <g stroke={G} strokeWidth={1} fill="none">
        <rect x={18} y={16} width={294} height={148} rx={2} className="animate-phase-line" style={del(0)} />

        {slug === "multispace" && (
          <>
            <line x1={168} y1={16} x2={168} y2={164} strokeOpacity={0.45} className="animate-phase-line" style={del(0.1)} />
            <line x1={168} y1={86} x2={312} y2={86} strokeOpacity={0.45} className="animate-phase-line" style={del(0.16)} />
            <path d="M168 120 A14 14 0 0 0 182 106" strokeOpacity={0.55} className="animate-phase-line" style={del(0.22)} />
            <line x1={142} y1={16} x2={142} y2={86} strokeOpacity={0.4} className="animate-phase-line" style={del(0.28)} />
            <circle cx={126} cy={34} r={6} strokeOpacity={0.4} className="animate-phase-line" style={del(0.34)} />
            <rect x={150} y={34} width={10} height={6} strokeOpacity={0.35} className="animate-phase-line" style={del(0.38)} />
            <rect x={40} y={30} width={38} height={16} strokeOpacity={0.35} className="animate-phase-line" style={del(0.44)} />
            <rect x={86} y={30} width={38} height={16} strokeOpacity={0.35} className="animate-phase-line" style={del(0.48)} />
            <circle cx={56} cy={118} r={9} strokeOpacity={0.4} className="animate-phase-line" style={del(0.54)} />
            <circle cx={96} cy={118} r={9} strokeOpacity={0.4} className="animate-phase-line" style={del(0.58)} />
            <rect x={206} y={104} width={52} height={20} strokeOpacity={0.35} className="animate-phase-line" style={del(0.64)} />
            <rect x={270} y={100} width={10} height={10} strokeOpacity={0.3} className="animate-phase-line" style={del(0.68)} />
            <line x1={18} y1={178} x2={312} y2={178} strokeOpacity={0.35} className="animate-phase-line" style={del(0.74)} />
            <path d="M18 175 V181 M312 175 V181" strokeOpacity={0.35} className="animate-phase-line" style={del(0.78)} />

            <ZoneTag x={110} y={76} label="Dormitorio" />
            <ZoneTag x={155} y={50} label="Baño" />
            <ZoneTag x={120} y={140} label="Casino · Comedor" />
            <ZoneTag x={240} y={128} label="Oficina" />
            <text x={165} y={6} fontSize={5.4} fontFamily="ui-monospace,monospace" fill={G} fillOpacity={0.5} textAnchor="middle" stroke="none">
              MULTISPACE · 72 m²
            </text>
          </>
        )}

        {slug === "doble-ala" && (
          <>
            <rect x={136} y={28} width={58} height={124} strokeOpacity={0.8} className="animate-phase-line" style={del(0.08)} />
            <rect x={28} y={28} width={108} height={124} strokeOpacity={0.55} className="animate-phase-line" style={del(0.14)} />
            <rect x={194} y={28} width={108} height={124} strokeOpacity={0.55} className="animate-phase-line" style={del(0.2)} />
            <line x1={136} y1={90} x2={136} y2={100} strokeOpacity={0.3} className="animate-phase-line" style={del(0.26)} />
            <line x1={194} y1={90} x2={194} y2={100} strokeOpacity={0.3} className="animate-phase-line" style={del(0.3)} />
            <line x1={28} y1={88} x2={136} y2={88} strokeOpacity={0.4} className="animate-phase-line" style={del(0.36)} />
            <line x1={194} y1={100} x2={302} y2={100} strokeOpacity={0.4} className="animate-phase-line" style={del(0.42)} />
            <circle cx={82} cy={58} r={8} strokeOpacity={0.35} className="animate-phase-line" style={del(0.48)} />
            <rect x={150} y={44} width={30} height={16} strokeOpacity={0.35} className="animate-phase-line" style={del(0.54)} />
            <rect x={230} y={44} width={34} height={16} strokeOpacity={0.35} className="animate-phase-line" style={del(0.6)} />
            <circle cx={248} cy={130} r={7} strokeOpacity={0.35} className="animate-phase-line" style={del(0.66)} />
            <text x={165} y={166} fontSize={5.4} fontFamily="ui-monospace,monospace" fill={G} fillOpacity={0.5} textAnchor="middle" stroke="none">
              DOBLE ALA · 144 m²
            </text>

            <ZoneTag x={82} y={66} label="Sala de juntas" />
            <ZoneTag x={82} y={140} label="Laboratorio" />
            <ZoneTag x={165} y={140} label="Núcleo" />
            <ZoneTag x={250} y={66} label="Oficina control" />
            <ZoneTag x={250} y={130} label="Sanitario" />
          </>
        )}

        {slug === "modulo-plegable-z" && (
          <>
            <rect x={28} y={28} width={120} height={124} strokeOpacity={0.8} className="animate-phase-line" style={del(0.1)} />
            <rect x={148} y={28} width={54} height={124} strokeOpacity={0.6} className="animate-phase-line" style={del(0.16)} />
            <rect x={202} y={28} width={100} height={124} strokeOpacity={0.55} className="animate-phase-line" style={del(0.22)} />
            <line x1={28} y1={88} x2={148} y2={88} strokeOpacity={0.4} className="animate-phase-line" style={del(0.28)} />
            <rect x={46} y={42} width={40} height={16} strokeOpacity={0.35} className="animate-phase-line" style={del(0.34)} />
            <rect x={46} y={104} width={40} height={16} strokeOpacity={0.35} className="animate-phase-line" style={del(0.4)} />
            <circle cx={175} cy={52} r={7} strokeOpacity={0.35} className="animate-phase-line" style={del(0.46)} />
            <rect x={218} y={44} width={44} height={18} strokeOpacity={0.35} className="animate-phase-line" style={del(0.52)} />
            <rect x={240} y={100} width={30} height={14} strokeOpacity={0.32} className="animate-phase-line" style={del(0.58)} />
            <line x1={28} y1={178} x2={302} y2={178} strokeOpacity={0.35} className="animate-phase-line" style={del(0.64)} />
            <path d="M28 175 V181 M302 175 V181" strokeOpacity={0.35} className="animate-phase-line" style={del(0.68)} />
            <text x={165} y={166} fontSize={5.4} fontFamily="ui-monospace,monospace" fill={G} fillOpacity={0.5} textAnchor="middle" stroke="none">
              MINI DOBLE ALA · 45 m²
            </text>

            <ZoneTag x={88} y={66} label="Caseta / Oficina" />
            <ZoneTag x={88} y={140} label="Oficina obra" />
            <ZoneTag x={175} y={140} label="Sanitario" />
            <ZoneTag x={252} y={140} label="Depósito" />
          </>
        )}
      </g>
    </svg>
  );
}

export default function ModeloDetalle() {
  const { slug } = useParams();
  const model = getModel(slug);
  const related = getSortedModels(slug || "");
  const heroImage = slug ? HERO_IMAGES[slug] : undefined;
  const modelKey = model?.slug === "doble-ala" ? "Doble Ala" : model?.slug === "modulo-plegable-z" ? "Módulo Plegable Z" : "Multispace";
  const [fichaOpen, setFichaOpen] = useState(false);

  const zoneChips = [
    { icon: BedDouble, label: "Dormitorios" },
    { icon: Droplet, label: "Baño / ducha" },
    { icon: Utensils, label: "Casino · comedor" },
    { icon: Stethoscope, label: "Clínica / posta" },
    { icon: Briefcase, label: "Oficina" },
    { icon: Sun, label: "Solar-ready" },
    { icon: Beaker, label: "Laboratorio" },
    { icon: Warehouse, label: "Depósito" },
    { icon: Building2, label: "Sala de juntas" },
    { icon: ShowerHead, label: "Sanitario" },
    { icon: Boxes, label: "Almacén" },
  ];

  if (!model) {
    return (
      <div className="min-h-screen bg-jet-950 flex flex-col items-center justify-center gap-4">
        <h1 className="font-display text-3xl font-bold text-white">Modelo no encontrado</h1>
        <Link to="/modelos" className="text-gold-500 hover:underline text-sm">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${model.name} — Ficha Técnica`}
        description={`${model.description.slice(0, 155)}...`}
        url={`/modelos/${model.slug}`}
        structuredData={{ "@context": "https://schema.org", "@type": "Product", name: model.name, description: model.description, brand: { "@type": "Brand", name: "Beyritech" }, offers: { "@type": "Offer", priceCurrency: "PEN", availability: "https://schema.org/InStock" } }}
      />

      {/* Hero — Detalle de modelo */}
      <section className="relative overflow-hidden bg-jet-950 text-white">
        {/* Hero background — desktop */}
        <div
          className="absolute inset-0 bg-cover bg-center hidden sm:block"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Hero background — mobile */}
        <div
          className="absolute inset-0 bg-cover bg-center sm:hidden"
          style={{ backgroundImage: `url(${slug ? HERO_IMAGES_MOBILE[slug] : heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-jet-950 via-jet-950/70 to-jet-950/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-jet-950/50 via-transparent to-jet-950" />
        <div className="absolute inset-0 gold-grid-overlay opacity-25" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[60vh] sm:min-h-[72vh] flex flex-col items-center justify-center pt-32 pb-10">
          <nav className="text-xs font-mono text-jet-300 mb-4 flex flex-wrap justify-center">
            <Link to="/" className="hover:text-gold-500 transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link to="/modelos" className="hover:text-gold-500 transition-colors">Modelos</Link>
            <span className="mx-2">/</span>
            <span className="text-jet-100">{model.name}</span>
          </nav>

          <div className="text-center max-w-3xl">
            <ScrollReveal delay={0.1}>
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-gold-500 font-semibold">
                Ficha técnica
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mt-4">
                {modelKey}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-jet-300 mt-5 font-sans text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
                {model.tagline}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                <Link
                  to={`/contacto?modelo=${model.slug}`}
                  className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-[11px] rounded flex items-center gap-1.5 transition-colors"
                >
                  Cotizar este modelo <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/modelos"
                  className="px-6 py-3 border border-jet-700 hover:border-gold-500/50 text-jet-300 hover:text-white font-mono text-[11px] uppercase tracking-wider rounded transition-colors"
                >
                  Ver todos los modelos
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Placa de especificaciones del modelo */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-8">
          <ScrollReveal delay={0.4}>
            <div className="relative border border-jet-800/70 bg-jet-950/70 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-gold-500/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-gold-500/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-gold-500/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-gold-500/40" />
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-dashed divide-y lg:divide-y-0 divide-jet-800/60">
                {[
                  { k: "Área útil", v: model.area },
                  { k: "Capacidad", v: model.capacity },
                  { k: "Peso", v: model.weight },
                  { k: "Aislamiento", v: model.insulation },
                ].map((s) => (
                  <div key={s.k} className="px-6 py-4 text-center">
                    <p className="text-[9px] font-mono tracking-widest text-gold-500/80 border border-gold-500/15 px-2 py-0.5 inline-block mb-2">
                      {s.k.toUpperCase()}
                    </p>
                    <p className="font-mono text-white font-semibold text-sm">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Diseño interior — Plano de distribución */}
      <section className="section-texture py-24 bg-jet-900 text-white relative">
        <div className="absolute inset-0 gold-grid-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
                  Diseño interior
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
                  Distribución <span className="text-gold-500">a su medida</span>
                </h2>
                <p className="text-jet-300 font-light leading-relaxed mt-4">
                  El interior se configura según el uso final: dormitorios, casino,
                  clínica, oficina o depósito. Compartimos el plano de distribución
                  antes del montaje para que cada zona quede exactamente donde la necesita.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="relative border border-jet-800/70 bg-jet-950/50 p-4">
                    <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l-2 border-t-2 border-gold-500/40" />
                    <p className="text-[10px] font-mono uppercase tracking-widest text-jet-300">Dimensiones abierto</p>
                    <p className="font-mono text-gold-500 font-semibold mt-1">{model.dimensionsOpen}</p>
                  </div>
                  <div className="relative border border-jet-800/70 bg-jet-950/50 p-4">
                    <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l-2 border-t-2 border-gold-500/40" />
                    <p className="text-[10px] font-mono uppercase tracking-widest text-jet-300">Área útil</p>
                    <p className="font-mono text-gold-500 font-semibold mt-1">{model.area}</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="mt-8">
                  <h3 className="font-display font-bold text-white text-sm mb-4">Zonas disponibles</h3>
                  <div className="flex flex-wrap gap-2">
                    {model.zones.map((zone) => {
                      const chip = zoneChips.find((z) => z.label.split(" ")[0].toLowerCase() === zone.split(" ")[0].toLowerCase());
                      return (
                        <span key={zone} className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-gold-500 border border-gold-500/20 px-3 py-1.5">
                          {chip && <chip.icon className="w-3 h-3" />}
                          {zone}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <ScrollReveal direction="left" delay={0.1}>
              <div className="relative border border-jet-800/70 bg-jet-950/70 backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-gold-500/40" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-gold-500/40" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-gold-500/40" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-gold-500/40" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[9px] font-mono tracking-widest text-gold-500/80 border border-gold-500/15 px-2 py-0.5">
                      PLANO · {modelKey.toUpperCase()}
                    </span>
                    <span className="text-[9px] font-mono tracking-widest text-jet-400 uppercase">p. pleg.</span>
                  </div>
                  <FloorPlan slug={model.slug} del={(e) => ({ animationDelay: `${e}s` })} />
                  <p className="text-[10px] font-mono text-jet-400 mt-3">
                    Distribución ilustrativa de zonas · {model.dimensionsOpen}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="border-t border-jet-800/60 mt-20 mb-16" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Columna izquierda */}
            <div className="space-y-12">
              <ScrollReveal>
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">Descripción</span>
                  <h2 className="font-display text-3xl font-bold mt-3 tracking-tight mb-5">Conoce el {modelKey}</h2>
                  <p className="text-jet-300 font-light leading-relaxed">{model.description}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.05}>
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-6">Características</h2>
                  <ul className="space-y-3">
                    {model.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-jet-300 bg-jet-900/60 border border-jet-800 rounded-lg p-3.5">
                        <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                        <span className="font-light">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div>
                  <h2 className="font-display text-2xl font-bold text-white mb-6">Sectores de aplicación</h2>
                  <div className="flex flex-wrap gap-2">
                    {model.applications.map((app) => (
                      <span key={app} className="text-xs font-mono uppercase tracking-wider text-gold-500 border border-gold-500/20 px-3 py-1.5">{app}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Layers className="w-4 h-4 text-gold-500" />
                    <h2 className="font-display text-2xl font-bold text-white">Opciones y personalización</h2>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {model.options.map((opt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-jet-300 bg-jet-900/60 border border-jet-800 rounded p-3.5">
                        <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                        <span className="font-light">{opt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Columna derecha */}
            <div className="space-y-8">
              <ScrollReveal>
                <div className="relative border border-jet-800/70 bg-jet-900/50 p-6">
                  <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gold-500/40" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-gold-500/40" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-gold-500/40" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gold-500/40" />
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-jet-800">
                    <Ruler className="w-4 h-4 text-gold-500" />
                    <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">Especificaciones técnicas</h3>
                  </div>
                  <div className="space-y-1">
                    {model.specs.map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between text-sm py-2 border-b border-jet-800/60 last:border-b-0">
                        <span className="font-mono text-jet-300 uppercase tracking-wider text-[11px]">{spec.label}</span>
                        <span className="font-mono text-white font-medium text-xs text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.05}>
                <div className="relative border border-jet-800/70 bg-jet-900/50 p-6">
                  <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gold-500/40" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gold-500/40" />
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-gold-500" />
                    <h3 className="font-display font-bold text-white text-sm">Plazo de entrega</h3>
                  </div>
                  <p className="text-xs text-jet-300 font-light">{model.deliveryTime}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="relative border border-jet-800/70 bg-jet-900/50 p-6">
                  <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gold-500/40" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gold-500/40" />
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-gold-500" />
                    <h3 className="font-display font-bold text-white text-sm">Requisitos de instalación</h3>
                  </div>
                  <ul className="space-y-2">
                    {model.installRequirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-jet-300 font-light">
                        <span className="w-1 h-1 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div className="relative border border-jet-800/70 bg-jet-900/50 p-6">
                  <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gold-500/40" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gold-500/40" />
                  <h3 className="font-display font-bold text-white text-sm mb-3">Descargar ficha técnica</h3>
                  <p className="text-xs text-jet-300 font-light mb-4">Solicite la ficha técnica completa con planos CAD y memoria descriptiva.</p>
                  <button
                    type="button"
                    onClick={() => setFichaOpen(true)}
                    className="w-full px-5 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-xs rounded flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" /> Solicitar ficha técnica
                  </button>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <Link to={`/contacto?modelo=${model.slug}`} className="w-full px-5 py-3 border border-gold-500 hover:bg-gold-500/5 text-gold-500 font-bold uppercase tracking-wider text-xs rounded flex items-center justify-center gap-2 transition-colors">
                  Cotizar este modelo <ArrowRight className="w-4 h-4" />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
        </section>

      {/* Secciones técnicas detalladas — solo si el modelo tiene datos del PDF */}
      {(model.certifications || model.structuralDetails || model.resistanceSpecs || model.electricalSystem || model.windowSpec || model.doorSpec || model.wallPanelSpec) && (
        <section className="section-texture py-24 bg-jet-950 text-white relative">
          <div className="absolute inset-0 gold-grid-overlay" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6 space-y-20">

            {/* Certificaciones */}
            {model.certifications && model.certifications.length > 0 && (
              <ScrollReveal>
                <div className="text-center max-w-3xl mx-auto">
                  <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
                    Normativas
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
                    Certificaciones del <span className="text-gold-500">Producto</span>
                  </h2>
                  <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {model.certifications.map((cert) => (
                      <div
                        key={cert}
                        className="relative flex items-center gap-3 bg-jet-900/60 border border-gold-500/20 px-6 py-4 rounded"
                      >
                        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-l-2 border-t-2 border-gold-500/40" />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-r-2 border-b-2 border-gold-500/40" />
                        <Shield className="w-5 h-5 text-gold-500 shrink-0" />
                        <span className="font-mono text-sm text-white font-semibold tracking-wide">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Detalles Estructurales */}
            {model.structuralDetails && model.structuralDetails.length > 0 && (
              <ScrollReveal delay={0.05}>
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Ruler className="w-4 h-4 text-gold-500" />
                    <h2 className="font-display text-2xl font-bold text-white">Detalles Estructurales</h2>
                  </div>
                  <div className="relative border border-jet-800/70 bg-jet-900/50 overflow-hidden">
                    <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gold-500/40" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-gold-500/40" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-gold-500/40" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gold-500/40" />

                    {/* Table header */}
                    <div className="grid grid-cols-3 gap-px bg-jet-800/60">
                      <div className="bg-jet-950 px-6 py-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500 font-semibold">Componente</span>
                      </div>
                      <div className="bg-jet-950 px-6 py-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500 font-semibold">Material</span>
                      </div>
                      <div className="bg-jet-950 px-6 py-3">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500 font-semibold">Especificación</span>
                      </div>
                    </div>

                    {/* Table rows */}
                    {model.structuralDetails.map((detail, i) => (
                      <div key={i} className="grid grid-cols-3 gap-px bg-jet-800/30">
                        <div className="bg-jet-900/80 px-6 py-3">
                          <span className="text-sm text-white font-medium">{detail.component}</span>
                        </div>
                        <div className="bg-jet-900/80 px-6 py-3">
                          <span className="text-sm text-jet-300 font-light">{detail.material}</span>
                        </div>
                        <div className="bg-jet-900/80 px-6 py-3">
                          <span className="text-xs font-mono text-gold-500/80">{detail.spec}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Capacidades de Resistencia */}
            {model.resistanceSpecs && model.resistanceSpecs.length > 0 && (
              <ScrollReveal delay={0.1}>
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <FlameKindling className="w-4 h-4 text-gold-500" />
                    <h2 className="font-display text-2xl font-bold text-white">Capacidades de Resistencia</h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {model.resistanceSpecs.map((rs, i) => (
                      <div key={i} className="relative bg-jet-900/60 border border-jet-800/70 p-5 rounded">
                        <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-gold-500/40" />
                        <p className="text-[10px] font-mono uppercase tracking-widest text-jet-400 mb-2">{rs.label}</p>
                        <p className="font-mono text-lg text-white font-bold">{rs.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Sistema Eléctrico */}
            {model.electricalSystem && model.electricalSystem.length > 0 && (
              <ScrollReveal delay={0.15}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Zap className="w-4 h-4 text-gold-500" />
                      <h2 className="font-display text-2xl font-bold text-white">Sistema Eléctrico</h2>
                    </div>
                    <ul className="space-y-3">
                      {model.electricalSystem.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-jet-300 bg-jet-900/60 border border-jet-800 rounded p-3.5">
                          <Plug className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                          <span className="font-light">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cerramientos */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <PanelTop className="w-4 h-4 text-gold-500" />
                      <h2 className="font-display text-2xl font-bold text-white">Cerramientos</h2>
                    </div>
                    <div className="space-y-4">
                      {model.windowSpec && (
                        <div className="relative bg-jet-900/60 border border-jet-800/70 p-4 rounded">
                          <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-gold-500/40" />
                          <p className="text-[10px] font-mono uppercase tracking-widest text-gold-500 mb-2">Ventana</p>
                          <p className="text-sm text-jet-300 font-light leading-relaxed">{model.windowSpec}</p>
                        </div>
                      )}
                      {model.doorSpec && (
                        <div className="relative bg-jet-900/60 border border-jet-800/70 p-4 rounded">
                          <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-gold-500/40" />
                          <p className="text-[10px] font-mono uppercase tracking-widest text-gold-500 mb-2">Puerta</p>
                          <p className="text-sm text-jet-300 font-light leading-relaxed">{model.doorSpec}</p>
                        </div>
                      )}
                      {model.wallPanelSpec && (
                        <div className="relative bg-jet-900/60 border border-jet-800/70 p-4 rounded">
                          <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-gold-500/40" />
                          <p className="text-[10px] font-mono uppercase tracking-widest text-gold-500 mb-2">Paneles de pared</p>
                          <p className="text-sm text-jet-300 font-light leading-relaxed">{model.wallPanelSpec}</p>
                        </div>
                      )}
                      {model.roofSpec && (
                        <div className="relative bg-jet-900/60 border border-jet-800/70 p-4 rounded">
                          <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-gold-500/40" />
                          <p className="text-[10px] font-mono uppercase tracking-widest text-gold-500 mb-2">Techo</p>
                          <p className="text-sm text-jet-300 font-light leading-relaxed">{model.roofSpec}</p>
                        </div>
                      )}
                      {model.floorSpec && (
                        <div className="relative bg-jet-900/60 border border-jet-800/70 p-4 rounded">
                          <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-gold-500/40" />
                          <p className="text-[10px] font-mono uppercase tracking-widest text-gold-500 mb-2">Piso</p>
                          <p className="text-sm text-jet-300 font-light leading-relaxed">{model.floorSpec}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

          </div>
        </section>
      )}

      {/* Modelos relacionados */}
      {related.length > 0 && (
        <section className="section-texture py-24 bg-jet-950 text-white relative">
          <div className="absolute inset-0 gold-grid-overlay" />
          <div className="max-w-6xl mx-auto px-6 relative">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold text-white mb-8">Modelos relacionados</h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel, i) => (
                <div key={rel.slug}>
                  <ScrollReveal delay={0.05 * i}>
                    <Link
                      to={`/modelos/${rel.slug}`}
                      className="group relative block bg-jet-950/50 border border-jet-800/70 hover:border-gold-500/40 transition-all overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gold-500/40 z-10" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gold-500/40 z-10" />
                      <HeroImage
                        src={HERO_IMAGES[rel.slug]}
                        alt={rel.name}
                        className="h-44 border-b border-jet-800/70"
                      />
                      <div className="p-6">
                        <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-gold-500 transition-colors">{rel.name}</h3>
                        <p className="text-sm text-jet-300 mb-3">{rel.tagline}</p>
                        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-jet-300 uppercase tracking-wider">
                          <span>{rel.area}</span>
                          <span className="text-jet-700">|</span>
                          <span>{rel.capacity}</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-gold-500 text-xs font-medium mt-3 group-hover:gap-2.5 transition-all">
                          Ver ficha <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <FichaModal
        open={fichaOpen}
        onClose={() => setFichaOpen(false)}
        modelo={{ slug: model.slug, name: model.name }}
      />
    </>
  );
}
