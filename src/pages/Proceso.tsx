import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Compass, ShieldCheck, Truck, KeyRound, Handshake, Search, PencilRuler, PackageCheck, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import ScrollReveal from "../hooks/ScrollReveal";

const HERO_IMAGE = "/images/proceso-hero.webp";
const G = "#FEC934";

/* ---------------- Scene 1: Asesoría / Requerimientos ---------------- */
function AsesoriaScene({ del }: { del: (extra: number) => CSSProperties }) {
  return (
    <>
      {/* consultant head + shoulders (left) */}
      <circle cx={52} cy={52} r={10} strokeOpacity={0.7} className="animate-phase-line" style={del(0.1)} />
      <path d="M34 86 Q34 68 52 68 Q70 68 70 86" strokeOpacity={0.6} className="animate-phase-line" style={del(0.16)} />
      {/* client head + shoulders (right) */}
      <circle cx={168} cy={52} r={10} strokeOpacity={0.7} className="animate-phase-line" style={del(0.24)} />
      <path d="M150 86 Q150 68 168 68 Q186 68 186 86" strokeOpacity={0.6} className="animate-phase-line" style={del(0.3)} />
      {/* speech / requirements bubble */}
      <path d="M104 40 Q104 34 112 34 L148 34 Q156 34 156 42 L156 52 Q156 60 148 60 L124 60 L116 70 L118 60 L104 60 Q96 60 96 52 L96 42 Q96 40 104 40" strokeOpacity={0.5} className="animate-phase-line" style={del(0.38)} />
      {/* lines inside bubble */}
      <line x1={104} y1={44} x2={130} y2={44} strokeOpacity={0.3} className="animate-phase-line" style={del(0.46)} />
      <line x1={104} y1={50} x2={120} y2={50} strokeOpacity={0.3} className="animate-phase-line" style={del(0.5)} />
      {/* checklist document */}
      <rect x={44} y={94} width={40} height={26} strokeOpacity={0.5} className="animate-phase-line" style={del(0.56)} />
      <path d="M50 102 l3 3 l5 -6 M50 110 l3 3 l5 -6 M60 102 l6 0 M60 110 l6 0" strokeOpacity={0.4} className="animate-phase-line" style={del(0.64)} />
    </>
  );
}

/* ---------------- Scene 2: Diseño / Distribución ---------------- */
function DisenoScene({ del }: { del: (extra: number) => CSSProperties }) {
  return (
    <>
      {/* interior space outline */}
      <rect x={42} y={44} width={104} height={64} strokeOpacity={0.85} className="animate-phase-line" style={del(0.1)} />
      {/* partition walls */}
      <line x1={70} y1={44} x2={70} y2={108} strokeOpacity={0.45} className="animate-phase-line" style={del(0.16)} />
      <line x1={120} y1={44} x2={120} y2={108} strokeOpacity={0.45} className="animate-phase-line" style={del(0.2)} />
      {/* door arc */}
      <path d="M70 108 A14 14 0 0 0 84 94" strokeOpacity={0.6} className="animate-phase-line" style={del(0.26)} />
      {/* furniture per zone */}
      <rect x={48} y={50} width={16} height={26} strokeOpacity={0.4} className="animate-phase-line" style={del(0.32)} />
      <rect x={78} y={50} width={34} height={20} strokeOpacity={0.4} className="animate-phase-line" style={del(0.36)} />
      <rect x={128} y={50} width={12} height={12} strokeOpacity={0.4} className="animate-phase-line" style={del(0.4)} />
      <rect x={128} y={66} width={12} height={12} strokeOpacity={0.4} className="animate-phase-line" style={del(0.44)} />
      {/* pencil */}
      <line x1={178} y1={56} x2={196} y2={40} strokeOpacity={0.6} className="animate-phase-line" style={del(0.52)} />
      <path d="M196 40 l4 0 l0 -4" strokeOpacity={0.5} className="animate-phase-line" style={del(0.56)} />
      {/* dimension lines */}
      <line x1={42} y1={38} x2={146} y2={38} strokeOpacity={0.3} className="animate-phase-line" style={del(0.62)} />
      <path d="M42 35 V41 M146 35 V41" strokeOpacity={0.3} className="animate-phase-line" style={del(0.66)} />
      <text x={94} y={34} fontSize={5.5} fontFamily="ui-monospace,monospace" fill={G} fillOpacity={0.45} textAnchor="middle" stroke="none" className="animate-phase-line" style={del(0.7)}>
        DISTRIBUCIÓN
      </text>
    </>
  );
}

