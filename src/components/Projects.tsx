import React, { useState } from "react";
import { Project } from "../types";
import { MapPin, Expand, Layers, CheckCircle2, X, Download } from "lucide-react";

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projectsList: Project[] = [
    {
      id: "proj-1",
      title: "Campamento Minero 'Cordillera Alta'",
      category: "Mining",
      location: "Los Andes, Altitud 4,200 m.s.n.m.",
      area: "12,500 m²",
      features: ["Aislamiento Térmico PIR 100mm", "Certificación Sísmica Estructural Clase A", "Habitaciones Térmicas, Comedores y Clínica integrada"],
      image: "linear-gradient(135deg, #11151a 0%, #1c232b 100%)",
      description: "Diseño y despliegue llave en mano de un campamento para 1,500 operadores mineros en condiciones de frío extremo. Los módulos soportan presiones de nieve de 250 kg/m² y fueron instalados en tan solo 28 días de montaje final."
    },
    {
      id: "proj-2",
      title: "Oficinas Corporativas 'Vanguardia'",
      category: "Corporate",
      location: "San Isidro, Sector Financiero",
      area: "3,800 m²",
      features: ["Fachada Vidriada de Doble Acristalamiento", "Revestimientos en Madera Termotratada", "Climatización Inteligente VRF"],
      image: "linear-gradient(135deg, #1c232b 0%, #7c512d 100%)",
      description: "Edificio corporativo modular de 3 niveles con acabados premium inspirados en arquitectura sostenible (como el modelo de madera y metal del video). Diseñado con amplios vanos de luz natural para maximizar el confort y la productividad."
    },
    {
      id: "proj-3",
      title: "Centro de Atención Médica 'Sanitario Norte'",
      category: "Healthcare",
      location: "Antofagasta, Sector Desértico",
      area: "1,500 m²",
      features: ["Revestimiento Interior Antibacteriano", "Sistemas de Presión Aire Negativa", "Rápido Acoplamiento Eléctrico ISO"],
      image: "linear-gradient(135deg, #11151a 0%, #333d47 100%)",
      description: "Complejo hospitalario modular con salas de operaciones, áreas de aislamiento y consultorios. Cumple al 100% con los estándares regulatorios de salud pública, completándose un 70% más rápido que la edificación húmeda tradicional."
    },
    {
      id: "proj-4",
      title: "Módulos Educativos 'Sustentables'",
      category: "Education",
      location: "Copiapó, Zona Rural",
      area: "2,200 m²",
      features: ["Techos Preparados para Paneles Solares", "Ventilación Cruzada Pasiva", "Aislamiento Acústico de 45dB"],
      image: "linear-gradient(135deg, #7c512d 0%, #11151a 100%)",
      description: "Aulas modulares prefabricadas de alta eficiencia térmica y acústica para escuelas técnicas. Diseñadas para operar en climas áridos con nulo consumo de aire acondicionado gracias al sombreador modular integrado."
    },
    {
      id: "proj-5",
      title: "Infraestructura de Depósito e Industrial",
      category: "Industrial",
      location: "Pudahuel, Centro Logístico",
      area: "8,500 m²",
      features: ["Pórticos de Acero de Luz Libre", "Paneles Acústicos Integrados", "Instalación Eléctrica Trifásica Embutida"],
      description: "Instalación industrial y bodegas de almacenamiento modular acoplables con grúas de alto tonelaje. Diseñado para un cliente de logística pesada, permitiendo futuras ampliaciones modulares con el mínimo impacto operativo.",
      image: "linear-gradient(135deg, #333d47 0%, #1c232b 100%)"
    }
  ];

  const filteredProjects = filter === "All"
    ? projectsList
    : projectsList.filter(p => p.category === filter);

  const categories = ["All", "Mining", "Corporate", "Healthcare", "Education", "Industrial"];

  return (
    <section id="projects" className="py-24 bg-jet-950 text-white relative [content-visibility:auto] [contain-intrinsic-size:600px]">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
              Casos de Éxito Corporativo
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
              Proyectos Destacados
            </h2>
            <div className="w-16 h-[2px] bg-gold-500 mt-6" />
          </div>
          <p className="text-jet-300 font-sans text-base max-w-xl font-light leading-relaxed">
            Nuestros despliegues de ingeniería modular están operativos en las regiones con los climas más desafiantes, proporcionando confort, seguridad y durabilidad garantizada bajo norma internacional.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded transition-all duration-200 border ${
                filter === cat
                  ? "bg-gold-500 border-gold-500 text-jet-950 font-bold"
                  : "bg-jet-900 border-jet-800 text-jet-300 hover:border-gold-500/40 hover:text-white"
              }`}
            >
              {cat === "All" ? "Todos" : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-jet-900 border border-jet-800 hover:border-gold-500/40 rounded overflow-hidden cursor-pointer shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Visual architectural gradient simulator */}
                <div 
                  className="h-52 relative flex items-center justify-center p-6 text-center"
                  style={{ background: project.image }}
                >
                  <div className="absolute inset-0 bg-jet-950/20 group-hover:bg-jet-950/10 transition-colors" />
                  
                  {/* Subtle Grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

                  {/* Blueprint details */}
                  <div className="relative z-10 border border-white/10 bg-jet-950/80 backdrop-blur-sm p-4 rounded max-w-xs">
                    <span className="text-[10px] font-mono text-gold-500 uppercase tracking-wider block mb-1">
                      {project.category} SPECIFICATION
                    </span>
                    <h3 className="font-display text-sm font-bold text-white line-clamp-1">{project.title}</h3>
                    <span className="text-[9px] font-mono text-jet-300 mt-2 block border-t border-jet-800 pt-1">
                      CAD: ARCH-SYS-2026
                    </span>
                  </div>
                </div>

                {/* Info Container */}
                <div className="p-6">
                  {/* Location & Area */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-jet-300 mb-4 pb-4 border-b border-jet-800/60">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gold-500" />
                      <span className="line-clamp-1">{project.location.split(",")[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Expand className="w-3.5 h-3.5 text-gold-500" />
                      <span>{project.area}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white group-hover:text-gold-500 transition-colors duration-200 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-jet-300 font-light line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Specifications snippet at bottom */}
              <div className="px-6 pb-6 pt-2">
                <div className="flex flex-col gap-1.5 border-t border-jet-800/60 pt-4">
                  {project.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-jet-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                  <span className="text-[10px] font-mono text-gold-500 mt-1 uppercase block hover:underline">
                    Ver Planos y Memoria Descriptiva →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Details */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-jet-950/80 backdrop-blur-md">
            <div className="bg-jet-900 border border-jet-800 rounded-lg max-w-2xl w-full p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-jet-300 hover:text-white transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-gold-500 uppercase tracking-widest block mb-1">
                    {selectedProject.category} / FICHA TÉCNICA
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                </div>

                <div className="p-4 bg-jet-950 border border-jet-800 rounded flex flex-col sm:flex-row gap-4 sm:items-center text-xs font-mono justify-around text-jet-200">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold-500" />
                    <div>
                      <p className="text-[10px] text-jet-300">UBICACIÓN</p>
                      <p className="font-bold">{selectedProject.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Expand className="w-4 h-4 text-gold-500" />
                    <div>
                      <p className="text-[10px] text-jet-300">ÁREA DESPLEGADA</p>
                      <p className="font-bold">{selectedProject.area}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-gold-500" />
                    <div>
                      <p className="text-[10px] text-jet-300">SEGURIDAD</p>
                      <p className="font-bold">Normativa ISO</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                    <h3 className="font-display font-bold text-sm text-white">Memoria del Proyecto</h3>
                  <p className="text-sm text-jet-300 font-light leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-jet-800">
                    <h3 className="font-display font-bold text-sm text-gold-500">Componentes Clave Desplegados:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-jet-200 bg-jet-950/40 p-3 rounded border border-jet-800">
                        <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fake Download Specification Button */}
                <div className="pt-6 border-t border-jet-800 flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => {
                      alert("Descarga Iniciada: La memoria técnica y planos CAD en formato DWG han sido solicitados con éxito a la base de datos.");
                    }}
                    className="flex-1 px-5 py-3 rounded bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Descargar Planos CAD (.dwg)
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedProject(null);
                      const element = document.querySelector("#estimator");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="px-5 py-3 rounded border border-jet-700 hover:border-gold-500 text-white font-medium text-xs uppercase tracking-wider"
                  >
                    Cotizar Configuración Similar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
