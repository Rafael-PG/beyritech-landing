import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Building, ShieldCheck, Gauge, Package, Move, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import ScrollReveal from "../hooks/ScrollReveal";
import { empresa } from "../data/empresa";
import SpeedSustainabilityLogistics from "../components/SpeedSustainabilityLogistics";

const HERO_IMAGE = "/images/nosotros-hero.webp";
const G = "#FEC934";

/* ---------------- Scene 1: Agroindustria ---------------- */
function AgroScene({ del }: { del: (extra: number) => CSSProperties }) {
  return (
    <>
      {/* ground */}
      <line x1={20} y1={108} x2={200} y2={108} strokeOpacity={0.5} className="animate-phase-line" style={del(0.1)} />
      {/* crop rows */}
      <path d="M32 108 L32 96 M46 108 L46 96 M60 108 L60 96 M74 108 L74 96" strokeOpacity={0.4} className="animate-phase-line" style={del(0.18)} />
      <path d="M32 96 L46 96 M60 96 L74 96" strokeOpacity={0.2} className="animate-phase-line" style={del(0.24)} />
      {/* module */}
      <rect x={92} y={72} width={62} height={36} strokeOpacity={0.85} className="animate-phase-line" style={del(0.32)} />
      <line x1={92} y1={90} x2={154} y2={90} strokeOpacity={0.35} className="animate-phase-line" style={del(0.38)} />
      <rect x={100} y={78} width={13} height={8} strokeOpacity={0.45} className="animate-phase-line" style={del(0.42)} />
      <rect x={120} y={78} width={13} height={8} strokeOpacity={0.45} className="animate-phase-line" style={del(0.46)} />
      <rect x={140} y={92} width={12} height={16} strokeOpacity={0.55} className="animate-phase-line" style={del(0.5)} />
      {/* door */}
      <rect x={140} y={92} width={12} height={16} strokeOpacity={0.6} className="animate-phase-line" style={del(0.5)} />
      {/* water tank */}
      <circle cx={184} cy={94} r={9} strokeOpacity={0.55} className="animate-phase-line" style={del(0.58)} />
      <line x1={178} y1={104} x2={178} y2={108} strokeOpacity={0.45} className="animate-phase-line" style={del(0.62)} />
      <line x1={190} y1={104} x2={190} y2={108} strokeOpacity={0.45} className="animate-phase-line" style={del(0.66)} />
      {/* sun */}
      <path d="M52 26 L52 20 M62 30 L66 24 M42 30 L38 24" strokeOpacity={0.35} className="animate-phase-line" style={del(0.7)} />
      <circle cx={52} cy={34} r={7} strokeOpacity={0.4} className="animate-phase-line" style={del(0.74)} />
    </>
  );
}

/* ---------------- Scene 2: Logística ---------------- */
function LogisticaScene({ del }: { del: (extra: number) => CSSProperties }) {
  return (
    <>
      {/* ground */}
      <line x1={20} y1={108} x2={200} y2={108} strokeOpacity={0.5} className="animate-phase-line" style={del(0.1)} />
      {/* warehouse shell (background) */}
      <rect x={26} y={40} width={150} height={60} strokeOpacity={0.3} className="animate-phase-line" style={del(0.16)} />
      <path d="M26 40 L70 22 L114 40" strokeOpacity={0.25} className="animate-phase-line" style={del(0.22)} />
      {/* cladding ribs */}
      <line x1={40} y1={40} x2={40} y2={100} strokeOpacity={0.12} className="animate-phase-line" style={del(0.26)} />
      <line x1={60} y1={40} x2={60} y2={100} strokeOpacity={0.12} className="animate-phase-line" style={del(0.28)} />
      <line x1={96} y1={40} x2={96} y2={100} strokeOpacity={0.12} className="animate-phase-line" style={del(0.3)} />
      <line x1={116} y1={40} x2={116} y2={100} strokeOpacity={0.12} className="animate-phase-line" style={del(0.32)} />
      <line x1={136} y1={40} x2={136} y2={100} strokeOpacity={0.12} className="animate-phase-line" style={del(0.34)} />
      {/* module (foreground) */}
      <rect x={56} y={82} width={72} height={26} strokeOpacity={0.85} className="animate-phase-line" style={del(0.42)} />
      <rect x={64} y={86} width={12} height={7} strokeOpacity={0.45} className="animate-phase-line" style={del(0.48)} />
      <rect x={84} y={86} width={12} height={7} strokeOpacity={0.45} className="animate-phase-line" style={del(0.52)} />
      {/* pallet stack beside */}
      <rect x={146} y={92} width={24} height={8} strokeOpacity={0.5} className="animate-phase-line" style={del(0.58)} />
      <rect x={150} y={84} width={16} height={8} strokeOpacity={0.5} className="animate-phase-line" style={del(0.62)} />
      <line x1={146} y1={92} x2={146} y2={100} strokeOpacity={0.4} className="animate-phase-line" style={del(0.66)} />
      <line x1={162} y1={92} x2={162} y2={100} strokeOpacity={0.4} className="animate-phase-line" style={del(0.68)} />
      <line x1={150} y1={92} x2={158} y2={92} strokeOpacity={0.3} className="animate-phase-line" style={del(0.7)} />
    </>
  );
}

