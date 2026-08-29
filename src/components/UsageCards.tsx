import { ArrowRight, Check } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "../hooks/ScrollReveal";

/* ------------------------------------------------------------------ */
/* Technical drawing helpers                                           */
/* ------------------------------------------------------------------ */

function WallFrame() {
  return (
    <g fill="none" stroke="#FEC934">
      <rect x={10} y={10} width={300} height={180} strokeOpacity={0.25} strokeWidth={1.5} />
      <rect x={13} y={13} width={294} height={174} strokeOpacity={0.7} strokeWidth={1} />
    </g>
  );
}

function Door({ x, y, len }) {
  return (
    <g fill="none" stroke="#FEC934" strokeOpacity={0.75}>
      <path d={`M ${x} ${y} L ${x + len} ${y}`} />
      <path d={`M ${x} ${y} A ${len} ${len} 0 0 0 ${x} ${y - len}`} />
      <circle cx={x} cy={y} r={1.5} fill="#FEC934" strokeOpacity={0.9} />
    </g>
  );
}

function DimH({ x1, x2, y, label }) {
  const mid = (x1 + x2) / 2;
  return (
    <g stroke="#FEC934" strokeOpacity={0.55} fill="none">
      <path d={`M ${x1} ${y} L ${x2} ${y}`} strokeDasharray="2 4" />
      <path d={`M ${x1} ${y - 3} L ${x1} ${y + 3} M ${x2} ${y - 3} L ${x2} ${y + 3}`} />
      <text x={mid} y={y - 6} fontSize={9} fontFamily="ui-monospace,monospace" fill="#FEC934" fillOpacity={0.85} textAnchor="middle" stroke="none">
        {label}
      </text>
    </g>
  );
}

function DimV({ y1, y2, x, label }) {
  const mid = (y1 + y2) / 2;
  return (
    <g stroke="#FEC934" strokeOpacity={0.55} fill="none">
      <path d={`M ${x} ${y1} L ${x} ${y2}`} strokeDasharray="2 4" />
      <path d={`M ${x - 3} ${y1} L ${x + 3} ${y1} M ${x - 3} ${y2} L ${x + 3} ${y2}`} />
      <text x={x + 7} y={mid + 3} fontSize={9} fontFamily="ui-monospace,monospace" fill="#FEC934" fillOpacity={0.85} textAnchor="middle" stroke="none">
        {label}
      </text>
    </g>
  );
}

function Furniture({ x, y, w, h, dashed }: { x: number; y: number; w: number; h: number; dashed?: boolean }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={3}
      fill="#FEC934"
      fillOpacity={0.06}
      stroke="#FEC934"
      strokeOpacity={0.5}
      strokeWidth={0.75}
      strokeDasharray={dashed ? "3 3" : undefined}
    />
  );
}

function Bolt({ cx, cy }) {
  return <circle cx={cx} cy={cy} r={1.4} fill="#FEC934" fillOpacity={0.85} stroke="none" />;
}

