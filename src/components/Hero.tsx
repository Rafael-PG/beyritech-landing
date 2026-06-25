import React, { useRef, useEffect } from "react";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Zap from "lucide-react/dist/esm/icons/zap";
import Award from "lucide-react/dist/esm/icons/award";
import Flame from "lucide-react/dist/esm/icons/flame";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      const cr = contentRef.current;
      const sr = statsRef.current;
      if (cr) {
        cr.style.transform = `translateY(${Math.min(0, -sy * 0.16)}px)`;
        cr.style.opacity = `${Math.max(0.3, 1 - sy / 400 * 0.7)}`;
      }
      if (sr) {
        const t = Math.max(0, Math.min(1, (sy - 100) / 400));
        sr.style.transform = `translateY(${120 * (1 - t)}px)`;
        sr.style.opacity = `${t}`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollToEstimator = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector("#estimator");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleScrollToModels = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.querySelector("#models");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-jet-950">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/video/poster.webp"
          className="w-full h-full object-cover will-change-transform"
        >
          <source src="/video/background.webm" type="video/webm" />
          <source src="/video/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-jet-950 via-jet-950/80 to-jet-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-jet-950 via-transparent to-jet-950/60" />
        <div className="absolute inset-0 animate-fade-in bg-[linear-gradient(to_right,#333d4715_1px,transparent_1px),linear-gradient(to_bottom,#333d4715_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 top-0 h-[2px] z-20 pointer-events-none animate-scan-line"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #FEC934 50%, transparent 100%)",
          boxShadow: "0 0 20px rgba(254,201,52,0.6), 0 0 60px rgba(254,201,52,0.2)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full flex flex-col justify-between min-h-screen">
        <div />

        {/* Core Message Card */}
        <div
          ref={contentRef}
          className="max-w-3xl mt-12 will-change-transform"
        >
          <div>
            <div className="animate-fade-up stagger-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-gold-300 font-semibold">
                  Sistemas de Ingeniería Volumétrica
                </span>
              </div>
            </div>

            <div className="animate-fade-up stagger-2">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Módulos Multipropósito de <span className="text-gold-500 relative inline-block">
                  Alto Rendimiento
                  <span className="absolute left-0 bottom-1 w-full h-[3px] bg-gold-500/30" />
                </span>
              </h1>
            </div>

            <div className="animate-fade-up stagger-3">
              <p className="font-sans text-base sm:text-lg lg:text-xl text-jet-200 font-light leading-relaxed mb-10 max-w-2xl">
                Despliegue infraestructuras modulares de calidad superior para minería, corporaciones y sanidad. Reduzca los tiempos un 60% sin comprometer la resistencia estructural ni el aislamiento térmico.
              </p>
            </div>

            <div className="animate-fade-up stagger-4">
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button
                  id="hero-primary-cta"
                  onClick={handleScrollToEstimator}
                  className="px-8 py-4 rounded bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-xl shadow-gold-500/20 hover:scale-[1.03] active:scale-[0.98]"
                >
                  Solicitar Módulo
                </button>
                <button
                  id="hero-secondary-cta"
                  onClick={handleScrollToModels}
                  className="px-8 py-4 rounded border border-jet-200/20 hover:border-gold-500 hover:bg-gold-500/5 text-white font-medium uppercase tracking-wider text-sm transition-all duration-300 backdrop-blur-sm hover:scale-[1.03] active:scale-[0.98]"
                >
                  Ver Modelos
                </button>
              </div>
            </div>
          </div>

          {/* Core Trust Badges */}
          <div className="pt-6 border-t border-jet-800/60 animate-fade-up stagger-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: ShieldCheck, label: "ISO 9001 / C5-M" },
                { icon: Zap, label: "Rápido Montaje" },
                { icon: Award, label: "Soporte Minero" },
                { icon: Flame, label: "Ignífugo Certificado" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5"
                >
                  <item.icon className="w-5 h-5 text-gold-500 shrink-0" />
                  <span className="text-xs font-mono text-jet-200">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 pb-4 border-t border-jet-800/80 mt-12 bg-jet-950/40 backdrop-blur-sm p-6 rounded-lg"
        >
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-jet-300">Área Desplegada</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 font-mono">
              +120,000 <span className="text-gold-500 text-lg">m²</span>
            </h2>
            <p className="text-xs text-jet-300 mt-1">Minería y corporaciones</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-jet-300">Velocidad Operativa</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 font-mono text-gold-500">
              -60% <span className="text-white text-lg">Tiempo</span>
            </h2>
            <p className="text-xs text-jet-300 mt-1">Fabricación en paralelo</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-jet-300">Vida Útil</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 font-mono">
              +50 <span className="text-gold-500 text-lg">Años</span>
            </h2>
            <p className="text-xs text-jet-300 mt-1">Acero galvanizado pesado</p>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-jet-300">Aislamiento PIR</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-1 font-mono">
              R-32 <span className="text-gold-500 text-lg">Mínimo</span>
            </h2>
            <p className="text-xs text-jet-300 mt-1">Apto clima de alta montaña</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 hover:opacity-100 transition-opacity animate-fade-in stagger-15">
          <span className="text-[10px] font-mono uppercase tracking-widest text-jet-300">
            Descubrir Más
          </span>
          <ChevronDown className="w-4 h-4 text-gold-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
