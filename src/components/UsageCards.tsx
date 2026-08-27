import { Home, Briefcase, GraduationCap, Expand, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "../hooks/ScrollReveal";

const usages = [
  {
    icon: Home,
    title: "Alojamiento de Personal",
    description: "Dormitorios, campamentos y viviendas temporales con confort térmico garantizado para operaciones en campo.",
    bullets: ["Aislamiento PIR R-24", "Instalación en 48h", "Capacidad 8–12 personas"],
    model: "Multispace",
    link: "/modelos/multispace",
  },
  {
    icon: Briefcase,
    title: "Espacios de Trabajo",
    description: "Oficinas, centros de operaciones y salas de reunión con acabados profesionales y alta productividad.",
    bullets: ["Doble amplitud 144 m²", "Acabados corporativos", "Climatización integrada"],
    model: "Doble Ala",
    link: "/modelos/doble-ala",
  },
  {
    icon: GraduationCap,
    title: "Aulas y Atención",
    description: "Clínicas, aulas, laboratorios y espacios sanitarios con aislamiento acústico y térmico certificado.",
    bullets: ["Aislamiento acústico", "Superficies sanitarias", "UV-C disponible"],
    model: "Mini Doble Ala",
    link: "/modelos/mini-doble-ala",
  },
  {
    icon: Expand,
    title: "Ampliación Progresiva",
    description: "Expanda su infraestructura sin detener operaciones. Módulos que se suman al espacio existente.",
    bullets: ["Expansión sin parada", "Mismo acabado", "Reubicable"],
    link: "/modelos",
  },
];

export default function UsageCards() {
  return (
    <section className="py-24 bg-white dark:bg-jet-950 relative [content-visibility:auto] [contain-intrinsic-size:400px]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500 font-semibold">
              ¿Qué necesita?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 tracking-tight text-jet-900 dark:text-white leading-tight">
              Un módulo para cada{" "}
              <span className="relative inline-block">
                necesidad
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold-500/40" />
              </span>
            </h2>
            <p className="text-jet-500 dark:text-jet-400 mt-5 font-sans text-base font-light leading-relaxed max-w-xl mx-auto">
              Transforme su problemática en una solución tangible: espacios modulares que se adaptan a su operación, no al revés.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {usages.map((usage, i) => (
            <div key={i}>
              <ScrollReveal delay={i * 120}>
                <Link to={usage.link} className="group block h-full">
                  <div className="h-full bg-jet-50 dark:bg-jet-900/50 border border-jet-200 dark:border-jet-800/50 rounded-2xl p-7 transition-all duration-500 hover:shadow-xl hover:shadow-gold-500/5 hover:-translate-y-1 hover:border-gold-500/20">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-500 to-gold-600 flex items-center justify-center text-jet-950 mb-6 group-hover:scale-110 transition-transform duration-500">
                      <usage.icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-lg font-bold text-jet-900 dark:text-white mb-2 group-hover:text-gold-500 transition-colors duration-300">
                      {usage.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] text-jet-500 dark:text-jet-400 font-light leading-relaxed mb-4">
                      {usage.description}
                    </p>

                    {/* Bullet points */}
                    <ul className="space-y-1.5 mb-5">
                      {usage.bullets.map((bullet, j) => (
                        <li key={j} className="flex items-center gap-2 text-[11px] text-jet-600 dark:text-jet-300">
                          <CheckCircle2 className="w-3 h-3 text-gold-500 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Model badge + arrow */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-jet-200 dark:border-jet-800/50">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-gold-500/70">
                        Modelo {usage.model || "Catálogo"}
                      </span>
                      <div className="flex items-center gap-1 text-gold-500 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                        <span>Ver</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
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