/* ---------------- Scene 3: Entrega operativa ---------------- */
function EntregaScene({ del }: { del: (extra: number) => CSSProperties }) {
  return (
    <>
      {/* ground */}
      <line x1={20} y1={108} x2={200} y2={108} strokeOpacity={0.5} className="animate-phase-line" style={del(0.08)} />
      {/* delivered module */}
      <rect x={50} y={64} width={90} height={44} strokeOpacity={0.85} className="animate-phase-line" style={del(0.16)} />
      <line x1={50} y1={86} x2={140} y2={86} strokeOpacity={0.35} className="animate-phase-line" style={del(0.22)} />
      {/* windows */}
      <rect x={58} y={70} width={16} height={10} strokeOpacity={0.5} className="animate-phase-line" style={del(0.28)} />
      <rect x={80} y={70} width={16} height={10} strokeOpacity={0.5} className="animate-phase-line" style={del(0.32)} />
      <rect x={102} y={70} width={16} height={10} strokeOpacity={0.5} className="animate-phase-line" style={del(0.36)} />
      {/* door */}
      <rect x={116} y={88} width={14} height={20} strokeOpacity={0.6} className="animate-phase-line" style={del(0.42)} />
      {/* key */}
      <circle cx={172} cy={44} r={10} strokeOpacity={0.6} className="animate-phase-line" style={del(0.5)} />
      <line x1={180} y1={52} x2={194} y2={66} strokeOpacity={0.55} className="animate-phase-line" style={del(0.54)} />
      <line x1={188} y1={60} x2={196} y2={68} strokeOpacity={0.45} className="animate-phase-line" style={del(0.58)} />
      <path d="M184 72 l3 3 l4-4" strokeOpacity={0.45} className="animate-phase-line" style={del(0.6)} />
      {/* check / delivered */}
      <circle cx={52} cy={40} r={9} strokeOpacity={0.5} className="animate-phase-line" style={del(0.66)} />
      <path d="M48 40 l3 3 l5-6" strokeOpacity={0.6} strokeWidth={1.2} className="animate-phase-line" style={del(0.7)} />
    </>
  );
}

/* ---------------- PhaseDrawing wrapper ---------------- */
function PhaseDrawing({ phase }: { phase: 1 | 2 | 3 }) {
  const base = phase * 0.25;
  const del = (extra: number) => ({ animationDelay: `${base + extra}s` });

  return (
    <svg viewBox="0 0 220 140" className="w-full max-w-[190px] h-auto" preserveAspectRatio="xMidYMid meet">
      <g stroke={G} strokeWidth={1} fill="none">
        <rect x={20} y={18} width={180} height={104} rx={2} className="animate-phase-line" style={del(0)} />
        {phase === 1 && <AsesoriaScene del={del} />}
        {phase === 2 && <DisenoScene del={del} />}
        {phase === 3 && <EntregaScene del={del} />}
      </g>
      {phase === 3 && (
        <text x={52} y={30} fontSize={4.5} fontFamily="ui-monospace,monospace" fill={G} fillOpacity={0.55} textAnchor="middle" stroke="none">
          ENTREGADO
        </text>
      )}
    </svg>
  );
}

const processPhases = [
  { fig: "01", title: "Asesoría" },
  { fig: "02", title: "Diseño" },
  { fig: "03", title: "Entrega" },
];

const heroSpecs = [
  "6 pasos del proceso",
  "Respuesta en 24–48 h",
  "Hasta 12 módulos / camión",
  "Soporte técnico en campo",
];

const closing = [
  {
    icon: Search,
    title: "Consúltanos",
    text: "Cuéntenos su proyecto: sector, área y ubicación.",
  },
  {
    icon: PencilRuler,
    title: "Configuramos",
    text: "Diseñamos la distribución y el modelo adecuado a su necesidad.",
  },
  {
    icon: PackageCheck,
    title: "Recíbelo",
    text: "Coordinamos el transporte, el montaje y la puesta en marcha.",
  },
];

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Contacto y Alcance",
    description: "Cuéntenos sobre su proyecto. Un ingeniero consultor recopila los requerimientos técnicos: sector, área, ubicación, condiciones climáticas y plazo objetivo.",
    detail: "Respuesta en 24-48 horas con propuesta preliminar.",
  },
  {
    icon: Compass,
    number: "02",
    title: "Diseño y Propuesta",
    description: "Nuestro equipo de ingeniería diseña la configuración óptima: selección de modelo, cálculo estructural, distribución interior y especificaciones técnicas.",
    detail: "Incluye plano de distribución y memoria técnica.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Control de Calidad",
    description: "Inspección dimensional, pruebas de estanqueidad, verificación de aislamiento y revisión de acabados. Cada módulo cumple con las especificaciones aprobadas.",
    detail: "Reporte fotográfico de cada etapa.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Logística y Transporte",
    description: "Coordinamos el transporte terrestre, marítimo o fluvial según la ubicación. Módulos plegados para maximizar la eficiencia del flete.",
    detail: "Hasta 12 módulos por camión (según modelo).",
  },
  {
    icon: KeyRound,
    number: "05",
    title: "Montaje y Entrega",
    description: "Nuestro equipo de montaje viaja al sitio para instalar, conectar y poner en marcha los módulos. Espacio operativo en semanas, no en meses.",
    detail: "Capacitación al personal incluida.",
  },
  {
    icon: Handshake,
    number: "06",
    title: "Acompañamiento en Campo",
    description: "Tras la entrega, nuestro equipo técnico acompaña la operación en sitio: supervisión de uso, ajustes finos y soporte a las instalaciones mientras el proyecto se pone en marcha.",
    detail: "Soporte técnico en campo y canal directo con el equipo de planta.",
  },
];