function RegMark({ className }) {
  return (
    <svg viewBox="0 0 14 14" className={className}>
      <circle cx={7} cy={7} r={5.5} fill="none" stroke="#FEC934" strokeOpacity={0.45} strokeWidth={1} />
      <path d="M7 1.5 V12.5 M1.5 7 H12.5" stroke="#FEC934" strokeOpacity={0.45} strokeWidth={1} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Floor plan schematics                                               */
/* ------------------------------------------------------------------ */

function PlanDormitorio() {
  return (
    <g>
      <WallFrame />
      <DimH x1={10} x2={310} y={-4} label="6.00 m" />
      <DimV y1={10} y2={190} x={324} label="2.40 m" />
      {/* interior walls */}
      <g fill="none" stroke="#FEC934" strokeOpacity={0.55} strokeWidth={0.75}>
        <path d="M112 13 V120 M112 165 V187" />
        <path d="M216 13 V120 M216 165 V187" />
      </g>
      <Door x={112} y={165} len={20} />
      <Door x={216} y={120} len={20} />
      {/* beds */}
      <Furniture x={24} y={40} w={64} h={92} />
      <Furniture x={36} y={52} w={24} h={16} />
      <Furniture x={132} y={72} w={62} h={88} />
      <Furniture x={144} y={84} w={24} h={16} />
      <Furniture x={232} y={44} w={60} h={82} />
      <Furniture x={244} y={56} w={24} h={16} />
      {/* bathroom block */}
      <Furniture x={20} y={140} w={72} h={34} dashed />
      <g stroke="#FEC934" strokeOpacity={0.3} strokeWidth={0.5}>
        <path d="M30 140 L56 166 M42 140 L68 166 M54 140 L80 166 M66 140 L86 160" />
      </g>
      <text x={56} y={158} fontSize={7} fontFamily="ui-monospace,monospace" fill="#FEC934" fillOpacity={0.6} textAnchor="middle" stroke="none">
        SS.HH.
      </text>
      <Door x={20} y={120} len={18} />
    </g>
  );
}

function PlanOficina() {
  return (
    <g>
      <WallFrame />
      <DimH x1={10} x2={310} y={-4} label="9.00 m" />
      <DimV y1={10} y2={190} x={324} label="2.40 m" />
      {/* conference room */}
      <g fill="none" stroke="#FEC934" strokeOpacity={0.55} strokeWidth={0.75}>
        <path d="M196 13 V16 M196 85 V187" />
        <path d="M13 16 H196 M196 16 V85 H304 V187" />
      </g>
      <Furniture x={212} y={34} w={72} h={36} />
      <g fill="#FEC934" fillOpacity={0.15} stroke="none">
        <circle cx={234} cy={26} r={5} />
        <circle cx={262} cy={26} r={5} />
        <circle cx={234} cy={78} r={5} />
        <circle cx={262} cy={78} r={5} />
      </g>
      {/* reception */}
      <Furniture x={24} y={26} w={60} h={24} />
      {/* workstations */}
      <Furniture x={40} y={120} w={70} h={26} />
      <Furniture x={138} y={120} w={70} h={26} />
      <Furniture x={40} y={156} w={70} h={26} />
      <Furniture x={138} y={156} w={70} h={26} />
      <g fill="#FEC934" fillOpacity={0.15} stroke="none">
        <circle cx={64} cy={108} r={6} />
        <circle cx={162} cy={108} r={6} />
        <circle cx={64} cy={146} r={6} />
        <circle cx={162} cy={146} r={6} />
      </g>
      <Door x={284} y={120} len={18} />
    </g>
  );
}

function PlanAula() {
  return (
    <g>
      <WallFrame />
      <DimH x1={10} x2={310} y={-4} label="4.80 m" />
      <DimV y1={10} y2={190} x={324} label="2.40 m" />
      {/* board */}
      <Furniture x={24} y={22} w={110} h={7} />
      {/* teacher desk */}
      <Furniture x={28} y={58} w={62} h={22} />
      {/* rows */}
      {[0, 1, 2].map((col) =>
        [0, 1, 2].map((row) => (
          <Fragment key={`${col}-${row}`}>
            <Furniture
              x={128 + col * 62}
              y={64 + row * 42}
              w={34}
              h={18}
            />
          </Fragment>
        ))
      )}
      <Door x={284} y={140} len={18} />
    </g>
  );
}

function PlanAmpliacion() {
  return (
    <g>
      <DimH x1={10} x2={310} y={-4} label="6.00 m total" />
      <DimV y1={10} y2={190} x={324} label="2.40 m" />
      {/* existing module */}
      <g fill="none" stroke="#FEC934">
        <rect x={10} y={10} width={132} height={180} strokeOpacity={0.8} strokeWidth={1.2} />
        <rect x={13} y={13} width={126} height={174} strokeOpacity={0.4} strokeWidth={0.75} />
      </g>
      <Furniture x={26} y={120} w={56} h={34} />
      {/* extension module */}
      <g fill="none" stroke="#FEC934">
        <rect x={164} y={10} width={146} height={180} strokeOpacity={0.6} strokeWidth={1} strokeDasharray="5 4" />
        <rect x={167} y={13} width={140} height={174} strokeOpacity={0.25} strokeWidth={0.75} strokeDasharray="3 3" />
      </g>
      {/* joint */}
      <g stroke="#FEC934" strokeOpacity={0.5} strokeWidth={0.75}>
        <path d="M145 10 V190 M164 10 V190" />
      </g>
      <Bolt cx={154} cy={26} />
      <Bolt cx={154} cy={40} />
      <Bolt cx={154} cy={170} />
      <Bolt cx={154} cy={185} />
      {/* growth arrow */}
      <g stroke="#FEC934" strokeOpacity={0.7} fill="none">
        <path d="M180 96 H292 M292 92 L300 96 L292 100" strokeWidth={1} />
      </g>
      <text x={200} y={60} fontSize={8} fontFamily="ui-monospace,monospace" fill="#FEC934" fillOpacity={0.7} stroke="none">
        FASE 2
      </text>
      <text x={76} y={60} fontSize={8} fontFamily="ui-monospace,monospace" fill="#FEC934" fillOpacity={0.7} textAnchor="middle" stroke="none">
        EXISTENTE
      </text>
    </g>
  );
}

function PlanControl() {
  return (
    <g>
      <WallFrame />
      <DimH x1={10} x2={310} y={-4} label="4.80 m" />
      <DimV y1={10} y2={190} x={324} label="2.40 m" />
      {/* raised floor grid */}
      <g stroke="#FEC934" strokeOpacity={0.14} strokeWidth={0.5}>
        {[40, 70, 100, 130, 160, 190, 220, 250, 280].map((x) => (
          <path key={`v${x}`} d={`M${x} 13 V187`} />
        ))}
        {[40, 70, 100, 130, 160].map((y) => (
          <path key={`h${y}`} d={`M13 ${y} H307`} />
        ))}
      </g>
      {/* console */}
      <Furniture x={20} y={150} w={280} h={30} />
      {[40, 100, 160, 220].map((x) => (
        <rect key={x} x={x} y={144} width={36} height={6} fill="#FEC934" fillOpacity={0.35} stroke="none" />
      ))}
      <g fill="#FEC934" fillOpacity={0.15} stroke="none">
        <circle cx={58} cy={130} r={7} />
        <circle cx={118} cy={130} r={7} />
        <circle cx={178} cy={130} r={7} />
        <circle cx={238} cy={130} r={7} />
      </g>
      <Door x={284} y={80} len={18} />
    </g>
  );
}

function PlanLaboratorio() {
  return (
    <g>
      <WallFrame />
      <DimH x1={10} x2={310} y={-4} label="6.00 m" />
      <DimV y1={10} y2={190} x={324} label="2.40 m" />
      {/* perimeter benches */}
      <Furniture x={26} y={26} w={120} h={30} />
      <Furniture x={26} y={64} w={32} h={118} />
      {/* sink */}
      <circle cx={76} cy={41} r={6} fill="none" stroke="#FEC934" strokeOpacity={0.5} />
      {/* fume hood */}
      <Furniture x={228} y={26} w={52} h={52} dashed />
      <g stroke="#FEC934" strokeOpacity={0.35} strokeWidth={0.75}>
        <path d="M246 26 V64 M262 26 V64 M228 41 H280 M228 54 H280" />
      </g>
      {/* center island + stools */}
      <Furniture x={150} y={112} w={120} h={36} />
      <g fill="#FEC934" fillOpacity={0.15} stroke="none">
        <circle cx={172} cy={96} r={6} />
        <circle cx={202} cy={96} r={6} />
        <circle cx={232} cy={96} r={6} />
        <circle cx={262} cy={96} r={6} />
      </g>
      <Door x={284} y={120} len={18} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const usages = [
  {
    fig: "01",
    code: "BR-ALO-01",
    title: "Alojamiento de Personal",
    description:
      "Dormitorios, campamentos y viviendas temporales con confort térmico garantizado para operaciones en campo.",
    specs: [
      "Muros con aislamiento PIR 80 mm",
      "Capacidad 8–12 personas",
      "Instalación completa en 48 h",
    ],
    model: "Multispace",
    link: "/modelos/multispace",
    plan: <PlanDormitorio />,
  },
  {
    fig: "02",
    code: "BR-OFE-01",
    title: "Espacios de Trabajo",
    description:
      "Oficinas, centros de operaciones y salas de reunión con acabados profesionales y alta productividad.",
    specs: [
      "Doble amplitud hasta 144 m²",
      "Acabados corporativos premium",
      "Cableado estructurado preparado",
    ],
    model: "Doble Ala",
    link: "/modelos/doble-ala",
    plan: <PlanOficina />,
  },
  {
    fig: "03",
    code: "BR-AUL-01",
    title: "Aulas y Atención Sanitaria",
    description:
      "Clínicas, aulas, laboratorios y espacios sanitarios con aislamiento acústico y térmico certificado.",
    specs: [
      "Aislamiento acústico certificado",
      "Superficies sanitarias lavables",
      "Cumplimiento normativo INVIMA",
    ],
    model: "Mini Doble Ala",
    link: "/modelos/mini-doble-ala",
    plan: <PlanAula />,
  },
  {
    fig: "04",
    code: "BR-AMP-01",
    title: "Ampliación Progresiva",
    description:
      "Expanda su infraestructura sin detener operaciones. Módulos que se suman al espacio existente de forma escalable.",
    specs: [
      "Expansión sin parada de producción",
      "Conexión modular sin obras",
      "Reubicable a otra sede",
    ],
    link: "/modelos",
    plan: <PlanAmpliacion />,
  },
  {
    fig: "05",
    code: "BR-CTL-01",
    title: "Salas de Control Industrial",
    description:
      "Centros de operaciones y oficinas de campo con protección ambiental y tecnológica.",
    specs: [
      "Piso técnico para cableado",
      "Control de temperatura preciso",
      "Aislamiento EMI disponible",
    ],
    model: "Doble Ala",
    link: "/modelos/doble-ala",
    plan: <PlanControl />,
  },
  {
    fig: "06",
    code: "BR-LAB-01",
    title: "Laboratorios e Investigación",
    description:
      "Espacios especializados para laboratorios, investigación científica y análisis de campo con estándares rigurosos.",
    specs: [
      "Mesones antimicrobianos",
      "Extracción de gases opcional",
      "Fuente de agua purificada",
    ],
    model: "Mini Doble Ala",
    link: "/modelos/mini-doble-ala",
    plan: <PlanLaboratorio />,
  },
];

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

interface UsageCardsProps {
  variant?: "dark" | "gray";
  headingLevel?: 1 | 2;
}

export default function UsageCards({
  variant = "dark",
  headingLevel = 2,
}: UsageCardsProps = {}) {
  const isGray = variant === "gray";
  const isPage = headingLevel === 1;
  const TitleTag = isPage ? "h1" : "h2";
  const sectionBg = isGray ? "bg-jet-900" : "bg-jet-950";
  const cardBg = isGray ? "bg-jet-950/40 border-gold-500/15 hover:bg-jet-950/60" : "bg-jet-900/40 border-gold-500/15 hover:bg-jet-900/60";
  const schematicBg = isGray ? "border-gold-500/10 bg-jet-900/50" : "border-gold-500/10 bg-jet-950/40";
  const padY = isPage ? "pt-32 pb-24" : "py-24";

  return (
    <section className={`section-texture ${padY} relative overflow-hidden ${sectionBg}`}>
      {/* Grid texture background */}
      <div className="absolute inset-0 gold-grid-overlay" />

      {/* Decorative gold line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500 font-semibold">
              ¿Qué necesita?
            </span>
            <TitleTag className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 tracking-tight text-white leading-tight">
              Un módulo para cada{" "}
              <span className="relative inline-block">
                necesidad
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold-500/40" />
              </span>
            </TitleTag>
            <p className="text-jet-400 mt-5 font-sans text-base font-light leading-relaxed max-w-xl mx-auto">
              Cada solución parte de un plano: espacios modulares diseñados y certificados para su operación, no al revés.
            </p>
          </div>
        </ScrollReveal>

        {/* Technical sheets grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {usages.map((usage, i) => (
            <Fragment key={i}>
              <ScrollReveal delay={0.05 * (i % 3)}>
              <article className={`relative group ${cardBg} rounded-lg p-5 flex flex-col h-full hover:border-gold-500/40 hover:-translate-y-1 transition-all duration-300`}>
                {/* Title block */}
                <div className="flex items-center justify-between pb-3 border-b border-dashed border-gold-500/20">
                  <span className="text-[10px] font-mono tracking-widest text-gold-500/80">
                    FIG. {usage.fig}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-gold-500/80">
                    {usage.code}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-jet-500">
                    ESC 1:50
                  </span>
                </div>

                {/* Schematic */}
                <div className={`relative mt-4 border ${schematicBg}`}>
                  <RegMark className="absolute top-0 left-0 w-4 h-4 -translate-x-1/2 -translate-y-1/2" />
                  <RegMark className="absolute top-0 right-0 w-4 h-4 translate-x-1/2 -translate-y-1/2" />
                  <RegMark className="absolute bottom-0 left-0 w-4 h-4 -translate-x-1/2 translate-y-1/2" />
                  <RegMark className="absolute bottom-0 right-0 w-4 h-4 translate-x-1/2 translate-y-1/2" />
                  <svg viewBox="0 -18 332 218" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                    {usage.plan}
                  </svg>
                </div>

                {/* Body */}
                <h3 className="font-display text-lg font-bold text-white mt-5 mb-2 tracking-tight leading-snug">
                  {usage.title}
                </h3>
                <p className="text-sm text-jet-400 font-light leading-relaxed mb-5">
                  {usage.description}
                </p>

                {/* Verification checklist */}
                <ul className="space-y-2 flex-1">
                  {usage.specs.map((spec, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-jet-300">
                      <span className="w-4 h-4 rounded-sm border border-gold-500/40 mt-0.5 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-gold-500" strokeWidth={3} />
                      </span>
                      <span className="font-light leading-snug">{spec}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gold-500/15 flex items-center justify-between gap-3">
                  {usage.model ? (
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gold-500/70 border border-gold-500/15 px-2.5 py-1">
                      Modelo {usage.model}
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono uppercase tracking-widest text-jet-500">
                      Solución escalable
                    </span>
                  )}
                  <Link
                    to={usage.link}
                    className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-600 font-medium transition-colors group/link"
                  >
                    <span className="text-xs">Ver plano</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}