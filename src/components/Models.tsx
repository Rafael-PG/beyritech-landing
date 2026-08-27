import { Ruler, Download, ArrowRight } from "lucide-react";
import ScrollReveal from "../hooks/ScrollReveal";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

interface Spec {
  label: string;
  value: string;
}

interface ModelInfo {
  id: string;
  name: string;
  tagline: string;
  specs: Spec[];
  applications: string[];
  description: string;
}

const models: ModelInfo[] = [
  {
    id: "multispace",
    name: "Módulo Plegable Multispace",
    tagline: "Versatilidad estructural para múltiples sectores",
    specs: [
      { label: "Dimensiones", value: "6m × 12m × 3m" },
      { label: "Área útil", value: "72 m²" },
      { label: "Capacidad", value: "8–12 personas" },
      { label: "Aislamiento PIR", value: "80mm – R-24" },
    ],
    applications: ["Minería", "Construcción", "Educación", "Corporativo"],
    description:
      "Sistema modular plegable de rápida implementación. Ideal para campamentos, aulas temporales y oficinas de faena.",
  },
  {
    id: "doble-ala",
    name: "Módulo Plegable Doble Ala",
    tagline: "Doble amplitud para espacios corporativos y sanitarios",
    specs: [
      { label: "Dimensiones", value: "8m × 18m × 3.2m" },
      { label: "Área útil", value: "144 m²" },
      { label: "Capacidad", value: "16–24 personas" },
      { label: "Aislamiento PIR", value: "80mm – R-24" },
    ],
    applications: ["Salud", "Corporativo", "Educación", "Industrial"],
    description:
      "Estructura de doble ala plegable que ofrece el doble de espacio útil. Perfecto para clínicas modulares y salas de reuniones ejecutivas.",
  },
  {
    id: "mini-doble-ala",
    name: "Mini Doble Ala",
    tagline: "Compacto, eficiente, ideal para espacios reducidos",
    specs: [
      { label: "Dimensiones", value: "5m × 9m × 2.8m" },
      { label: "Área útil", value: "45 m²" },
      { label: "Capacidad", value: "4–8 personas" },
      { label: "Aislamiento PIR", value: "80mm – R-24" },
    ],
    applications: ["Salud", "Industrial", "Corporativo"],
    description:
      "Versión compacta del doble ala. Casetas técnicas, módulos sanitarios y oficinas temporales de rápida implementación.",
  },
];

function MultispaceBlueprint() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="bp-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#FEC934" strokeWidth="0.5" opacity={0.06} />
        </pattern>
      </defs>
      <rect width="400" height="250" fill="url(#bp-grid)" />
      <g opacity={0.6}>
        <text x="200" y="18" textAnchor="middle" fill="#FEC934" fontSize="8" fontFamily="monospace" letterSpacing="2">VISTA LATERAL</text>
      </g>
      <g opacity={0.6}>
        {[60, 140, 220].map((x, i) => (
          <g key={i}>
            <rect x={x} y="35" width="70" height="140" rx="1" fill="none" stroke="#FEC934" strokeWidth="1" />
            <line x1={x} y1="35" x2={x + 70} y2="175" stroke="#FEC934" strokeWidth="0.3" opacity={0.3} />
            <line x1={x + 70} y1="35" x2={x} y2="175" stroke="#FEC934" strokeWidth="0.3" opacity={0.3} />
          </g>
        ))}
      </g>
      {[130, 210].map((cx, i) => (
        <g key={`hinge-${i}`}>
          <circle cx={cx} cy="105" r="4" fill="none" stroke="#FEC934" strokeWidth="1.2" opacity={0.7} />
          <circle cx={cx} cy="105" r="1.5" fill="#FEC934" opacity={0.7} />
        </g>
      ))}
      <line x1={60} y1={190} x2={290} y2={190} stroke="#FEC934" strokeWidth="0.8" opacity={0.5} />
      <line x1={60} y1={186} x2={60} y2={194} stroke="#FEC934" strokeWidth="0.8" opacity={0.5} />
      <line x1={290} y1={186} x2={290} y2={194} stroke="#FEC934" strokeWidth="0.8" opacity={0.5} />
      <text x={175} y={205} textAnchor="middle" fill="#FEC934" fontSize="8" fontFamily="monospace" opacity={0.5}>6.0 m</text>
      <g opacity={0.35}>
        <text x="200" y="225" textAnchor="middle" fill="#FEC934" fontSize="8" fontFamily="monospace" letterSpacing="2">PLEGABLE</text>
      </g>
    </svg>
  );
}