/* ---------------- Scene 3: Corporativo ---------------- */
function CorporativoScene({ del }: { del: (extra: number) => CSSProperties }) {
  return (
    <>
      {/* sidewalk */}
      <line x1={20} y1={108} x2={200} y2={108} strokeOpacity={0.5} className="animate-phase-line" style={del(0.1)} />
      <line x1={20} y1={112} x2={200} y2={112} strokeOpacity={0.25} className="animate-phase-line" style={del(0.14)} />
      {/* tall building (background, right) */}
      <rect x={140} y={24} width={40} height={84} strokeOpacity={0.3} className="animate-phase-line" style={del(0.18)} />
      <path d="M140 24 L160 14 L180 24" strokeOpacity={0.2} className="animate-phase-line" style={del(0.22)} />
      <path d="M148 30 h10 M148 42 h10 M148 54 h10 M148 66 h10 M148 78 h10 M162 30 h10 M162 42 h10 M162 54 h10 M162 66 h10 M162 78 h10" strokeOpacity={0.18} className="animate-phase-line" style={del(0.28)} />
      {/* module (foreground, left) */}
      <rect x={40} y={76} width={80} height={32} strokeOpacity={0.85} className="animate-phase-line" style={del(0.4)} />
      <line x1={40} y1={92} x2={120} y2={92} strokeOpacity={0.35} className="animate-phase-line" style={del(0.46)} />
      <rect x={48} y={82} width={14} height={7} strokeOpacity={0.5} className="animate-phase-line" style={del(0.5)} />
      <rect x={68} y={82} width={14} height={7} strokeOpacity={0.5} className="animate-phase-line" style={del(0.54)} />
      <rect x={88} y={82} width={14} height={7} strokeOpacity={0.5} className="animate-phase-line" style={del(0.58)} />
      {/* door + knob */}
      <rect x={98} y={92} width={14} height={16} strokeOpacity={0.6} className="animate-phase-line" style={del(0.64)} />
      <circle cx={109} cy={100} r={1.5} strokeOpacity={0.4} className="animate-phase-line" style={del(0.68)} />
      {/* small tree */}
      <circle cx={30} cy={42} r={8} strokeOpacity={0.4} className="animate-phase-line" style={del(0.72)} />
      <line x1={30} y1={50} x2={30} y2={62} strokeOpacity={0.4} className="animate-phase-line" style={del(0.76)} />
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
        {phase === 1 && <AgroScene del={del} />}
        {phase === 2 && <LogisticaScene del={del} />}
        {phase === 3 && <CorporativoScene del={del} />}
      </g>
    </svg>
  );
}

const processPhases = [
  { fig: "01", title: "Agro" },
  { fig: "02", title: "Logística" },
  { fig: "03", title: "Corporativo" },
];

