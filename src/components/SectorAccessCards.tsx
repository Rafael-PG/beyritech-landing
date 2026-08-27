import { Wheat, Warehouse, HardHat, Building2, GraduationCap, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "../hooks/ScrollReveal";

const sectors = [
  {
    icon: Wheat,
    title: "Agroindustria",
    description: "Casinos, dormitorios y oficinas para fundos y plantas procesadoras.",
    stats: ["Dormitorios para 120+ trabajadores", "Diseñado para clima extremo"],
    models: ["Multispace", "Mini Doble Ala"],
    link: "/soluciones/agroindustria",
    gradient: "from-emerald-900 via-emerald-800 to-teal-900",
    accent: "#10b981",
    tag: "Sector prioritario",
  },
  {
    icon: Warehouse,
    title: "Logística y Almacenes",
    description: "Bodegas, oficinas operativas y plataformas de distribución.",
    stats: ["Ampliación progresiva sin paradas", "Carga de piso 1,000 kg/m²"],
    models: ["Multispace", "Doble Ala"],
    link: "/soluciones/logistica-almacenes",
    gradient: "from-blue-900 via-blue-800 to-indigo-900",
    accent: "#3b82f6",
    tag: "Más consultado",
  },
  {
    icon: HardHat,
    title: "Obra y Construcción",
    description: "Campamentos, cuadros de comando y centros de acopio temporal.",
    stats: ["Desplegado en 48 horas", "Reubicación completa"],
    models: ["Multispace", "Mini Doble Ala"],
    link: "/soluciones/obra-construccion",
    gradient: "from-orange-900 via-orange-800 to-amber-900",
    accent: "#f59e0b",
    tag: "Rápida implementación",
  },
  {
    icon: Building2,
    title: "Corporativo",
    description: "Oficinas ejecutivas, salas de capacitación y espacios temporales.",
    stats: ["Acabados premium", "Aislamiento acústico certificado"],
    models: ["Doble Ala", "Mini Doble Ala"],
    link: "/soluciones/corporativo",
    gradient: "from-purple-900 via-purple-800 to-violet-900",
    accent: "#8b5cf6",
    tag: "Acabados ejecutivos",
  },
  {
    icon: GraduationCap,
    title: "Educación",
    description: "Aulas, laboratorios y bibliotecas modulares de alta calidad.",
    stats: ["UV-C para desinfección", "Confort para aprendizaje"],
    models: ["Mini Doble Ala", "Multispace"],
    link: "/soluciones/educacion",
    gradient: "from-cyan-900 via-cyan-800 to-sky-900",
    accent: "#06b6d4",
    tag: "Aulas temporales",
  },
];

export default function SectorAccessCards() {
  return (
    <section className="py-24 bg-jet-50 dark:bg-jet-900 relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:400px]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)", backgroundSize: "32px 32px"}} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500 font-semibold">
              Sectores
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 tracking-tight text-jet-900 dark:text-white">
              Soluciones por{" "}
              <span className="relative inline-block">
                industria
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold-500/40" />
              </span>
            </h2>
            <p className="text-jet-500 dark:text-jet-400 mt-5 font-sans text-base font-light leading-relaxed">
              Configuraciones específicas para los desafíos de cada sector.
            </p>
          </div>
        </ScrollReveal>

        {/* Magazine grid: 2 large + 3 small */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[220px]">
          {/* Large cards: first 2 */}
          {sectors.slice(0, 2).map((sector, i) => (
            <div key={i} className="md:col-span-2">
              <ScrollReveal delay={i * 100}>
                <Link to={sector.link} className="group relative block h-full rounded-2xl overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${sector.gradient} transition-transform duration-700 group-hover:scale-105`} />
                  <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"}} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-8 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <sector.icon className="w-8 h-8 opacity-80" strokeWidth={1.5} />
                      <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/50">{sector.tag}</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold mb-2 group-hover:text-white/90 transition-colors">{sector.title}</h3>
                    <p className="text-sm text-white/60 font-light leading-relaxed max-w-md mb-4">{sector.description}</p>
                    {/* Stats bullets */}
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-4">
                      {sector.stats.map((stat, j) => (
                        <span key={j} className="flex items-center gap-1.5 text-[11px] text-white/50">
                          <CheckCircle2 className="w-3 h-3 shrink-0" style={{color: sector.accent}} />
                          {stat}
                        </span>
                      ))}
                    </div>
                    {/* Models */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {sector.models.map((m, j) => (
                        <span key={j} className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 border border-white/10 text-white/40">
                          {m}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" style={{color: sector.accent}}>
                      <span>Explorar</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          ))}

          {/* Small cards: last 3 */}
          {sectors.slice(2).map((sector, i) => (
            <div key={i + 2}>
              <ScrollReveal delay={(i + 2) * 100}>
                <Link to={sector.link} className="group relative block h-full rounded-2xl overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${sector.gradient} transition-transform duration-700 group-hover:scale-105`} />
                  <div className="absolute inset-0 opacity-20" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"}} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-6 text-white">
                    <sector.icon className="w-7 h-7 opacity-70 mb-3" strokeWidth={1.5} />
                    <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-white/40 mb-1">{sector.tag}</span>
                    <h3 className="font-display text-lg font-bold mb-1">{sector.title}</h3>
                    <p className="text-xs text-white/50 font-light leading-relaxed mb-3">{sector.description}</p>
                    {/* Stats */}
                    <div className="space-y-1 mb-3">
                      {sector.stats.map((stat, j) => (
                        <span key={j} className="flex items-center gap-1.5 text-[10px] text-white/40">
                          <CheckCircle2 className="w-2.5 h-2.5 shrink-0" style={{color: sector.accent}} />
                          {stat}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {sector.models.map((m, j) => (
                        <span key={j} className="text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 border border-white/10 text-white/30">
                          {m}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-all duration-300" style={{color: sector.accent}}>
                      <span>Ver más</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
