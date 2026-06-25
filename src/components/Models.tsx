import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Ruler, MoveHorizontal, Download } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import ScrollReveal from "../hooks/ScrollReveal";
import { useTheme } from "../context/ThemeContext";

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
      { label: "Peso estructural", value: "2.5 ton" },
      { label: "Aislamiento PIR", value: "80mm – R-24" },
    ],
    applications: ["Minería", "Construcción", "Educación", "Corporativo"],
    description:
      "Sistema modular plegable de rápida implementación. Ideal para campamentos mineros, aulas temporales y oficinas de faena. Su diseño multispace permite configuraciones flexibles sin comprometer la resistencia estructural.",
  },
  {
    id: "z-fold",
    name: "Módulo Plegable Z",
    tagline: "Compacto, apilable, optimizado para logística extrema",
    specs: [
      { label: "Dimensiones", value: "4.5m × 9m × 2.8m" },
      { label: "Área útil", value: "40.5 m²" },
      { label: "Capacidad", value: "4–6 personas" },
      { label: "Peso estructural", value: "1.8 ton" },
      { label: "Aislamiento PIR", value: "100mm – R-32" },
    ],
    applications: ["Minería", "Industrial", "Salud", "Emergencia"],
    description:
      "Diseño plegable en Z que maximiza la densidad de transporte. Hasta 12 unidades por camión. Certificado para condiciones extremas de alta montaña y climas desérticos.",
  },
  {
    id: "doble-ala",
    name: "Módulo Plegable Doble Ala",
    tagline: "Doble amplitud para espacios corporativos y sanitarios",
    specs: [
      { label: "Dimensiones", value: "8m × 18m × 3.2m" },
      { label: "Área útil", value: "144 m²" },
      { label: "Capacidad", value: "16–24 personas" },
      { label: "Peso estructural", value: "4.2 ton" },
      { label: "Aislamiento PIR", value: "80mm – R-24" },
    ],
    applications: ["Salud", "Corporativo", "Educación", "Industrial"],
    description:
      "Estructura de doble ala plegable que ofrece el doble de espacio útil sin duplicar el peso. Perfecto para clínicas modulares, salas de reuniones ejecutivas y laboratorios de campaña.",
  },
];

function BlueprintGrid({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
      <defs>
        <pattern id="bp-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#FEC934" strokeWidth="0.5" opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-grid)" />
    </svg>
  );
}

function DimensionLine({ x1, y1, x2, y2, label, color = "#FEC934", opacity = 0.5 }: {
  x1: number; y1: number; x2: number; y2: number; label?: string;
  color?: string; opacity?: number;
}) {
  const midX = (x1 + x2) / 2;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" opacity={opacity} />
      <line x1={x1} y1={y1 - 4} x2={x1} y2={y1 + 4} stroke={color} strokeWidth="1" opacity={opacity} />
      <line x1={x2} y1={y2 - 4} x2={x2} y2={y2 + 4} stroke={color} strokeWidth="1" opacity={opacity} />
      <text x={midX} y={y1 + 16} textAnchor="middle" fill={color} fontSize="10" fontFamily="monospace" opacity={opacity}>
        {label}
      </text>
    </g>
  );
}

function MultispaceBlueprint() {
  return (
    <svg viewBox="0 0 600 380" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <rect width="600" height="380" fill="transparent" />
      <BlueprintGrid />

      <g opacity={0.6}>
        <text x="300" y="22" textAnchor="middle" fill="#FEC934" fontSize="9" fontFamily="monospace" letterSpacing="3">
          VISTA LATERAL — CONFIGURACIÓN PLEGADA
        </text>
      </g>

      <g opacity={0.6}>
        {[80, 210, 340].map((x, i) => (
          <g key={i}>
            <rect x={x} y="50" width="110" height="200" rx="2" fill="none" stroke="#FEC934" strokeWidth="1.2" />
            <line x1={x} y1="50" x2={x + 110} y2="250" stroke="#FEC934" strokeWidth="0.4" opacity={0.3} />
            <line x1={x + 110} y1="50" x2={x} y2="250" stroke="#FEC934" strokeWidth="0.4" opacity={0.3} />
            <line x1={x + 27.5} y1="50" x2={x + 27.5} y2="250" stroke="#FEC934" strokeWidth="0.3" opacity={0.15} />
            <line x1={x + 55} y1="50" x2={x + 55} y2="250" stroke="#FEC934" strokeWidth="0.3" opacity={0.15} />
            <line x1={x + 82.5} y1="50" x2={x + 82.5} y2="250" stroke="#FEC934" strokeWidth="0.3" opacity={0.15} />
          </g>
        ))}
      </g>

      {[190, 320].map((cx, i) => (
        <g key={`hinge-${i}`}>
          <circle cx={cx} cy="150" r="5" fill="var(--color-jet-950)" stroke="#FEC934" strokeWidth="1.5" opacity={0.7} />
          <circle cx={cx} cy="150" r="2" fill="#FEC934" opacity={0.7} />
        </g>
      ))}

      <DimensionLine x1={80} y1={270} x2={450} y2={270} label="6.0 m (plegado)" />

      <g opacity={0.35}>
        <text x="300" y="295" textAnchor="middle" fill="#FEC934" fontSize="9" fontFamily="monospace" letterSpacing="3">
          VISTA DESPLEGADA
        </text>
      </g>

      <rect x="80" y="305" width="440" height="45" rx="2" fill="none" stroke="#FEC934" strokeWidth="1.2" strokeDasharray="6,4" opacity={0.5} />
      <line x1="80" y1="327.5" x2="520" y2="327.5" stroke="#FEC934" strokeWidth="0.4" strokeDasharray="3,3" opacity={0.2} />
      <line x1="80" y1="305" x2="520" y2="350" stroke="#FEC934" strokeWidth="0.3" opacity={0.15} />
      <line x1="520" y1="305" x2="80" y2="350" stroke="#FEC934" strokeWidth="0.3" opacity={0.15} />

      <DimensionLine x1={80} y1={366} x2={520} y2={366} label="12.0 m (desplegado)" />
    </svg>
  );
}