const heroSpecs = [
  "Módulos importados de alta performance",
  "Configuración y diseño a medida",
  "Entrega en todo Perú y Latam",
  "Montaje y puesta en marcha incluidos",
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Calidad verificada",
    text: "Seleccionamos y certificamos cada módulo. Configuración, acabados e instalaciones según norma antes de salir al sitio.",
  },
  {
    icon: Gauge,
    title: "Deploy rápido",
    text: "De la consulta al espacio operativo en semanas. Montaje Plug & Play en 1-2 días, sin obra húmeda.",
  },
  {
    icon: Package,
    title: "Configuración a medida",
    text: "Distribución interior, acabados y equipamiento diseñados para el uso final: dormitorio, oficina, clínica, bodega.",
  },
  {
    icon: Move,
    title: "Movilidad total",
    text: "Módulos reubicables entre campañas o proyectos. Amplíe, reubique o retíre el espacio según lo que demande su operación.",
  },
];

export default function Nosotros() {
  return (
    <>
      <SEO
        title="Sobre Beyritech — Espacios Modulares de Alta Performance"
        description="Integrador de módulos prefabricados de alta performance. Configuramos, diseñamos y entregamos espacios operativos en todo Perú y Latinoamérica."
        url="/nosotros"
      />

      {/* Hero — Nosotros (imagen de fondo) */}
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
                Sobre nosotros
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] mt-4">
                Espacios modulares de <span className="text-gold-500">alta performance</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-jet-300 mt-5 font-sans text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
                Somos el integrador detrás de cada espacio operativo: seleccionamos
                tecnología modular de primer nivel, la configuramos a su necesidad y
                la entregamos lista para operar en todo Perú y Latinoamérica.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                <Link
                  to="/contacto"
                  className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-[11px] rounded flex items-center gap-1.5 transition-colors"
                >
                  Cotiza tu espacio <ArrowRight className="w-3.5 h-3.5" />
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

      {/* Quiénes somos */}
      <section className="section-texture py-24 bg-jet-900 text-white relative">
        <div className="absolute inset-0 gold-grid-overlay" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Story */}
            <div className="space-y-6">
              <ScrollReveal>
                <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
                  Quiénes somos
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold mt-3 tracking-tight">
                  Su socio técnico, no un intermediario
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-jet-300 font-light leading-relaxed">
                  Beyritech integra módulos prefabricados de alta performance para la
                  agroindustria, la logística, el sector corporativo y la salud.
                  Seleccionamos tecnología modular de primer nivel y la convertimos en
                  un espacio operativo listo para trabajar.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <p className="text-jet-300 font-light leading-relaxed">
                  Asumimos la responsabilidad de todo el proceso: asesoría técnica,
                  configuración y diseño, logística de importación y transporte,
                  montaje y puesta en marcha. Un solo interlocutor para entregar un
                  espacio que cumple en tiempo y en característica.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="pt-6 border-t border-jet-800">
                  <h3 className="font-display text-lg font-bold text-white mb-4">Datos de la empresa</h3>
                  <ul className="space-y-3 text-sm text-jet-300">
                    <li className="flex items-start gap-3">
                      <Building className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <span>{empresa.nombre}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <span>{empresa.direccionCompleta}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <span>{empresa.telefono}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                      <span>{empresa.email}</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((p, i) => (
                <div key={p.title}>
                  <ScrollReveal delay={0.05 * i}>
                    <div className="relative border border-jet-800/70 bg-jet-950/50 p-6 h-full">
                      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gold-500/40" />
                      <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-gold-500/40" />
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-gold-500/40" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gold-500/40" />
                      <p.icon className="w-8 h-8 text-gold-500 mb-4" />
                      <h3 className="font-display font-bold text-white text-base mb-2">{p.title}</h3>
                      <p className="text-xs text-jet-300 font-light leading-relaxed">{p.text}</p>
                    </div>
                  </ScrollReveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SpeedSustainabilityLogistics />
    </>
  );
}
