import { useState, useEffect, useCallback } from "react";
import { Ruler, ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
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
    { label: "Aislamiento", value: m.insulation },
  ],
  applications: m.applications,
  description: m.description,
}));

const modelImages: Record<string, string> = {
  multispace: "/images/models/multispace/catalogo/principal.webp",
  "doble-ala": "/images/models/doble-ala/catalogo/principal.webp",
  "modulo-plegable-z": "/images/models/modulo-plegable-z/catalogo/principal.webp",
};

interface ModelsProps {
  variant?: "dark" | "gray";
  footerLink?: boolean;
  headingLevel?: 1 | 2;
}

const AUTOPLAY_INTERVAL = 5000; // 5 segundos por modelo

export default function Models({
  variant = "dark",
  footerLink = true,
  headingLevel = 2,
}: ModelsProps) {
  const { isLight } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const isGray = variant === "gray";
  const isPage = headingLevel === 1;
  const TitleTag = isPage ? "h1" : "h2";
  const sectionBg = isGray ? "bg-jet-900" : "bg-jet-950";
  const padY = isPage ? "pt-32 pb-24" : "py-24";

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? models.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === models.length - 1 ? 0 : prev + 1));
  }, []);

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section
      id={isPage ? undefined : "models"}
      className={`section-texture ${padY} ${sectionBg} text-white relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:600px]`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FEC93406_1px,transparent_1px),linear-gradient(to_bottom,#FEC93406_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-12 lg:mb-16">
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-gold-500/20 mb-6">
              <Ruler className="w-4 h-4 text-gold-500" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-500 font-semibold">
                Catálogo de Soluciones
              </span>
              <Ruler className="w-4 h-4 text-gold-500" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <TitleTag className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Módulos <span className="text-gold-500">Multipropósitos</span>
            </TitleTag>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <p className="text-jet-300 mt-4 font-sans text-base max-w-2xl mx-auto font-light leading-relaxed">
              Tres líneas de módulos prefabricados, cada una optimizada para diferentes requisitos de espacio y sector.
            </p>
          </ScrollReveal>
        </div>

        {/* Carousel Container con pausa al hover/touch */}
        <ScrollReveal delay={0.3}>
          <div
            className="max-w-6xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 lg:items-center">
              {/* Left Side - Image Showcase & Navigation */}
              <div className="lg:w-3/5">
                <div className="relative bg-jet-950 border border-jet-800 rounded overflow-hidden">
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-gold-500/30 z-20 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-gold-500/30 z-20 pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-gold-500/30 z-20 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-gold-500/30 z-20 pointer-events-none" />

                  {/* Autoplay Progress Bar */}
                  <div className="absolute top-0 inset-x-0 h-0.5 bg-jet-900 z-30 overflow-hidden">
                    <div
                      key={currentIndex}
                      onAnimationEnd={goToNext}
                      className="h-full bg-gold-500/80 animate-progress will-change-transform"
                      style={{
                        animationDuration: `${AUTOPLAY_INTERVAL}ms`,
                        animationTimingFunction: "linear",
                        animationIterationCount: 1,
                        animationPlayState: isPaused ? "paused" : "running",
                      }}
                    />
                  </div>

                  {/* Image Stack pre-rendered for zero-lag hardware-accelerated crossfade */}
                  <div className="h-80 sm:h-96 relative overflow-hidden bg-jet-950">
                    {models.map((m, idx) => {
                      const isActive = idx === currentIndex;
                      const src = modelImages[m.id];
                      return (
                        <div
                          key={m.id}
                          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                          }`}
                        >
                          <img
                            src={src}
                            alt={`Módulo Plegable ${m.name} — Beyritech`}
                            className={`w-full h-full object-cover transition-transform duration-1000 ease-out will-change-transform ${
                              isActive ? "scale-100" : "scale-105"
                            }`}
                            loading="eager"
                            decoding="async"
                          />
                          {/* Gold grid overlay */}
                          <div className="absolute inset-0 gold-grid-overlay opacity-20 pointer-events-none" />
                          <div className="absolute inset-0 bg-gradient-to-t from-jet-950/85 via-transparent to-jet-950/30 pointer-events-none" />
                        </div>
                      );
                    })}
                  </div>

                  {/* Navigation below blueprint */}
                  <div className="border-t border-jet-800 px-6 py-4 flex items-center justify-between">
                    <button
                      onClick={goToPrevious}
                      className="flex items-center gap-2 text-jet-400 hover:text-gold-500 transition-colors group cursor-pointer select-none"
                      aria-label="Modelo anterior"
                    >
                      <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                      <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">Anterior</span>
                    </button>

                    {/* Position indicators */}
                    <div className="flex items-center gap-2.5">
                      {models.map((_, index) => {
                        const isActive = index === currentIndex;
                        return (
                          <button
                            key={index}
                            onClick={() => goToIndex(index)}
                            aria-label={`Ver ${models[index].name}`}
                            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                              isActive
                                ? "bg-gold-500 w-8 shadow-[0_0_10px_rgba(254,201,52,0.4)]"
                                : "bg-jet-700 hover:bg-jet-500 w-2.5"
                            }`}
                          />
                        );
                      })}
                    </div>

                    <button
                      onClick={goToNext}
                      className="flex items-center gap-2 text-jet-400 hover:text-gold-500 transition-colors group cursor-pointer select-none"
                      aria-label="Siguiente modelo"
                    >
                      <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline">Siguiente</span>
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content - Right Side with Stacked Crossfade (Zero stutter) */}
              <div className="lg:w-2/5 grid [grid-template-areas:'stack'] items-center">
                {models.map((model, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <div
                      key={model.id}
                      className={`[grid-area:stack] flex flex-col justify-center transition-all duration-500 ease-out ${
                        isActive
                          ? "opacity-100 translate-y-0 pointer-events-auto z-10"
                          : "opacity-0 translate-y-2 pointer-events-none z-0"
                      }`}
                    >
                      <div className="inline-flex items-center border border-gold-500/20 px-2.5 py-1 mb-4 w-fit bg-gold-500/5">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-gold-500">
                          MODELO {String(index + 1).padStart(2, "0")} · {model.id.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                        {model.name}
                      </h3>
                      <p className="text-xs font-mono text-gold-500 uppercase tracking-wider mb-4">
                        {model.tagline}
                      </p>
                      <p className="text-sm text-jet-300 font-light leading-relaxed mb-6">
                        {model.description}
                      </p>

                      {/* Specs */}
                      <div className="border border-jet-800/80 bg-jet-950/80 p-4 mb-5 rounded">
                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-jet-800/60">
                          <Ruler className="w-4 h-4 text-gold-500" />
                          <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500 font-semibold">
                            Especificaciones técnicas
                          </span>
                        </div>
                        <div className="space-y-2">
                          {model.specs.map((spec) => (
                            <div
                              key={spec.label}
                              className="flex items-center justify-between text-xs py-1.5 border-b border-jet-900/80 last:border-b-0"
                            >
                              <span className="font-mono text-jet-300 uppercase tracking-wider text-[10px]">
                                {spec.label}
                              </span>
                              <span className="font-mono text-white font-medium text-[11px]">
                                {spec.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Applications */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {model.applications.map((app) => (
                          <span
                            key={app}
                            className="text-[9px] font-mono uppercase tracking-wider text-gold-500/80 border border-gold-500/15 px-2.5 py-1 rounded-xs bg-gold-500/5"
                          >
                            {app}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex gap-3">
                        <Link
                          to={`/contacto?modelo=${model.id}`}
                          className="flex-1 px-5 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-[10px] font-mono rounded flex items-center justify-center gap-1.5 transition-colors text-center shadow-[0_0_15px_rgba(254,201,52,0.15)]"
                        >
                          Cotizar este modelo
                        </Link>
                        <Link
                          to={`/modelos/${model.id}`}
                          className="px-5 py-3 border border-jet-700 hover:border-gold-500/50 text-jet-300 hover:text-white font-mono text-[10px] uppercase tracking-wider rounded flex items-center gap-1.5 transition-colors"
                        >
                          <ArrowRight className="w-3 h-3" />
                          Ver ficha
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Ver todos */}
        {footerLink && (
          <div className="mt-12 text-center">
            <Link
              to="/modelos"
              className="inline-flex items-center gap-2 text-sm text-gold-500 hover:text-gold-400 font-medium transition-colors font-mono uppercase tracking-wider text-xs"
            >
              Ver catálogo completo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