function DobleAlaBlueprint() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="bp-grid2" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#FEC934" strokeWidth="0.5" opacity={0.06} />
        </pattern>
      </defs>
      <rect width="400" height="250" fill="url(#bp-grid2)" />
      <g opacity={0.6}>
        <text x="200" y="18" textAnchor="middle" fill="#FEC934" fontSize="8" fontFamily="monospace" letterSpacing="2">VISTA SUPERIOR — DOBLE ALA</text>
      </g>
      <line x1="200" y1="40" x2="200" y2="190" stroke="#FEC934" strokeWidth="0.6" strokeDasharray="4,3" opacity={0.3} />
      <rect x="40" y="60" width="150" height="110" rx="2" fill="none" stroke="#FEC934" strokeWidth="1" opacity={0.7} />
      <rect x="210" y="60" width="150" height="110" rx="2" fill="none" stroke="#FEC934" strokeWidth="1" opacity={0.7} />
      <text x="115" y="120" textAnchor="middle" fill="#FEC934" fontSize="9" fontFamily="monospace" opacity={0.4}>ALA I</text>
      <text x="285" y="120" textAnchor="middle" fill="#FEC934" fontSize="9" fontFamily="monospace" opacity={0.4}>ALA II</text>
      <line x1={40} y1={200} x2={360} y2={200} stroke="#FEC934" strokeWidth="0.8" opacity={0.5} />
      <line x1={40} y1={196} x2={40} y2={204} stroke="#FEC934" strokeWidth="0.8" opacity={0.5} />
      <line x1={360} y1={196} x2={360} y2={204} stroke="#FEC934" strokeWidth="0.8" opacity={0.5} />
      <text x={200} y={218} textAnchor="middle" fill="#FEC934" fontSize="8" fontFamily="monospace" opacity={0.5}>18.0 m</text>
    </svg>
  );
}

function MiniDobleAlaBlueprint() {
  return (
    <svg viewBox="0 0 400 250" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="bp-grid3" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#FEC934" strokeWidth="0.5" opacity={0.06} />
        </pattern>
      </defs>
      <rect width="400" height="250" fill="url(#bp-grid3)" />
      <g opacity={0.6}>
        <text x="200" y="18" textAnchor="middle" fill="#FEC934" fontSize="8" fontFamily="monospace" letterSpacing="2">VISTA SUPERIOR — MINI DOBLE ALA</text>
      </g>
      <line x1="200" y1="40" x2="200" y2="190" stroke="#FEC934" strokeWidth="0.6" strokeDasharray="4,3" opacity={0.3} />
      <rect x="80" y="60" width="110" height="90" rx="2" fill="none" stroke="#FEC934" strokeWidth="1" opacity={0.7} />
      <rect x="210" y="60" width="110" height="90" rx="2" fill="none" stroke="#FEC934" strokeWidth="1" opacity={0.7} />
      <text x="135" y="110" textAnchor="middle" fill="#FEC934" fontSize="9" fontFamily="monospace" opacity={0.4}>ALA I</text>
      <text x="265" y="110" textAnchor="middle" fill="#FEC934" fontSize="9" fontFamily="monospace" opacity={0.4}>ALA II</text>
      <line x1={80} y1={180} x2={320} y2={180} stroke="#FEC934" strokeWidth="0.8" opacity={0.5} />
      <line x1={80} y1={176} x2={80} y2={184} stroke="#FEC934" strokeWidth="0.8" opacity={0.5} />
      <line x1={320} y1={176} x2={320} y2={184} stroke="#FEC934" strokeWidth="0.8" opacity={0.5} />
      <text x={200} y={198} textAnchor="middle" fill="#FEC934" fontSize="8" fontFamily="monospace" opacity={0.5}>9.0 m</text>
    </svg>
  );
}

