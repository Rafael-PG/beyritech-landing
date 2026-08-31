import type { CSSProperties } from "react";
import { ArrowRight, Snowflake, Zap, RotateCcw, Droplets, Layers, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import ScrollReveal from "../hooks/ScrollReveal";
import { sectors } from "../data/soluciones";

const HERO_IMAGE = "/images/soluciones-hero.webp";
const G = "#FEC934";

/* ---------- Scene: Agroindustria ---------- */
function AgroScene({ del }: { del: (extra: number) => CSSProperties }) {
  return (
    <>
      {/* ground */}
      <line x1={20} y1={108} x2={200} y2={108} strokeOpacity={0.5} className="animate-phase-line" style={del(0.1)} />
      {/* crop rows */}
      <path d="M30 108 L30 98 M44 108 L44 98 M58 108 L58 98 M72 108 L72 98 M86 108 L86 98" strokeOpacity={0.35} className="animate-phase-line" style={del(0.18)} />
      <path d="M30 98 L44 98 M58 98 L72 98" strokeOpacity={0.2} className="animate-phase-line" style={del(0.24)} />
      {/* module */}
      <rect x={100} y={72} width={60} height={36} strokeOpacity={0.85} className="animate-phase-line" style={del(0.32)} />
      <line x1={100} y1={90} x2={160} y2={90} strokeOpacity={0.35} className="animate-phase-line" style={del(0.38)} />
      <rect x={108} y={78} width={14} height={8} strokeOpacity={0.45} className="animate-phase-line" style={del(0.42)} />
      <rect x={130} y={78} width={14} height={8} strokeOpacity={0.45} className="animate-phase-line" style={del(0.46)} />
      <rect x={140} y={94} width={12} height={14} strokeOpacity={0.55} className="animate-phase-line" style={del(0.5)} />
      {/* water tank */}
      <circle cx={182} cy={96} r={8} strokeOpacity={0.55} className="animate-phase-line" style={del(0.56)} />
      <line x1={178} y1={104} x2={178} y2={108} strokeOpacity={0.45} className="animate-phase-line" style={del(0.6)} />
      <line x1={186} y1={104} x2={186} y2={108} strokeOpacity={0.45} className="animate-phase-line" style={del(0.6)} />
      {/* sun rays */}
      <path d="M50 30 L50 22 M62 28 L68 22 M38 28 L32 22" strokeOpacity={0.35} className="animate-phase-line" style={del(0.64)} />
      <circle cx={50} cy={36} r={8} strokeOpacity={0.4} className="animate-phase-line" style={del(0.68)} />
      {/* ticks */}
      <path d="M20 104 V112 M200 104 V112" strokeOpacity={0.4} className="animate-phase-line" style={del(0.72)} />
    </>
  );
}

/* ---------- Scene: Minería / Obra ---------- */
function MineriaScene({ del }: { del: (extra: number) => CSSProperties }) {
  return (
    <>
      {/* mountain terrain */}
      <path d="M20 108 L52 64 L72 84 L96 48 L124 76 L144 60 L172 92 L200 108" strokeOpacity={0.25} className="animate-phase-line" style={del(0.1)} />
      {/* ground */}
      <line x1={20} y1={108} x2={200} y2={108} strokeOpacity={0.5} className="animate-phase-line" style={del(0.16)} />
      {/* module */}
      <rect x={50} y={78} width={64} height={30} strokeOpacity={0.85} className="animate-phase-line" style={del(0.24)} />
      <line x1={50} y1={93} x2={114} y2={93} strokeOpacity={0.35} className="animate-phase-line" style={del(0.3)} />
      <rect x={58} y={82} width={12} height={7} strokeOpacity={0.45} className="animate-phase-line" style={del(0.34)} />
      <rect x={76} y={82} width={12} height={7} strokeOpacity={0.45} className="animate-phase-line" style={del(0.38)} />
      <rect x={96} y={92} width={10} height={16} strokeOpacity={0.55} className="animate-phase-line" style={del(0.42)} />
      {/* solar panel on roof */}
      <path d="M56 78 L72 68 L92 68 L80 78" strokeOpacity={0.4} className="animate-phase-line" style={del(0.48)} />
      <line x1={64} y1={73} x2={86} y2={73} strokeOpacity={0.25} className="animate-phase-line" style={del(0.52)} />
      {/* crane */}
      <line x1={150} y1={108} x2={150} y2={44} strokeOpacity={0.6} className="animate-phase-line" style={del(0.56)} />
      <line x1={138} y1={44} x2={170} y2={44} strokeOpacity={0.55} className="animate-phase-line" style={del(0.62)} />
      <path d="M170 44 V62" strokeOpacity={0.45} className="animate-phase-line" style={del(0.66)} />
      <path d="M166 62 l4 0 l0 -4" strokeOpacity={0.35} className="animate-phase-line" style={del(0.7)} />
      {/* safety flag */}
      <path d="M140 108 V88 L132 92 V84" strokeOpacity={0.4} className="animate-phase-line" style={del(0.74)} />
      {/* ticks */}
      <path d="M20 104 V112 M200 104 V112" strokeOpacity={0.4} className="animate-phase-line" style={del(0.78)} />
    </>
  );
}

/* ---------- Scene: Corporativo ---------- */
function CorporativoScene({ del }: { del: (extra: number) => CSSProperties }) {
  return (
    <>
      {/* ground / sidewalk */}
      <line x1={20} y1={108} x2={200} y2={108} strokeOpacity={0.5} className="animate-phase-line" style={del(0.1)} />
      <line x1={20} y1={112} x2={200} y2={112} strokeOpacity={0.25} className="animate-phase-line" style={del(0.14)} />
      {/* tall building (background) */}
      <rect x={30} y={28} width={32} height={80} strokeOpacity={0.3} className="animate-phase-line" style={del(0.18)} />
      <path d="M30 28 L46 18 L62 28" strokeOpacity={0.2} className="animate-phase-line" style={del(0.22)} />
      <rect x={36} y={34} width={5} height={5} strokeOpacity={0.18} className="animate-phase-line" style={del(0.26)} />
      <rect x={46} y={34} width={5} height={5} strokeOpacity={0.18} className="animate-phase-line" style={del(0.28)} />
      <rect x={36} y={44} width={5} height={5} strokeOpacity={0.18} className="animate-phase-line" style={del(0.3)} />
      <rect x={46} y={44} width={5} height={5} strokeOpacity={0.18} className="animate-phase-line" style={del(0.32)} />
      <rect x={36} y={54} width={5} height={5} strokeOpacity={0.18} className="animate-phase-line" style={del(0.34)} />
      <rect x={46} y={54} width={5} height={5} strokeOpacity={0.18} className="animate-phase-line" style={del(0.36)} />
      <rect x={36} y={64} width={5} height={5} strokeOpacity={0.18} className="animate-phase-line" style={del(0.38)} />
      <rect x={46} y={64} width={5} height={5} strokeOpacity={0.18} className="animate-phase-line" style={del(0.4)} />
      {/* module (foreground) */}
      <rect x={86} y={72} width={80} height={36} strokeOpacity={0.85} className="animate-phase-line" style={del(0.44)} />
      <line x1={86} y1={90} x2={166} y2={90} strokeOpacity={0.35} className="animate-phase-line" style={del(0.5)} />
      <rect x={94} y={78} width={16} height={8} strokeOpacity={0.5} className="animate-phase-line" style={del(0.54)} />
      <rect x={118} y={78} width={16} height={8} strokeOpacity={0.5} className="animate-phase-line" style={del(0.58)} />
      <rect x={142} y={78} width={16} height={8} strokeOpacity={0.5} className="animate-phase-line" style={del(0.62)} />
      {/* door */}
      <rect x={150} y={92} width={14} height={16} strokeOpacity={0.6} className="animate-phase-line" style={del(0.66)} />
      <circle cx={161} cy={100} r={1.5} strokeOpacity={0.4} className="animate-phase-line" style={del(0.7)} />
      {/* ticks */}
      <path d="M20 104 V112 M200 104 V112" strokeOpacity={0.4} className="animate-phase-line" style={del(0.74)} />
    </>
  );
}

/* ---------- PhaseDrawing wrapper ---------- */
function PhaseDrawing({ phase }: { phase: 1 | 2 | 3 }) {
  const base = phase * 0.25;
  const del = (extra: number) => ({ animationDelay: `${base + extra}s` });

  return (
    <svg viewBox="0 0 220 140" className="w-full max-w-[190px] h-auto" preserveAspectRatio="xMidYMid meet">
      <g stroke={G} strokeWidth={1} fill="none">
        <rect x={20} y={18} width={180} height={104} rx={2} className="animate-phase-line" style={del(0)} />
        {phase === 1 && <AgroScene del={del} />}
        {phase === 2 && <MineriaScene del={del} />}
        {phase === 3 && <CorporativoScene del={del} />}
      </g>
    </svg>
  );
}

const solutionPhases = [
  { fig: "01", title: "Agro" },
  { fig: "02", title: "Minería" },
  { fig: "03", title: "Corporativo" },
];

const heroSpecs = [
  "5 sectores de industria",
  "Configuración a medida",
  "3 líneas de módulos",
  "Cobertura nacional",
];

const sharedBenefits = [
  {
    title: "Aislamiento térmico y acústico",
    description:
      "Panel PIR de 80 mm que protege del clima de sierra y de los ruidos del entorno, pensado para climas extremos y ambientes de estudio.",
    icon: Snowflake,
  },
  {
    title: "Despliegue en 1–2 días",
    description:
      "Estructura plegable lista con montaje acelerado, ideal para campañas agrícolas y vacaciones escolares con plazos ajustados.",
    icon: Zap,
  },
  {
    title: "Reubicable entre proyectos",
    description:
      "Se retira al terminar la obra y se reubica en la siguiente campaña o proyecto, maximizando el retorno de cada inversión.",
    icon: RotateCcw,
  },
  {
    title: "Cero obra húmeda",
    description:
      "No requiere cimentación profunda ni obra de albañilería, permitiendo instalación dentro de naves en operación continua.",
    icon: Droplets,
  },
  {
    title: "Ampliación sin detener operaciones",
    description:
      "Configuración modular progresiva que crece junto a la demanda sin interrumpir la operación del sector.",
    icon: Layers,
  },
  {
    title: "Costos predecibles",
    description:
      "Presupuesto cerrado desde el inicio con instalación controlada, sin desviaciones por imprevistos de construcción tradicional.",
    icon: Scale,
  },
];

export default function Soluciones() {
  return (
    <>
      <SEO
        title="Soluciones por Sector — Módulos Prefabricados"
        description="Configuraciones modulares específicas para agroindustria, logística, obra, corporaciones y educación. Espacios diseñados para los desafíos de cada industria."
        url="/soluciones"
      />

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
                Soluciones por Sector
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] mt-4">
                Diseñados para su <span className="text-gold-500">industria</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-jet-300 mt-5 font-sans text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
                Cada sector tiene desafíos únicos. Nuestras configuraciones modulares
                se adaptan a las necesidades específicas de su operación.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                <Link
                  to="/casos-de-exito"
                  className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-[11px] rounded flex items-center gap-1.5 transition-colors"
                >
                  Ver casos de éxito <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/contacto"
                  className="px-6 py-3 border border-jet-700 hover:border-gold-500/50 text-jet-300 hover:text-white font-mono text-[11px] uppercase tracking-wider rounded transition-colors"
                >
                  Cotizar ahora
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
                {solutionPhases.map((item) => (
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

      <section className="section-texture py-24 bg-jet-900 text-white relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="absolute inset-0 gold-grid-overlay" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
                Por Sector
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
                Explore por <span className="text-gold-500">sector</span>
              </h2>
              <p className="text-jet-400 mt-4 font-sans text-base font-light leading-relaxed">
                Cada industria exige una configuración distinta. Conozca cómo nuestro módulo se adapta a cada operación.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectors.map((sector, i) => (
              <div key={sector.slug}>
                <ScrollReveal delay={0.05 * (i % 3)}>
                  <Link
                    to={`/soluciones/${sector.slug}`}
                    className="group relative flex flex-col h-full bg-jet-950/40 border border-jet-800/70 rounded-xl overflow-hidden hover:border-gold-500/40 hover:-translate-y-1 transition-all duration-300 p-6"
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
                    <div className="flex items-center justify-between pb-4 border-b border-dashed border-gold-500/20">
                      <div className="w-11 h-11 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                        <sector.icon className="w-6 h-6 text-gold-500" />
                      </div>
                      <span className="text-[11px] font-mono tracking-widest text-jet-500">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white mt-5 mb-2 tracking-tight">
                      {sector.title}
                    </h3>
                    <p className="text-sm text-jet-300 font-light leading-relaxed mb-5">
                      {sector.description}
                    </p>

                    <ul className="space-y-2 flex-1 mb-6">
                      {sector.challenges.map((c, j) => (
                        <li key={j} className="text-xs text-jet-400 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gold-500 shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>

                    <span className="inline-flex items-center gap-1.5 text-gold-500 text-xs font-medium group-hover:gap-2.5 transition-all mt-auto">
                      Ver solución <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-texture py-24 bg-jet-950 text-white relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:700px]">
        <div className="absolute inset-0 gold-grid-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative lg:grid lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <ScrollReveal>
            <div className="max-w-xl mb-12 lg:mb-0 lg:sticky lg:top-32 self-start">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
                Beneficios transversales
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 tracking-tight leading-tight">
                Ventajas que aplican a <span className="text-gold-500">todo sector</span>
              </h2>
              <p className="text-jet-400 mt-4 font-sans text-base font-light leading-relaxed">
                Más allá del sector, nuestra estructura plegable comparte un mismo estándar de desempeño en cada configuración.
              </p>
              <div className="mt-8 border-l-2 border-gold-500/40 pl-4">
                <p className="text-sm text-jet-300 font-light leading-relaxed">
                  Un solo sistema estructural, seis garantías que se mantienen sin importar dónde ni cómo se instale.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="border-l border-jet-800/70 lg:pl-10">
            {sharedBenefits.map((benefit, i) => (
              <div key={benefit.title}>
                <ScrollReveal delay={0.05 * i}>
                  <div className="group relative py-6 border-b border-dashed border-jet-800/60 flex gap-5">
                    <div className="relative shrink-0 pt-1">
                    <div className="absolute -left-[41px] top-6 w-3 h-px bg-gold-500/50" />
                    <div className="w-12 h-12 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center transition-colors group-hover:bg-gold-500/20">
                      <benefit.icon className="w-6 h-6 text-gold-500" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-[10px] font-mono tracking-widest text-gold-500/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-lg font-bold text-white tracking-tight leading-snug">
                        {benefit.title}
                      </h3>
                    </div>
                      <p className="text-sm text-jet-300 font-light leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}