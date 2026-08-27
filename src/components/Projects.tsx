import React from "react";
import { MapPin, Expand, CheckCircle2, ArrowRight, Wheat, Warehouse } from "lucide-react";
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
  icon: React.ElementType;
  gradient: string;
}

const projectsList: Project[] = [
  {
    id: "proj-1",
    title: "Complejo Dormitorios Agroindustriales",
    category: "Agroindustria",
    location: "Ica, Perú",
    area: "3,200 m²",
    modules: "18 módulos Multispace",
    timeline: "6 semanas",
    features: ["Dormitorios para 144 operarios", "Comedor y casino integrado", "Posta de salud", "Aislamiento PIR 80mm"],
    description:
      "Dormitorios modulares para personal de campo de una agroexportadora de uva en el valle de Ica. El complejo incluye 18 módulos Multispace configurados como dormitorios dúplex, comedor industrial para 120 personas, posta de salud y servicios sanitarios. Entregado en tiempo récord para la campaña de exportación.",
    icon: Wheat,
    gradient: "from-emerald-900 via-emerald-800 to-teal-900",
  },
  {
    id: "proj-2",
    title: "Módulo Operativo en Almacén Logístico",
    category: "Logística",
    location: "Lima, Perú",
    area: "180 m²",
    modules: "1 módulo Doble Ala",
    timeline: "3 semanas",
    features: ["Oficina dentro de nave operativa", "Sala de control y despacho", "Sin obra húmeda", "Montaje en 48 horas"],
    description:
      "Módulo Doble Ala instalado dentro de una nave logística en operación continua en el Callao. El módulo opera como oficina de control de despachos y sala de seguimiento GPS de flota. La clave: cero interrupción de la operación logística durante el montaje. Plug & Play en 48 horas.",
    icon: Warehouse,
    gradient: "from-blue-900 via-blue-800 to-indigo-900",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-jet-950 text-white relative [content-visibility:auto] [contain-intrinsic-size:600px]">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500 font-semibold">
              Casos de Éxito
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 tracking-tight">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsList.map((project, i) => (
            <div key={project.id}>
            <ScrollReveal delay={i * 150}>
              <div className="group h-full flex flex-col">
                {/* Visual header */}
                <div className={`relative h-56 rounded-t-2xl bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 opacity-10" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"}} />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Icon */}
                  <div className="absolute top-6 left-6 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <project.icon className="w-6 h-6 text-white/80" strokeWidth={1.5} />
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-6 right-6 px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-[10px] font-mono uppercase tracking-wider text-white/70">
                    {project.category}
                  </div>
                  {/* Bottom info bar */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1">{project.title}</h3>
                      <div className="flex items-center gap-1.5 text-xs text-white/60">
                        <MapPin className="w-3 h-3" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-jet-900 border border-jet-800 border-t-0 rounded-b-2xl p-6 flex flex-col flex-1">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3 mb-5 pb-5 border-b border-jet-800/60">
                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-wider text-jet-500 mb-1">Área</p>
                      <p className="text-sm font-bold text-white">{project.area}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-wider text-jet-500 mb-1">Módulos</p>
                      <p className="text-sm font-bold text-white">{project.modules}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-wider text-jet-500 mb-1">Plazo</p>
                      <p className="text-sm font-bold text-gold-500">{project.timeline}</p>
                    </div>
                  </div>

                  <p className="text-sm text-jet-300 font-light leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-jet-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/casos-de-exito"
                    className="inline-flex items-center gap-2 text-xs font-medium text-gold-500 hover:text-gold-400 transition-colors group/link"
                  >
                    <span>Ver caso completo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            </div>
          ))}
        </div>

        <ScrollReveal>
          <div className="mt-12 text-center">
            <Link
              to="/casos-de-exito"
              className="inline-flex items-center gap-2 px-6 py-3 border border-jet-700 hover:border-gold-500 text-white font-medium uppercase tracking-wider text-xs rounded-xl transition-all hover:bg-gold-500/5"
            >
              Ver todos los casos de éxito <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