function ZFoldBlueprint() {
  return (
    <svg viewBox="0 0 600 380" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <rect width="600" height="380" fill="transparent" />
      <BlueprintGrid />

      <g opacity={0.6}>
        <text x="300" y="22" textAnchor="middle" fill="#FEC934" fontSize="9" fontFamily="monospace" letterSpacing="3">
          VISTA LATERAL — SISTEMA DE PLEGADO Z
        </text>
      </g>

      <g opacity={0.6}>
        <rect x="100" y="60" width="120" height="200" rx="2" fill="none" stroke="#FEC934" strokeWidth="1.2" />
        <line x1="100" y1="60" x2="220" y2="260" stroke="#FEC934" strokeWidth="0.4" opacity={0.3} />
        <line x1="220" y1="60" x2="100" y2="260" stroke="#FEC934" strokeWidth="0.4" opacity={0.3} />

        <rect x="310" y="120" width="120" height="200" rx="2" fill="none" stroke="#FEC934" strokeWidth="1.2" />
        <line x1="310" y1="120" x2="430" y2="320" stroke="#FEC934" strokeWidth="0.4" opacity={0.3} />
        <line x1="430" y1="120" x2="310" y2="320" stroke="#FEC934" strokeWidth="0.4" opacity={0.3} />
      </g>

      <line x1="220" y1="150" x2="310" y2="170" stroke="#FEC934" strokeWidth="1" opacity={0.5} />

      <path d="M 220 130 L 235 140 L 230 145" fill="none" stroke="#FEC934" strokeWidth="1.5" opacity={0.6} />
      <path d="M 310 150 L 295 160 L 300 165" fill="none" stroke="#FEC934" strokeWidth="1.5" opacity={0.6} />

          <circle cx="220" cy="150" r="4" fill="var(--color-jet-950)" stroke="#FEC934" strokeWidth="1.2" opacity={0.7} />
          <circle cx="310" cy="170" r="4" fill="var(--color-jet-950)" stroke="#FEC934" strokeWidth="1.2" opacity={0.7} />

      <DimensionLine x1={100} y1={50} x2={100} y2={260} label="2.8 m" color="#FEC934" />

      <g opacity={0.35}>
        <text x="300" y="295" textAnchor="middle" fill="#FEC934" fontSize="9" fontFamily="monospace" letterSpacing="3">
          CONFIGURACIÓN APILABLE — TRANSPORTE
        </text>
      </g>

      {[0, 1, 2].map((i) => (
        <rect key={i} x={230 + i * 12} y={305 + i * 12} width="100" height="36" rx="1" fill="none" stroke="#FEC934" strokeWidth="0.8" opacity={0.5 - i * 0.12} />
      ))}

      <rect x="254" y="305" width="100" height="36" rx="1" fill="none" stroke="#FEC934" strokeWidth="1.2" opacity={0.7} />

      <text x="304" y="326" textAnchor="middle" fill="#FEC934" fontSize="8" fontFamily="monospace" opacity={0.5}>
        x12 / CAMIÓN
      </text>
    </svg>
  );
}

