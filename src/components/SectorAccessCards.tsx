import { useState } from "react";
import { Wheat, Warehouse, HardHat, Building2, GraduationCap, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "../hooks/ScrollReveal";

const sectors = [
  {
    icon: Wheat,
    title: "Agroindustria",
    description: "Casinos, dormitorios y oficinas para fundos y plantas procesadoras, diseñados para la operación continua del campo.",
    stats: ["Dormitorios para 120+ trabajadores", "Diseñado para clima extremo", "Plazo récord: 48 horas"],
    models: ["Multispace", "Mini Doble Ala"],
    link: "/soluciones/agroindustria",
    tag: "Sector prioritario",
  },
  {
    icon: Warehouse,
    title: "Logística y Almacenes",
    description: "Bodegas, oficinas operativas y plataformas de distribución que crecen junto a su cadena de suministro.",
    stats: ["Ampliación progresiva sin paradas", "Carga de piso 1,000 kg/m²", "Conexión modular sin obras"],
    models: ["Multispace", "Doble Ala"],
    link: "/soluciones/logistica-almacenes",
    tag: "Más consultado",
  },
  {
    icon: HardHat,
    title: "Obra y Construcción",
    description: "Campamentos, cuadros de comando y centros de acopio temporal para desplegar en cualquier punto de obra.",
    stats: ["Desplegado en 48 horas", "Reubicación completa", "Ensamblaje sin grúa"],
    models: ["Multispace", "Mini Doble Ala"],
    link: "/soluciones/obra-construccion",
    tag: "Rápida implementación",
  },
  {
    icon: Building2,
    title: "Corporativo",
    description: "Oficinas ejecutivas, salas de capacitación y espacios temporales con acabados de primer nivel.",
    stats: ["Acabados premium", "Aislamiento acústico certificado", "Cableado estructurado"],
    models: ["Doble Ala", "Mini Doble Ala"],
    link: "/soluciones/corporativo",
    tag: "Acabados ejecutivos",
  },
  {
    icon: GraduationCap,
    title: "Educación",
    description: "Aulas, laboratorios y bibliotecas modulares que mantienen la calidad educativa en entornos temporales.",
    stats: ["UV-C para desinfección", "Confort para aprendizaje", "Superficies sanitarias lavables"],
    models: ["Mini Doble Ala", "Multispace"],
    link: "/soluciones/educacion",
    tag: "Aulas temporales",
  },
];

export default function SectorAccessCards() {
  const [active, setActive] = useState(0);
  const sector = sectors[active];

  const goTo = (i: number) => {
    setActive((i + sectors.length) % sectors.length);
  };

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Grid texture background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FEC93406_1px,transparent_1px),linear-gradient(to_bottom,#FEC93406_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500 font-semibold">
              Sectores
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 tracking-tight text-white leading-tight">
              Soluciones por{" "}
              <span className="relative inline-block">
                industria
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold-500/40" />
              </span>
            </h2>
            <p className="text-jet-400 mt-5 font-sans text-base font-light leading-relaxed max-w-xl mx-auto">
              Seleccione su sector y explore la configuración ideal para sus operaciones.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left rail - sector selector */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="right">
              <div className="lg:sticky lg:top-24">
                {/* Rail header */}
                <div className="flex items-center justify-between pb-4 mb-2 border-b border-gold-500/10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-jet-500">
                    Índice de soluciones
                  </span>
                  <span className="text-[10px] font-mono text-gold-500/70">
                    {String(active + 1).padStart(2, "0")} / {String(sectors.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Sector list */}
                <div>
                  {sectors.map((s, i) => {
                    const isActive = i === active;
                    return (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        aria-current={isActive ? "true" : undefined}
                        className={`group w-full flex items-center gap-4 px-4 py-4 lg:py-5 text-left border-l-2 transition-all duration-300 ${
                          isActive
                            ? "border-gold-500 bg-gold-500/5"
                            : "border-transparent hover:border-gold-500/30 hover:bg-white/[0.02]"
                        }`}
                      >
                        <span
                          className={`font-mono text-xs transition-colors duration-300 ${
                            isActive ? "text-gold-500" : "text-jet-600 group-hover:text-gold-500/50"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`w-9 h-9 border flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isActive
                              ? "border-gold-500/50 bg-gold-500/10"
                              : "border-gold-500/15 group-hover:border-gold-500/30"
                          }`}
                        >
                          <s.icon className={`w-4 h-4 transition-colors duration-300 ${isActive ? "text-gold-500" : "text-jet-500 group-hover:text-gold-500/60"}`} strokeWidth={1.5} />
                        </span>
                        <span className="flex-1 min-w-0">
                          <span
                            className={`block font-display text-base lg:text-lg font-bold transition-colors duration-300 ${
                              isActive ? "text-gold-500" : "text-white group-hover:text-gold-500/80"
                            }`}
                          >
                            {s.title}
                          </span>
                          <span className="block text-[10px] font-mono uppercase tracking-wider text-jet-500 truncate">
                            {s.tag}
                          </span>
                        </span>
                        <ArrowRight
                          className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                            isActive ? "text-gold-500 translate-x-0" : "text-jet-600 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Prev / Next controls */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gold-500/10">
                  <button
                    onClick={() => goTo(active - 1)}
                    aria-label="Sector anterior"
                    className="w-10 h-10 border border-gold-500/20 hover:border-gold-500/50 hover:bg-gold-500/10 flex items-center justify-center transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 text-gold-500" />
                  </button>
                  <button
                    onClick={() => goTo(active + 1)}
                    aria-label="Sector siguiente"
                    className="w-10 h-10 border border-gold-500/20 hover:border-gold-500/50 hover:bg-gold-500/10 flex items-center justify-center transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 text-gold-500" />
                  </button>
                  <span className="text-[10px] font-mono text-jet-500 ml-1">
                    Navegue con <span className="text-gold-500/70">‹‹ ››</span> o los botones
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right panel - detail view */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" delay={0.1}>
              <div className="relative border border-gold-500/20 bg-jet-900/40 min-h-[480px] flex flex-col">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold-500/50" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold-500/50" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold-500/50" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold-500/50" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                    className="p-8 lg:p-10 flex flex-col flex-1"
                  >
                    {/* Tag + icon row */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-500 border border-gold-500/25 px-3 py-1">
                        {sector.tag}
                      </span>
                      <div className="w-14 h-14 border border-gold-500/30 bg-gold-500/5 flex items-center justify-center">
                        <sector.icon className="w-7 h-7 text-gold-500" strokeWidth={1.3} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
                      {sector.title}
                    </h3>

                    {/* Description */}
                    <p className="text-jet-400 font-sans text-base font-light leading-relaxed mb-8">
                      {sector.description}
                    </p>

                    {/* Stats */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {sector.stats.map((stat, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm text-jet-300">
                          <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                          <span className="font-light">{stat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer: models + CTA */}
                    <div className="pt-6 border-t border-gold-500/15 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {sector.models.map((m, j) => (
                          <span key={j} className="text-[9px] font-mono uppercase tracking-wider text-gold-500/60 border border-gold-500/15 px-2.5 py-1">
                            {m}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={sector.link}
                        className="inline-flex items-center gap-2 text-gold-500 hover:text-gold-600 font-medium transition-colors group/link"
                      >
                        <span className="text-xs uppercase tracking-wider font-mono">Explorar solución</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}