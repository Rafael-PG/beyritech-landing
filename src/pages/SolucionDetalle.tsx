import React from "react";
import { useParams, Link } from "react-router-dom";
import { Wheat, Warehouse, HardHat, Building2, GraduationCap, Check, ArrowRight, Phone } from "lucide-react";
import SEO from "../components/SEO";
import ScrollReveal from "../hooks/ScrollReveal";

interface SectorData {
  icon: React.ElementType;
  title: string;
  description: string;
  useCases: string[];
  recommendedModels: { name: string; slug: string; fit: string }[];
  benefits: string[];
  gradient: string;
}

const sectorsData: Record<string, SectorData> = {
  agroindustria: {
    icon: Wheat,
    title: "Agroindustria",
    description: "Módulos diseñados para operaciones agrícolas y procesadoras: dormitorios, casinos, clínicas y oficinas que soportan condiciones de campo extremas.",
    useCases: [
      "Dormitorios para personal de campo",
      "Casinos y comedores industriales",
      "Clínicas y postas de salud",
      "Oficinas de administración de fundo",
      "Laboratorios de control de calidad",
    ],
    recommendedModels: [
      { name: "Multispace", slug: "multispace", fit: "Alojamiento y oficinas compactas" },
      { name: "Doble Ala", slug: "doble-ala", fit: "Espacios amplios y multiuso" },
    ],
    benefits: [
      "Aislamiento térmico para climas extremos",
      "Despliegue rápido en zonas remotas",
      "Normativas sanitarias cumplidas",
      "Reubicación entre campañas agrícolas",
    ],
    gradient: "from-emerald-600 to-emerald-800",
  },
  "logistica-almacenes": {
    icon: Warehouse,
    title: "Logística y Almacenes",
    description: "Bodegas modulares, oficinas operativas y plataformas de distribución que se amplían según la demanda del mercado.",
    useCases: [
      "Bodegas y almacenes temporales",
      "Oficinas de logística y despacho",
      "Plataformas de distribución",
      "Centros de operaciones portuarias",
      "Control de inventario y tránsito",
    ],
    recommendedModels: [
      { name: "Doble Ala", slug: "doble-ala", fit: "Bodegas y oficinas de amplio espectro" },
      { name: "Mini Doble Ala", slug: "mini-doble-ala", fit: "Oficinas operativas compactas" },
    ],
    benefits: [
      "Ampliación progresiva sin detener operaciones",
      "Costos controlados vs. bodegas tradicionales",
      "Despliegue en semanas",
      "Reubicación según demanda estacional",
    ],
    gradient: "from-blue-600 to-blue-800",
  },
  "obra-construccion": {
    icon: HardHat,
    title: "Obra y Construcción",
    description: "Campamentos, cuadros de comando y centros de acopio temporales para obras de infraestructura y minería.",
    useCases: [
      "Campamentos de obra",
      "Cuadros de comando y seguridad",
      "Centros de acopio y bodegas",
      "Oficinas de proyecto",
      "Baños y duchas temporales",
    ],
    recommendedModels: [
      { name: "Multispace", slug: "multispace", fit: "Campamentos y oficinas de campo" },
      { name: "Mini Doble Ala", slug: "mini-doble-ala", fit: "Oficinas y servicios temporales" },
    ],
    benefits: [
      "Temporalidad controlada — se retira al terminar",
      "Reubicación frecuente entre proyectos",
      "Seguridad y supervivencia en sitio",
      "Mínimo trabajo húmedo en campo",
    ],
    gradient: "from-orange-600 to-orange-800",
  },
  corporativo: {
    icon: Building2,
    title: "Corporativo",
    description: "Oficinas ejecutivas, salas de capacitación y espacios temporales con acabados profesionales para empresas en crecimiento.",
    useCases: [
      "Oficinas ejecutivas temporales",
      "Salas de juntas y capacitación",
      "Ampliación de oficinas existentes",
      "Centros de atención al cliente",
      "Espacios de innovación y coworking",
    ],
    recommendedModels: [
      { name: "Doble Ala", slug: "doble-ala", fit: "Oficinas ejecutivas amplias" },
      { name: "Mini Doble Ala", slug: "mini-doble-ala", fit: "Salas de reunión y oficinas compactas" },
    ],
    benefits: [
      "Acabados de arquitectura premium",
      "Imagen profesional inmediata",
      "Ampliación sin detener operaciones",
      "Costos predecibles",
    ],
    gradient: "from-purple-600 to-purple-800",
  },
  educacion: {
    icon: GraduationCap,
    title: "Educación",
    description: "Aulas, laboratorios y bibliotecas modulares que permiten expandir la infraestructura educativa en semanas, no en años.",
    useCases: [
      "Aulas temporales y permanentes",
      "Laboratorios de ciencias",
      "Bibliotecas y centros de estudio",
      "Salas de computación",
      "Espacios de atención estudiantil",
    ],
    recommendedModels: [
      { name: "Mini Doble Ala", slug: "mini-doble-ala", fit: "Aulas y espacios educativos compactos" },
      { name: "Doble Ala", slug: "doble-ala", fit: "Laboratorios y bibliotecas amplias" },
    ],
    benefits: [
      "Aislamiento acústico para ambientes de estudio",
      "Despliegue durante vacaciones escolares",
      "Seguridad para entornos estudiantiles",
      "Años de vida útil con bajo mantenimiento",
    ],
    gradient: "from-cyan-600 to-cyan-800",
  },
};

