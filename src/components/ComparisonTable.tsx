import { useEffect, useRef, useState } from "react";
import { Clock, DollarSign, Droplets, RotateCcw, VolumeX, Settings, ArrowRight, Check } from "lucide-react";
import { useInView } from "motion/react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import ScrollReveal from "../hooks/ScrollReveal";

const metrics = [
  {
    icon: Clock,
    label: "Tiempo de implementación",
    mod: { pct: 90, result: "operativo en días" },
    trad: { pct: 12, result: "espera de 6–12 meses" },
  },
  {
    icon: DollarSign,
    label: "Control presupuestario",
    mod: { pct: 88, result: "precio cerrado, sin sorpresas" },
    trad: { pct: 15, result: "sobrecostos frecuentes" },
  },
  {
    icon: Droplets,
    label: "Impacto ambiental en sitio",
    mod: { pct: 84, result: "casi cero residuos" },
    trad: { pct: 30, result: "obra húmeda y desechos" },
  },
  {
    icon: RotateCcw,
    label: "Vida útil del activo",
    mod: { pct: 100, result: "activo 100% reubicable" },
    trad: { pct: 8, result: "inversión que se demuele" },
  },
  {
    icon: VolumeX,
    label: "Experiencia en sitio",
    mod: { pct: 92, result: "cero interrupción" },
    trad: { pct: 34, result: "ruido, polvo y maquinaria" },
  },
  {
    icon: Settings,
    label: "Personalización del espacio",
    mod: { pct: 95, result: "configurable según necesidad" },
    trad: { pct: 22, result: "estructura rígida" },
  },
];

export default function ComparisonTable() {
  const scoreRef = useRef<HTMLDivElement>(null);
  const inView = useInView(scoreRef, { once: true, margin: "-80px" });
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setScore(Math.round(p * 6));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const bar = (pct: number) => ({
    initial: { width: "0%" },
    whileInView: { width: `${pct}%` },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const },
  });

  return (
    <section className="section-texture py-24 bg-jet-900 relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:900px]">
      {/* Grid texture background */}
      <div className="absolute inset-0 gold-grid-overlay" />

      <div className="max-w-4xl mx-auto px-6 relative">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500 font-semibold">
              Comparativa
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 tracking-tight text-white leading-tight">
              ¿Por qué <span className="text-gold-500">Modular</span> vs.{" "}
              <span className="text-jet-500 line-through decoration-2">Tradicional</span>?
            </h2>
            <p className="text-jet-400 mt-5 font-sans text-base font-light leading-relaxed max-w-xl mx-auto">
              Seis criterios clave, misma escala: la barra mide el cumplimiento, más larga = mejor.
            </p>
          </div>
        </ScrollReveal>

        {/* Score */}
        <ScrollReveal delay={0.05}>
          <div ref={scoreRef} className="mb-14">
            <div className="flex items-center justify-center gap-6 sm:gap-14">
              <div className="text-center">
                <span className="block font-mono text-5xl sm:text-6xl font-bold text-jet-600 line-through decoration-2 decoration-jet-700">
                  00
                </span>
                <span className="block text-[9px] font-mono uppercase tracking-widest text-jet-600 mt-1.5">
                  Tradicional
                </span>
              </div>
              <span className="font-mono text-xl sm:text-2xl font-bold text-gold-500/60">vs</span>
              <div className="text-center">
                <span className="block font-mono text-5xl sm:text-6xl font-bold text-gold-500">
                  {String(score).padStart(2, "0")}
                </span>
                <span className="block text-[9px] font-mono uppercase tracking-widest text-gold-500 mt-1.5">
                  Modular
                </span>
              </div>
            </div>
            <p className="text-center text-xs text-jet-500 font-light mt-5">
              Criterios ganados por cada opción.
            </p>
          </div>
        </ScrollReveal>

        {/* Criteria rows */}
        <div>
          {metrics.map((m, i) => (
            <div key={i}>
              <ScrollReveal delay={0.05 * i}>
                <div className="py-6 border-b border-dashed border-gold-500/10 last:border-0">
                  {/* Row header */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <m.icon className="w-4 h-4 text-gold-500 shrink-0" strokeWidth={1.5} />
                      <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight">
                        {m.label}
                      </h3>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-gold-500 flex items-center gap-1 shrink-0">
                      <Check className="w-3 h-3" strokeWidth={3} />
                      Modular
                    </span>
                  </div>

                  {/* Modular */}
                  <div className="flex items-center gap-3">
                    <span className="w-14 shrink-0 text-[9px] font-mono uppercase tracking-wider text-gold-500">
                      Modular
                    </span>
                    <div className="relative flex-1 h-2.5 bg-jet-950/90 rounded-full overflow-hidden">
                      <motion.div className="absolute inset-y-0 left-0 bg-gold-500 rounded-full" {...bar(m.mod.pct)} />
                    </div>
                    <span className="w-28 sm:w-44 shrink-0 text-right text-xs font-light text-jet-300 leading-snug">
                      <span className="font-mono text-gold-500">{m.mod.pct}%</span> · {m.mod.result}
                    </span>
                  </div>

                  {/* Tradicional */}
                  <div className="flex items-center gap-3 mt-2.5">
                    <span className="w-14 shrink-0 text-[9px] font-mono uppercase tracking-wider text-jet-500">
                      Tradicional
                    </span>
                    <div className="relative flex-1 h-2.5 bg-jet-950/90 rounded-full overflow-hidden">
                      <motion.div className="absolute inset-y-0 left-0 bg-[#e46d63] rounded-full" {...bar(m.trad.pct)} />
                    </div>
                    <span className="w-28 sm:w-44 shrink-0 text-right text-xs font-light text-jet-500 leading-snug">
                      <span className="font-mono text-jet-600">{m.trad.pct}%</span> · {m.trad.result}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Verdict */}
        <ScrollReveal delay={0.2}>
          <div className="mt-14 text-center">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              6 de 6 criterios: <span className="text-gold-500">Modular gana</span>
            </h3>
            <p className="text-jet-400 font-sans text-base font-light leading-relaxed max-w-2xl mx-auto">
              En velocidad, costo, impacto, flexibilidad, experiencia y vida útil, la construcción modular de Beyritech supera a la obra tradicional.
            </p>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-black text-xs font-mono font-bold tracking-wider uppercase transition-colors duration-200"
            >
              Solicitar Cotización
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}