function ModelBlueprint({ id }: { id: string }) {
  switch (id) {
    case "multispace": return <MultispaceBlueprint />;
    case "doble-ala": return <DobleAlaBlueprint />;
    case "mini-doble-ala": return <MiniDobleAlaBlueprint />;
    default: return null;
  }
}

export default function Models() {
  const { isLight } = useTheme();

  return (
    <section id="models" className="py-24 bg-jet-950 text-white relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:600px]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FEC93406_1px,transparent_1px),linear-gradient(to_bottom,#FEC93406_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-12 lg:mb-16">
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-gold-500/20 mb-6">
              <Ruler className="w-4 h-4 text-gold-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-500 font-semibold">
                Catálogo de Ingeniería
              </span>
              <Ruler className="w-4 h-4 text-gold-500" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Módulos <span className="text-gold-500">Multipropósitos</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-jet-300 mt-4 font-sans text-base max-w-2xl mx-auto font-light leading-relaxed">
              Tres líneas de módulos prefabricados, cada una optimizada para diferentes requisitos de espacio y sector.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <div key={model.id}>
              <ScrollReveal delay={0.1 * (index + 1)}>
              <div className="h-full bg-jet-950 border border-jet-800 hover:border-gold-500/30 transition-all duration-300 rounded overflow-hidden flex flex-col">
                {/* Blueprint */}
                <div className="relative h-56 border-b border-jet-800 bg-jet-950/50 p-4">
                  <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-gold-500/30" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-gold-500/30" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-gold-500/30" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-gold-500/30" />
                  <ModelBlueprint id={model.id} />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="inline-flex items-center border border-gold-500/20 px-2.5 py-1 mb-3 w-fit">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gold-500">
                      MODELO {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-1 tracking-tight">
                    {model.name}
                  </h3>
                  <p className="text-[11px] font-mono text-jet-300 uppercase tracking-wider mb-3">
                    {model.tagline}
                  </p>
                  <p className="text-sm text-jet-300 font-light leading-relaxed mb-5 flex-1">
                    {model.description}
                  </p>

                  {/* Specs */}
                  <div className="border border-jet-800/60 bg-jet-950/60 p-3 mb-4">
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-jet-800/40">
                      <Ruler className="w-3.5 h-3.5 text-gold-500" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500">
                        Especificaciones
                      </span>
                    </div>
                    <div className="space-y-1">
                      {model.specs.map((spec) => (
                        <div key={spec.label} className="flex items-center justify-between text-xs py-1 border-b border-jet-900/60 last:border-b-0">
                          <span className="font-mono text-jet-300 uppercase tracking-wider text-[10px]">{spec.label}</span>
                          <span className="font-mono text-white font-medium text-[11px]">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Applications */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {model.applications.map((app) => (
                      <span key={app} className="text-[9px] font-mono uppercase tracking-wider text-gold-500/70 border border-gold-500/10 px-2 py-0.5">
                        {app}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex gap-3 mt-auto">
                    <Link
                      to="/contacto"
                      className="flex-1 px-4 py-2.5 bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-[10px] rounded flex items-center justify-center gap-1.5 transition-colors text-center"
                    >
                      Cotizar
                    </Link>
                    <button className="px-4 py-2.5 border border-jet-700 hover:border-gold-500/50 text-jet-300 hover:text-white font-mono text-[10px] uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors">
                      <Download className="w-3 h-3" />
                      Ficha
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Ver todos */}
        <div className="mt-12 text-center">
          <Link
            to="/modelos"
            className="inline-flex items-center gap-2 text-sm text-gold-500 hover:text-gold-400 font-medium transition-colors"
          >
            Ver catálogo completo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