export default function SolucionDetalle() {
  const { slug } = useParams<{ slug: string }>();
  const data = sectorsData[slug || ""];

  if (!data) {
    return (
      <div className="min-h-screen bg-jet-950 flex flex-col items-center justify-center gap-4">
        <h1 className="font-display text-6xl font-bold text-gold-500">404</h1>
        <p className="text-jet-300 font-light">Sector no encontrado</p>
        <Link to="/soluciones" className="text-gold-500 hover:underline text-sm mt-4">Ver todos los sectores</Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${data.title} — Soluciones Modulares Beyritech`}
        description={data.description}
        url={`/soluciones/${slug}`}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-jet-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${data.gradient} rounded text-white text-xs font-mono mb-6`}>
            <data.icon className="w-3.5 h-3.5" />
            Solución Sectorial
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-4">{data.title}</h1>
          <p className="text-jet-300 text-lg font-light max-w-3xl leading-relaxed">{data.description}</p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-jet-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold mb-8">Casos de Uso</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.useCases.map((use, i) => (
                <div key={i} className="flex items-start gap-3 bg-jet-950 border border-jet-800 rounded-lg p-4">
                  <Check className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-jet-200">{use}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Recommended Models */}
      <section className="py-16 bg-jet-950 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold mb-8">Modelos Recomendados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.recommendedModels.map((model, i) => (
                <Link
                  key={i}
                  to={`/modelos/${model.slug}`}
                  className="group bg-jet-900 border border-jet-800 rounded-xl p-6 hover:border-gold-500/50 transition-all"
                >
                  <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-gold-500 transition-colors">{model.name}</h3>
                  <p className="text-sm text-jet-300">{model.fit}</p>
                  <span className="inline-flex items-center gap-1.5 text-gold-500 text-xs font-medium mt-3 group-hover:gap-2.5 transition-all">
                    Ver detalles <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-jet-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold mb-8">Beneficios para este Sector</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 bg-jet-950 border border-jet-800 rounded-lg p-4">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-jet-200">{benefit}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-jet-950 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              ¿Necesita una solución para <span className="text-gold-500">{data.title.toLowerCase()}</span>?
            </h2>
            <p className="text-jet-300 font-light mb-8">Contáctenos para una cotización personalizada según las necesidades de su sector.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contacto"
                className="px-8 py-3.5 bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-sm rounded transition-all shadow-lg shadow-gold-500/20"
              >
                Solicitar Cotización
              </Link>
              <a
                href="https://wa.me/51993694677?text=Hola,%20estoy%20interesado%20en%20una%20solución%20modular%20para%20sector%20de%20%5Bnombre%20del%20sector%5D."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-sm rounded transition-all"
              >
                <Phone className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
