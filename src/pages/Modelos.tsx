import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import Models from "../components/Models";
import UsageCards from "../components/UsageCards";
import ScrollReveal from "../hooks/ScrollReveal";
import { catalog } from "../data/modelos";

const HERO_IMAGE = "/images/modelos-hero.webp";
const G = "#FEC934";

function PhaseDrawing({ phase }: { phase: 1 | 2 | 3 }) {
  const base = phase * 0.25;
  const del = (extra: number) => ({ animationDelay: `${base + extra}s` });

  return (
    <svg viewBox="0 0 220 140" className="w-full max-w-[190px] h-auto" preserveAspectRatio="xMidYMid meet">
      <g stroke={G} strokeWidth={1} fill="none">
        {/* Shared: outer frame */}
        <rect x={20} y={18} width={180} height={96} rx={2} className="animate-phase-line" style={del(0)} />

        {phase === 1 && (
          <>
            <line x1={40} y1={18} x2={40} y2={114} className="animate-phase-line" style={del(0.12)} />
            <line x1={110} y1={18} x2={110} y2={114} className="animate-phase-line" style={del(0.2)} />
            <line x1={180} y1={18} x2={180} y2={114} className="animate-phase-line" style={del(0.28)} />
            <line x1={40} y1={18} x2={110} y2={66} className="animate-phase-line" style={del(0.36)} />
            <line x1={110} y1={66} x2={180} y2={114} className="animate-phase-line" style={del(0.44)} />
            <line x1={20} y1={128} x2={200} y2={128} strokeOpacity={0.6} className="animate-phase-line" style={del(0.52)} />
            <path d="M20 124 V132 M200 124 V132" strokeOpacity={0.6} className="animate-phase-line" style={del(0.56)} />
          </>
        )}

        {phase === 2 && (
          <>
            <line x1={20} y1={52} x2={200} y2={52} className="animate-phase-line" style={del(0.12)} />
            <line x1={20} y1={80} x2={200} y2={80} className="animate-phase-line" style={del(0.2)} />
            <line x1={110} y1={18} x2={110} y2={114} className="animate-phase-line" style={del(0.28)} />
            <path d="M44 34 l8 8 M60 34 l8 8 M76 34 l8 8 M44 50 l8 8 M60 50 l8 8" strokeOpacity={0.5} className="animate-phase-line" style={del(0.4)} />
            <path d="M132 106 l8 8 M148 106 l8 8 M164 106 l8 8 M132 122 l8 8 M148 122 l8 8" strokeOpacity={0.5} className="animate-phase-line" style={del(0.48)} />
            <line x1={20} y1={128} x2={200} y2={128} strokeOpacity={0.6} className="animate-phase-line" style={del(0.56)} />
            <path d="M20 124 V132 M200 124 V132" strokeOpacity={0.6} className="animate-phase-line" style={del(0.6)} />
          </>
        )}

        {phase === 3 && (
          <>
            <rect x={30} y={40} width={56} height={34} strokeOpacity={0.85} className="animate-phase-line" style={del(0.12)} />
            <rect x={42} y={52} width={24} height={12} strokeOpacity={0.45} className="animate-phase-line" style={del(0.22)} />
            <rect x={110} y={94} width={72} height={16} strokeOpacity={0.85} className="animate-phase-line" style={del(0.3)} />
            <path d="M130 88 h14 v6 h-14 z" strokeOpacity={0.45} className="animate-phase-line" style={del(0.38)} />
            <path d="M176 80 A18 18 0 0 1 194 98" strokeOpacity={0.75} className="animate-phase-line" style={del(0.46)} />
            <path d="M156 88 v10 h-12" strokeOpacity={0.75} className="animate-phase-line" style={del(0.5)} />
            <line x1={20} y1={128} x2={200} y2={128} strokeOpacity={0.6} className="animate-phase-line" style={del(0.58)} />
            <path d="M20 124 V132 M200 124 V132" strokeOpacity={0.6} className="animate-phase-line" style={del(0.62)} />
          </>
        )}
      </g>

      {phase === 2 && (
        <text x={65} y={70} fontSize={7} fontFamily="ui-monospace,monospace" fill={G} fillOpacity={0.55} textAnchor="middle" stroke="none">
          PIR 80
        </text>
      )}
      {phase === 3 && (
        <text x={56} y={96} fontSize={7} fontFamily="ui-monospace,monospace" fill={G} fillOpacity={0.55} textAnchor="middle" stroke="none">
          DORM.
        </text>
      )}
    </svg>
  );
}

