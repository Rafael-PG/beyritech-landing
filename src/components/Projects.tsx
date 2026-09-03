import { MapPin, CheckCircle2, ArrowRight, Wheat, Warehouse, Calendar, Ruler, Box } from "lucide-react";
import type { ElementType } from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "../hooks/ScrollReveal";

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  area: string;
  modules: string;
  timeline: string;
  features: string[];
  description: string;
  icon: ElementType;
  gradient: string;
}

const projectsList: Project[] = [
  {
    id: "proj-1",
    title: "Complejo Dormitorios Agroindustriales",
    category: "Agroindustria",
    location: "Ica, Perú",
    area: "3,200 m²",
    modules: "14 módulos Multispace",
    timeline: "6 semanas",
    features: ["Dormitorios para 84 operarios", "Aislamiento lana de roca ignífuga"],
    description:
      "Dormitorios modulares para personal de campo encargado de la construcción de edificaciones. El complejo incluye 14 módulos de los cuales 9 son el modelo multispace y 5 modelo Z. Configurados como dormitorios, tienen la capacidad de albergar a 6 colaboradores por unidad.",
    icon: Wheat,
    gradient: "from-jet-800 via-jet-900 to-jet-950",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-texture py-24 bg-jet-900 text-white relative [content-visibility:auto] [contain-intrinsic-size:600px]">
      {/* Grid texture background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FEC93406_1px,transparent_1px),linear-gradient(to_bottom,#FEC93406_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-mono upphercase tracking-[0.3em] text-gold-500 font-semibold">
              Casos de Éxito
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 tracking-tight text-white leading-tight">
              Proyectos{" "}
              <span className="relative inline-block">
                reales
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold-500/40" />
              </span>
            </h2>
            <p className="text-jet-400 mt-5 font-sans text-base font-light leading-relaxed max-w-xl mx-auto">
              Ejemplos de configuraciones modulares ejecutadas para clientes en Perú.
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal case studies */}
        <div className="space-y-12">
          {projectsList.map((project, i) => (
            <div key={project.id}>
              <ScrollReveal delay={i * 0.15}>
                <div className="group">
                  <div className="flex flex-col lg:flex-row gap-0 rounded-lg overflow-hidden border border-gold-500/10 hover:border-gold-500/25 transition-colors duration-300">
                    {/* Visual side */}
                    <div className={`lg:w-2/5 relative bg-gradient-to-br ${project.gradient} min-h-[280px] lg:min-h-[360px]`}>
                      {/* Pattern overlay */}
                      <div className="absolute inset-0 opacity-10 grid-overlay" />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      {/* Content */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                            <project.icon className="w-7 h-7 text-white/80" strokeWidth={1.5} />
                          </div>
                          <span className="px-3 py-1 bg-black/30 backdrop-blur-sm text-[10px] font-mono uppercase tracking-wider text-white/70">
                            {project.category}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-2">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-sm text-white/60">
                            <MapPin className="w-4 h-4" />
                            <span>{project.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content side */}
                    <div className="lg:w-3/5 bg-jet-950 p-8 lg:p-10 flex flex-col">
                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-jet-800/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gold-500/10 flex items-center justify-center">
                            <Ruler className="w-5 h-5 text-gold-500" />
                          </div>
                          <div>
                            <p className="text-[9px] font-mono uppercase tracking-wider text-jet-500">Área</p>
                            <p className="text-sm font-bold text-white">{project.area}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gold-500/10 flex items-center justify-center">
                            <Box className="w-5 h-5 text-gold-500" />
                          </div>
                          <div>
                            <p className="text-[9px] font-mono uppercase tracking-wider text-jet-500">Módulos</p>
                            <p className="text-sm font-bold text-white">{project.modules}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gold-500/10 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-gold-500" />
                          </div>
                          <div>
                            <p className="text-[9px] font-mono uppercase tracking-wider text-jet-500">Plazo</p>
                            <p className="text-sm font-bold text-gold-500">{project.timeline}</p>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-jet-300 font-light leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 flex-1">
                        {project.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-sm text-jet-300">
                            <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                            <span className="font-light">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link
                        to="/casos-de-exito"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gold-500 hover:text-gold-400 transition-colors group/link"
                      >
                        <span>Ver caso completo</span>
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Ver todos */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              to="/casos-de-exito"
              className="inline-flex items-center gap-2 px-6 py-3 border border-gold-500/20 hover:border-gold-500/40 text-white font-medium uppercase tracking-wider text-xs transition-all hover:bg-gold-500/5"
            >
              Ver todos los casos de éxito <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
