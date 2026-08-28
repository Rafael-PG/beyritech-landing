import { useState, useEffect } from "react";
import { Ruler, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "../hooks/ScrollReveal";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { catalog } from "../data/modelos";

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

const models: ModelInfo[] = catalog.map((m) => ({
  id: m.slug,
  name: m.name,
  tagline: m.tagline,
  specs: [
    { label: "Dimensiones", value: m.dimensionsOpen },
    { label: "Área útil", value: m.area },
    { label: "Capacidad", value: m.capacity },
    { label: "Aislamiento PIR", value: m.insulation },
  ],
  applications: m.applications,
  description: m.description,
}));

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentModel = models[currentIndex];

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? models.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 150);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === models.length - 1 ? 0 : prev + 1));
      setIsAnimating(false);
    }, 150);
  };

  const goToIndex = (index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsAnimating(false);
    }, 150);
  };

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

        {/* Carousel */}
        <ScrollReveal delay={0.3}>
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Blueprint - Left Side */}
              <div className="lg:w-3/5">
                <div className="relative bg-jet-950 border border-jet-800 rounded overflow-hidden">
                  <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-gold-500/30 z-10" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-gold-500/30 z-10" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-gold-500/30 z-10" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-gold-500/30 z-10" />
                  
                  <div className="h-80 sm:h-96 p-6 bg-jet-950/50 flex items-center justify-center transition-opacity duration-150 ease-in-out" style={{ opacity: isAnimating ? 0 : 1 }}>
                    <ModelBlueprint id={currentModel.id} />
                  </div>

                  {/* Navigation below blueprint */}
                  <div className="border-t border-jet-800 px-6 py-4 flex items-center justify-between">
                    <button
                      onClick={goToPrevious}
                      className="flex items-center gap-2 text-jet-400 hover:text-gold-500 transition-colors group"
                    >
                      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                      <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">Anterior</span>
                    </button>

                    {/* Position indicators */}
                    <div className="flex items-center gap-3">
                      {models.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex
                              ? "bg-gold-500 w-8"
                              : "bg-jet-600 hover:bg-jet-500"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={goToNext}
                      className="flex items-center gap-2 text-jet-400 hover:text-gold-500 transition-colors group"
                    >
                      <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">Siguiente</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content - Right Side */}
              <div className="lg:w-2/5 flex flex-col justify-center transition-opacity duration-150 ease-in-out" style={{ opacity: isAnimating ? 0 : 1 }}>
                <div className="inline-flex items-center border border-gold-500/20 px-2.5 py-1 mb-4 w-fit">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gold-500">
                    MODELO {String(currentIndex + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                  {currentModel.name}
                </h3>
                <p className="text-xs font-mono text-gold-500 uppercase tracking-wider mb-4">
                  {currentModel.tagline}
                </p>
                <p className="text-sm text-jet-300 font-light leading-relaxed mb-6">
                  {currentModel.description}
                </p>

                {/* Specs */}
                <div className="border border-jet-800/60 bg-jet-950/60 p-4 mb-5">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-jet-800/40">
                    <Ruler className="w-4 h-4 text-gold-500" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500">
                      Especificaciones
                    </span>
                  </div>
                  <div className="space-y-2">
                    {currentModel.specs.map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between text-xs py-1.5 border-b border-jet-900/60 last:border-b-0">
                        <span className="font-mono text-jet-300 uppercase tracking-wider text-[10px]">{spec.label}</span>
                        <span className="font-mono text-white font-medium text-[11px]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentModel.applications.map((app) => (
                    <span key={app} className="text-[9px] font-mono uppercase tracking-wider text-gold-500/70 border border-gold-500/10 px-2.5 py-1">
                      {app}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <Link
                    to={`/contacto?modelo=${currentModel.id}`}
                    className="flex-1 px-5 py-3 bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-[10px] rounded flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    Cotizar
                  </Link>
                  <Link
                    to={`/modelos/${currentModel.id}`}
                    className="px-5 py-3 border border-jet-700 hover:border-gold-500/50 text-jet-300 hover:text-white font-mono text-[10px] uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowRight className="w-3 h-3" />
                    Ficha
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

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