const assemblyPhases = [
  { fig: "01", title: "Estructura" },
  { fig: "02", title: "Cerramiento" },
  { fig: "03", title: "Montaje" },
];

const heroSpecs = [
  "3 líneas de módulos",
  "45–144 m² útiles",
  "Montaje en 1–2 días",
  "Aislamiento PIR 80mm",
];

export default function Modelos() {
  return (
    <>
      <SEO
        title="Catálogo de Modelos — Multispace, Doble Ala, Mini Doble Ala"
        description="Tres líneas de módulos prefabricados optimizados para diferentes sectores. Especificaciones técnicas, fichas y aplicaciones por uso."
        url="/modelos"
        structuredData={{ "@context": "https://schema.org", "@type": "ItemList", name: "Modelos Beyritech", numberOfItems: 3, itemListElement: catalog.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: m.name })) }}
      />

      {/* Hero — Catálogo de Modelos (imagen de fondo) */}
      <section className="relative overflow-hidden bg-jet-950 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-jet-950 via-jet-950/80 to-jet-950/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-jet-950/70 via-transparent to-jet-950" />
        <div className="absolute inset-0 gold-grid-overlay opacity-40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[60vh] sm:min-h-[72vh] flex flex-col items-center justify-center pt-32 pb-10">
          <div className="text-center max-w-3xl">
            <ScrollReveal delay={0.1}>
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-gold-500 font-semibold">
                Catálogo de Modelos
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] mt-4">
                Módulos <span className="text-gold-500">Multipropósitos</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-jet-300 mt-5 font-sans text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
                Tres líneas de módulos prefabricados plegables, cada una optimizada para
                un requisito de espacio y sector: del campamento de obra al laboratorio,
                de la oficina ejecutiva a la clínica de campaña.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                <Link
                  to="/contacto"
                  className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-[11px] rounded flex items-center gap-1.5 transition-colors"
                >
                  Cotizar mi módulo <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/proceso"
                  className="px-6 py-3 border border-jet-700 hover:border-gold-500/50 text-jet-300 hover:text-white font-mono text-[11px] uppercase tracking-wider rounded transition-colors"
                >
                  Conocer el proceso
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-8">
          <ScrollReveal delay={0.4}>
            <div className="relative border border-jet-800/70 bg-jet-950/70 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-gold-500/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-gold-500/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-gold-500/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-gold-500/40" />
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-dashed divide-y lg:divide-y-0 divide-jet-800/60">
                {assemblyPhases.map((item) => (
                  <div key={item.fig} className="px-5 py-4 text-center flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[9px] font-mono tracking-widest text-gold-500/80 border border-gold-500/15 px-2 py-0.5">
                        FASE {item.fig}
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-jet-400">
                        {item.title}
                      </span>
                    </div>
                    <PhaseDrawing phase={Number(item.fig) as 1 | 2 | 3} />
                  </div>
                ))}

                <div className="px-5 py-4 flex flex-col justify-center">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-[9px] font-mono tracking-widest text-gold-500/80 border border-gold-500/15 px-2 py-0.5">
                      DATOS
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {heroSpecs.map((spec) => (
                      <div key={spec} className="flex items-center justify-center gap-2">
                        <span className="w-1 h-1 bg-gold-500 shrink-0" />
                        <p className="text-[10px] font-mono uppercase tracking-wider text-jet-400">
                          {spec}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2 — ¿Qué necesita? (gris) */}
      <UsageCards variant="gray" />

      {/* Section 3 — Catálogo de Ingeniería (oscuro) */}
      <Models />
    </>
  );
}