function DobleAlaBlueprint() {
  return (
    <svg viewBox="0 0 600 380" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <rect width="600" height="380" fill="transparent" />
      <BlueprintGrid />

      <g opacity={0.6}>
        <text x="300" y="22" textAnchor="middle" fill="#FEC934" fontSize="9" fontFamily="monospace" letterSpacing="3">
          VISTA SUPERIOR — EXPANSIÓN SIMÉTRICA
        </text>
      </g>

      <line x1="300" y1="60" x2="300" y2="300" stroke="#FEC934" strokeWidth="0.8" strokeDasharray="6,4" opacity={0.3} />

      <circle cx="300" cy="180" r="18" fill="none" stroke="#FEC934" strokeWidth="1.2" opacity={0.6} />
      <circle cx="300" cy="180" r="6" fill="#FEC934" fillOpacity={0.3} stroke="#FEC934" strokeWidth="0.8" opacity={0.6} />

      <g opacity={0.7}>
        <rect x="60" y="105" width="220" height="150" rx="3" fill="none" stroke="#FEC934" strokeWidth="1.2" />
        <line x1="60" y1="105" x2="280" y2="255" stroke="#FEC934" strokeWidth="0.4" opacity={0.25} />
        <line x1="280" y1="105" x2="60" y2="255" stroke="#FEC934" strokeWidth="0.4" opacity={0.25} />
        <line x1="170" y1="105" x2="170" y2="255" stroke="#FEC934" strokeWidth="0.3" opacity={0.15} />

        <rect x="320" y="105" width="220" height="150" rx="3" fill="none" stroke="#FEC934" strokeWidth="1.2" />
        <line x1="320" y1="105" x2="540" y2="255" stroke="#FEC934" strokeWidth="0.4" opacity={0.25} />
        <line x1="540" y1="105" x2="320" y2="255" stroke="#FEC934" strokeWidth="0.4" opacity={0.25} />
        <line x1="430" y1="105" x2="430" y2="255" stroke="#FEC934" strokeWidth="0.3" opacity={0.15} />
      </g>

      <path d="M 60 180 L 40 180 M 40 175 L 30 180 L 40 185" fill="none" stroke="#FEC934" strokeWidth="1.5" opacity={0.5} />
      <path d="M 540 180 L 560 180 M 560 175 L 570 180 L 560 185" fill="none" stroke="#FEC934" strokeWidth="1.5" opacity={0.5} />

      <DimensionLine x1={60} y1={270} x2={540} y2={270} label="18.0 m (total expandido)" />

      <text x="170" y="185" textAnchor="middle" fill="#FEC934" fontSize="11" fontFamily="monospace" opacity={0.5}>ALA I</text>
      <text x="430" y="185" textAnchor="middle" fill="#FEC934" fontSize="11" fontFamily="monospace" opacity={0.5}>ALA II</text>

      <g opacity={0.3}>
        <text x="300" y="310" textAnchor="middle" fill="#FEC934" fontSize="9" fontFamily="monospace" letterSpacing="2">
          EJE DE SIMETRÍA ESTRUCTURAL
        </text>
      </g>

      <rect x="140" y="320" width="320" height="36" rx="2" fill="none" stroke="#FEC934" strokeWidth="0.8" opacity={0.4} />
      <line x1="140" y1="338" x2="460" y2="338" stroke="#FEC934" strokeWidth="0.3" strokeDasharray="2,4" opacity={0.2} />
      <text x="300" y="343" textAnchor="middle" fill="#FEC934" fontSize="8" fontFamily="monospace" opacity={0.35}>
        NÚCLEO CENTRAL DE CONEXIÓN
      </text>
    </svg>
  );
}

function ModelBlueprint({ id }: { id: string }) {
  switch (id) {
    case "multispace":
      return <MultispaceBlueprint />;
    case "z-fold":
      return <ZFoldBlueprint />;
    case "doble-ala":
      return <DobleAlaBlueprint />;
    default:
      return null;
  }
}

