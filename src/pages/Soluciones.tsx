import { Wheat, Warehouse, HardHat, Building2, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import ScrollReveal from "../hooks/ScrollReveal";

const sectors = [
  {
    icon: Wheat,
    title: "Agroindustria",
    slug: "agroindustria",
    description: "Casinos, dormitorios, oficinas y áreas de proceso para fundos, plantas procesadoras y operaciones agrícolas.",
    challenges: ["Acceso remoto", "Climatología extrema", "Normativas sanitarias estrictas"],
    gradient: "from-emerald-600 to-emerald-800",
  },
  {
    icon: Warehouse,
    title: "Logística y Almacenes",
    slug: "logistica-almacenes",
    description: "Bodegas, oficinas operativas, plataformas de distribución y centros de logística modular.",
    challenges: ["Ampliación rápida", "Alta demanda estacional", "Costos operativos controlados"],
    gradient: "from-blue-600 to-blue-800",
  },
  {
    icon: HardHat,
    title: "Obra y Construcción",
    slug: "obra-construccion",
    description: "Campamentos, cuadros de comando, centros de acopio y oficinas temporales de obra.",
    challenges: ["Temporalidad", "Reubicación frecuente", "Seguridad en sitio"],
    gradient: "from-orange-600 to-orange-800",
  },
  {
    icon: Building2,
    title: "Corporativo",
    slug: "corporativo",
    description: "Oficinas ejecutivas, salas de capacitación, espacios temporales y ampliaciones corporativas.",
    challenges: ["Imagen profesional", "Ampliación sin detener operaciones", "Acabados premium"],
    gradient: "from-purple-600 to-purple-800",
  },
  {
    icon: GraduationCap,
    title: "Educación",
    slug: "educacion",
    description: "Aulas, laboratorios, bibliotecas y espacios educativos modulares de alta calidad.",
    challenges: ["Aislamiento acústico", "Seguridad estudiantil", "Despliegue en vacaciones"],
    gradient: "from-cyan-600 to-cyan-800",
  },
];

export default function Soluciones() {
  return (
    <>
      <SEO
        title="Soluciones por Sector — Módulos Modulares"
        description="Configuraciones modulares específicas para agroindustria, logística, obra, corporaciones y educación. Espacios diseñados para los desafíos de cada industria."
        url="/soluciones"
      />

      <section className="pt-32 pb-20 bg-jet-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
                Soluciones por Sector
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mt-3 tracking-tight">
                Diseñados para su <span className="text-gold-500">industria</span>
              </h1>
              <p className="text-jet-300 mt-4 font-sans text-lg font-light leading-relaxed">
                Cada sector tiene desafíos únicos. Nuestras configuraciones modulares se adaptan a las necesidades específicas de su operación.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector, i) => (
              <div key={i}>
              <ScrollReveal delay={i * 100}>
                <Link
                  to={`/soluciones/${sector.slug}`}
                  className="group block h-full bg-jet-900 border border-jet-800 rounded-xl overflow-hidden hover:border-gold-500/50 transition-all duration-300"
                >
                  <div className={`h-2 bg-gradient-to-r ${sector.gradient}`} />
                  <div className="p-6">
                    <sector.icon className="w-10 h-10 text-gold-500 mb-4" />
                    <h2 className="font-display text-xl font-bold text-white mb-2">{sector.title}</h2>
                    <p className="text-sm text-jet-300 font-light leading-relaxed mb-4">{sector.description}</p>
                    <ul className="space-y-1.5 mb-4">
                      {sector.challenges.map((c, j) => (
                        <li key={j} className="text-xs text-jet-400 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gold-500 shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                    <span className="inline-flex items-center gap-1.5 text-gold-500 text-xs font-medium group-hover:gap-2.5 transition-all">
                      Ver solución <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
