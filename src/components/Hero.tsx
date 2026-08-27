import { useRef, useEffect, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import Factory from "lucide-react/dist/esm/icons/factory";
import Zap from "lucide-react/dist/esm/icons/zap";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Clock from "lucide-react/dist/esm/icons/clock";

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

  const scrollToSection = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      const offset = 80;
      const rect = el.getBoundingClientRect().top;
      window.scrollTo({ top: rect - offset, behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-jet-950">
      {/* Hero Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/video/poster.webp"
          className="w-full h-full object-cover"
        >
          <source src="/video/background.webm" type="video/webm" />
          <source src="/video/background.mp4" type="video/mp4" />
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

        {/* Core Message */}
        <div ref={contentRef} className="max-w-3xl mt-12 will-change-transform">
          <div>
            <div className="animate-fade-up stagger-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-gold-300 font-semibold">
                  Módulos prefabricados de fabricación nacional
                </span>
              </div>
            </div>

            <div className="animate-fade-up stagger-2">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                Espacios habilitados en{" "}
                <span className="text-gold-500 relative inline-block">
                  semanas, no en meses
                  <span className="absolute left-0 bottom-1 w-full h-[3px] bg-gold-500/30" />
                </span>
              </h1>
            </div>

            <div className="animate-fade-up stagger-3">
              <p className="font-sans text-base sm:text-lg lg:text-xl text-jet-200 font-light leading-relaxed mb-10 max-w-2xl">
                Módulos prefabricados de fabricación nacional para agroindustria,
                logística, obra y corporaciones. Reduzca tiempos de ejecución,
                elimine imprevistos de presupuesto y obtenga un espacio operativo
                en semanas.
              </p>
            </div>

            <div className="animate-fade-up stagger-4">
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/contacto"
                  className="px-8 py-4 rounded bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-xl shadow-gold-500/20 hover:scale-[1.03] active:scale-[0.98] text-center"
                >
                  Solicitar cotización
                </Link>
                <button
                  onClick={scrollToSection("#models")}
                  className="px-8 py-4 rounded border border-jet-200/20 hover:border-gold-500 hover:bg-gold-500/5 text-white font-medium uppercase tracking-wider text-sm transition-all duration-300 backdrop-blur-sm hover:scale-[1.03] active:scale-[0.98]"
                >
                  Ver modelos
                </button>
              </div>
            </div>
          </div>

          {/* Trust Bar — datos verificables */}
          <div className="pt-6 border-t border-jet-800/60 animate-fade-up stagger-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Factory, label: "Fabricación nacional" },
                { icon: Zap, label: "Montaje en semanas" },
                { icon: ShieldCheck, label: "Garantía incluida" },
                { icon: Clock, label: "Entrega garantizada" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2.5">
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-12 pb-4 mt-12"
        >
          {[
            { label: "Proyectos ejecutados", value: "Agroindustria y logística", icon: "01" },
            { label: "Reducción de tiempo", value: "Hasta -60% vs. obra tradicional", icon: "02" },
            { label: "Recuperable", value: "Hasta 98% del módulo", icon: "03" },
            { label: "Aislamiento térmico", value: "Alto rendimiento PIR", icon: "04" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative bg-jet-900/40 backdrop-blur-sm border border-jet-800/50 rounded-lg p-4 hover:border-gold-500/30 transition-all duration-500"
            >
              <div className="flex items-start gap-3">
                <span className="text-[9px] font-mono text-gold-500/60 mt-0.5 shrink-0">{stat.icon}</span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-white leading-snug">{stat.label}</p>
                  <p className="text-[10px] text-jet-400 mt-1 font-light leading-relaxed">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
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