export default function Models() {
  const { isLight } = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "keepSnaps",
    dragFree: false,
    loop: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  return (
    <section id="models" className="py-24 bg-jet-950 text-white relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:600px]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FEC93406_1px,transparent_1px),linear-gradient(to_bottom,#FEC93406_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />

      <div className="absolute top-0 left-0 w-20 h-20 border-l-[1.5px] border-t-[1.5px] border-gold-500/15 hidden sm:block" />
      <div className="absolute top-0 right-0 w-20 h-20 border-r-[1.5px] border-t-[1.5px] border-gold-500/15 hidden sm:block" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-[1.5px] border-b-[1.5px] border-gold-500/15 hidden sm:block" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-[1.5px] border-b-[1.5px] border-gold-500/15 hidden sm:block" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
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
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-500/40" />
              <img
                src={isLight ? "/logo/beyritech-logo-light.png" : "/logo/beyritech-logo.png"}
                alt="Beyritech"
                width="40" height="32"
                className="h-8 w-auto opacity-60 grayscale"
              />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-500/40" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Módulos <span className="text-gold-500">Multipropósitos</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex items-center justify-center gap-3 mt-3">
              <div className="h-[2px] w-8 bg-gold-500/60" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-jet-400">
                Sistema Constructivo Volumétrico
              </span>
              <div className="h-[2px] w-8 bg-gold-500/60" />
            </div>
          </ScrollReveal>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing select-none">
            <div className="flex">
              {models.map((model, index) => (
                <div key={model.id} className="min-w-0 flex-[0_0_100%] lg:px-2">
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* SVG Blueprint */}
                    <div className="relative lg:w-[55%] h-[320px] sm:h-[420px] lg:h-[480px] border border-jet-800/60 bg-jet-950/50 overflow-hidden shrink-0">
                      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-gold-500/30" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-gold-500/30" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-gold-500/30" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-gold-500/30" />
                      <div className="p-4 sm:p-6 w-full h-full flex items-center justify-center">
                        <ModelBlueprint id={model.id} />
                      </div>
                    </div>

                    {/* Spec card */}
                    <div className="lg:w-[45%] flex flex-col justify-center">
                      <div className="border border-jet-800 group-hover:border-gold-500/30 transition-colors duration-500 relative bg-jet-950 backdrop-blur-sm" style={{ background: `var(--gradient-${model.id})` }}>
                        <div className="m-[3px] border border-jet-800/40 p-5 sm:p-6 relative">
                          <div className="absolute inset-0 bg-[radial-gradient(circle,#ffffff04_0.5px,transparent_0.5px)] bg-[size:20px_20px]" />

                          <div className="relative z-10">
                            <div className="inline-flex items-center border border-gold-500/20 px-2.5 py-1 mb-3">
                              <span className="text-[9px] font-mono uppercase tracking-widest text-gold-500">
                                MODELO {String(index + 1).padStart(2, "0")}
                              </span>
                            </div>
                            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1 tracking-tight leading-tight">
                              {model.name}
                            </h3>
                            <p className="text-[11px] font-mono text-jet-400 uppercase tracking-wider mb-3">
                              {model.tagline}
                            </p>
                            <p className="text-sm text-jet-300 font-light leading-relaxed mb-5">
                              {model.description}
                            </p>

                            <div className="border border-jet-800/60 bg-jet-950/60 p-3 sm:p-4 mb-4">
                              <div className="flex items-center gap-2 mb-2 pb-2 border-b border-jet-800/40">
                                <Ruler className="w-3.5 h-3.5 text-gold-500" />
                                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500">
                                  Especificaciones Técnicas
                                </span>
                              </div>
                              <div className="space-y-1">
                                {model.specs.map((spec) => (
                                  <div key={spec.label} className="flex items-center justify-between text-xs py-1.5 border-b border-jet-900/60 last:border-b-0">
                                    <span className="font-mono text-jet-400 uppercase tracking-wider text-[10px]">
                                      {spec.label}
                                    </span>
                                    <span className="font-mono text-white font-medium text-[11px]">
                                      {spec.value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {model.applications.map((app) => (
                                <span key={app} className="text-[9px] font-mono uppercase tracking-wider text-gold-500/70 border border-gold-500/10 px-2 py-0.5">
                                  {app}
                                </span>
                              ))}
                            </div>

                            <button className="mt-5 text-[10px] font-mono uppercase tracking-wider text-jet-400 hover:text-white transition-colors flex items-center gap-1.5">
                              <Download className="w-3 h-3" />
                              Descargar ficha técnica
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8 lg:mt-10">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 flex items-center justify-center rounded border border-jet-700 hover:border-gold-500/50 text-jet-300 hover:text-gold-500 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={selectedIndex === 0}
              aria-label="Modelo anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === selectedIndex
                      ? "bg-gold-500 w-6"
                      : "bg-jet-700 hover:bg-jet-400"
                  }`}
                  aria-label={`Ir al modelo ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className="w-10 h-10 flex items-center justify-center rounded border border-jet-700 hover:border-gold-500/50 text-jet-300 hover:text-gold-500 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              disabled={selectedIndex === scrollSnaps.length - 1}
              aria-label="Siguiente modelo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="hidden sm:flex items-center gap-2 ml-4 text-[10px] font-mono text-jet-500 border-l border-jet-800 pl-4">
              <MoveHorizontal className="w-3 h-3" />
              <span>Arrastra o usa las flechas</span>
            </div>
          </div>
        </div>

        {/* Blueprint footer */}
        <div className="mt-12 flex items-center justify-center gap-4 text-[9px] font-mono uppercase tracking-[0.2em] text-jet-600">
          <div className="h-[1px] w-16 bg-jet-800" />
          <span>Plano N° BEYR-ARCH-MOD-2026</span>
          <div className="h-[1px] w-16 bg-jet-800" />
        </div>
      </div>
    </section>
  );
}