export default function Proceso() {
  return (
    <>
      <SEO
        title="Cómo Trabajamos — Proceso de 6 Pasos"
        description="Proceso claro de 6 pasos: contacto, diseño, control de calidad, logística, montaje y acompañamiento en campo. Sin imprevistos, sin sobrecostos."
        url="/proceso"
        structuredData={{ "@context": "https://schema.org", "@type": "HowTo", name: "Proceso Beyritech", description: "De la consulta al espacio operativo en 6 pasos", step: steps.map((s) => ({ "@type": "HowToStep", name: s.title, text: s.description })) }}
      />

      {/* Hero — Proceso (imagen de fondo) */}
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
                Cómo trabajamos
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] mt-4">
                De la consulta al espacio <span className="text-gold-500">operativo</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-jet-300 mt-5 font-sans text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
                Un proceso claro de 6 pasos. Sin imprevistos, sin sobrecostos.
                Cada etapa tiene un responsable y un plazo definido.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                <Link
                  to="/contacto"
                  className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-[11px] rounded flex items-center gap-1.5 transition-colors"
                >
                  Solicitar cotización <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/modelos"
                  className="px-6 py-3 border border-jet-700 hover:border-gold-500/50 text-jet-300 hover:text-white font-mono text-[11px] uppercase tracking-wider rounded transition-colors"
                >
                  Ver modelos
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Placa de escenas animadas */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-8">
          <ScrollReveal delay={0.4}>
            <div className="relative border border-jet-800/70 bg-jet-950/70 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-gold-500/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-gold-500/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-gold-500/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-gold-500/40" />
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-dashed divide-y lg:divide-y-0 divide-jet-800/60">
                {processPhases.map((item) => (
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

      {/* Pasos del proceso */}
      <section className="section-texture py-24 bg-jet-900 text-white relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="absolute inset-0 gold-grid-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
                Las 6 etapas
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
                Un proceso <span className="text-gold-500">claro y medible</span>
              </h2>
              <p className="text-jet-400 mt-4 font-sans text-base font-light leading-relaxed">
                Cada etapa tiene un responsable, un entregable y un plazo definido. Así evitamos imprevistos y sobrecostos.
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.number}>
                <ScrollReveal delay={0.05 * i}>
                  <div className="group relative flex gap-5 py-8 border-b border-dashed border-jet-800/60">
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 rounded-lg bg-jet-950 border border-gold-500/20 flex items-center justify-center transition-colors group-hover:border-gold-500/40">
                        <step.icon className="w-6 h-6 text-gold-500" />
                      </div>
                      {i < steps.length - 1 && (
                        <div className="absolute left-1/2 top-full w-px h-8 -translate-x-1/2 bg-gradient-to-b from-gold-500/40 to-transparent" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-start gap-4 mb-2">
                        <span className="text-[10px] font-mono tracking-widest text-gold-500/70 mt-1.5">
                          {step.number}
                        </span>
                        <h3 className="font-display text-xl font-bold text-white tracking-tight leading-snug">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-jet-300 font-light leading-relaxed mb-2">
                        {step.description}
                      </p>
                      <p className="text-xs font-mono text-gold-500 uppercase tracking-wider">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resumen de 3 pasos + CTA */}
      <section className="section-texture py-24 bg-jet-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 gold-grid-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
                Lo simple
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
                De la consulta al espacio <span className="text-gold-500">operativo</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {closing.map((item, i) => (
              <div key={item.title}>
                <ScrollReveal delay={0.05 * i}>
                  <div className="relative border border-jet-800/70 bg-jet-950/50 p-6 h-full">
                    <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gold-500/40" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-gold-500/40" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-gold-500/40" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gold-500/40" />
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-mono tracking-widest text-gold-500/70">
                        0{i + 1}
                      </span>
                      <span className="w-9 h-9 rounded bg-jet-950 border border-gold-500/20 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-gold-500" />
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-jet-300 font-light mt-1.5 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center">
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-sm rounded transition-colors"
              >
                Iniciar proyecto <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
