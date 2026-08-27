import { useParams, Link } from "react-router-dom";
import { Ruler, ArrowRight, CheckCircle2, Download } from "lucide-react";
import SEO from "../components/SEO";

interface ModelDetail {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  applications: string[];
  features: string[];
}

const modelsData: Record<string, ModelDetail> = {
  multispace: {
    slug: "multispace",
    name: "Módulo Plegable Multispace",
    tagline: "Versatilidad estructural para múltiples sectores",
    description:
      "Sistema modular plegable de rápida implementación. Su diseño multispace permite configuraciones flexibles sin comprometer la resistencia estructural. Ideal para campamentos mineros, aulas temporales, oficinas de faena y clínicas de campaña.",
    specs: [
      { label: "Dimensiones plegado", value: "6m × 3m × 3m" },
      { label: "Dimensiones desplegado", value: "6m × 12m × 3m" },
      { label: "Área útil", value: "72 m²" },
      { label: "Capacidad", value: "8–12 personas" },
      { label: "Peso estructural", value: "2.5 ton" },
      { label: "Aislamiento PIR", value: "80mm – R-24" },
      { label: "Carga de nieve", value: "150 kg/m²" },
      { label: "Viento lateral", value: "120 km/h" },
    ],
    applications: ["Minería", "Construcción", "Educación", "Corporativo"],
    features: [
      "Plegado en Z para transporte eficiente",
      "Montaje en 1-2 días por módulo",
      "Aislamiento térmico y acústico integrado",
      "Instalación eléctrica preinstalada",
      "Revestimiento interior acabado",
      "Ventanas con doble acristalamiento",
    ],
  },
  "doble-ala": {
    slug: "doble-ala",
    name: "Módulo Plegable Doble Ala",
    tagline: "Doble amplitud para espacios corporativos y sanitarios",
    description:
      "Estructura de doble ala plegable que ofrece el doble de espacio útil sin duplicar el peso. Perfecto para clínicas modulares, salas de reuniones ejecutivas, laboratorios de campaña y espacios corporativos de alta gama.",
    specs: [
      { label: "Dimensiones plegado", value: "8m × 3.2m × 3.2m" },
      { label: "Dimensiones desplegado", value: "8m × 18m × 3.2m" },
      { label: "Área útil", value: "144 m²" },
      { label: "Capacidad", value: "16–24 personas" },
      { label: "Peso estructural", value: "4.2 ton" },
      { label: "Aislamiento PIR", value: "80mm – R-24" },
      { label: "Carga de nieve", value: "200 kg/m²" },
      { label: "Viento lateral", value: "150 km/h" },
    ],
    applications: ["Salud", "Corporativo", "Educación", "Industrial"],
    features: [
      "Expansión simétrica de doble ala",
      "Núcleo central de conexión reforzado",
      "Adecuado para salas de cirugía y laboratorios",
      "Compatibilidad con sistemas de presión negativa",
      "Acabados premium disponibles",
      "Ampliación modular progresiva",
    ],
  },
  "mini-doble-ala": {
    slug: "mini-doble-ala",
    name: "Mini Doble Ala",
    tagline: "Compacto, eficiente, ideal para espacios reducidos",
    description:
      "Versión compacta del doble ala. Diseñado para casetas técnicas, módulos sanitarios, oficinas temporales y depósitos de herramientas. Maximiza el espacio en terrenos reducidos.",
    specs: [
      { label: "Dimensiones plegado", value: "5m × 2.8m × 2.8m" },
      { label: "Dimensiones desplegado", value: "5m × 9m × 2.8m" },
      { label: "Área útil", value: "45 m²" },
      { label: "Capacidad", value: "4–8 personas" },
      { label: "Peso estructural", value: "1.6 ton" },
      { label: "Aislamiento PIR", value: "80mm – R-24" },
      { label: "Carga de nieve", value: "150 kg/m²" },
      { label: "Viento lateral", value: "120 km/h" },
    ],
    applications: ["Salud", "Industrial", "Corporativo"],
    features: [
      "Diseño compacto para terrenos reducidos",
      "Transporte optimizado en camión estándar",
      "Montaje en menos de 1 día",
      "Ideal para oficinas de obra y casetas técnicas",
      "Aislamiento térmico completo",
      "Revestimiento interior y exterior incluido",
    ],
  },
};

export default function ModeloDetalle() {
  const { slug } = useParams();
  const model = modelsData[slug || ""];

  if (!model) {
    return (
      <div className="min-h-screen bg-jet-950 flex flex-col items-center justify-center gap-4">
        <h1 className="font-display text-3xl font-bold text-white">Modelo no encontrado</h1>
        <Link to="/modelos" className="text-gold-500 hover:underline text-sm">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-jet-950 text-white pt-28 pb-20">
      <SEO
        title={`${model.name} — Ficha Técnica`}
        description={`${model.description.slice(0, 155)}...`}
        url={`/modelos/${model.slug}`}
        structuredData={{ "@context": "https://schema.org", "@type": "Product", name: model.name, description: model.description, brand: { "@type": "Brand", name: "Beyritech" }, offers: { "@type": "Offer", priceCurrency: "PEN", availability: "https://schema.org/InStock" } }}
      />
      <div className="max-w-5xl mx-auto px-6">
        <nav className="mb-8 text-xs font-mono text-jet-400">
          <Link to="/" className="hover:text-gold-500 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link to="/modelos" className="hover:text-gold-500 transition-colors">Modelos</Link>
          <span className="mx-2">/</span>
          <span className="text-jet-200">{model.name}</span>
        </nav>

        <div className="mb-12">
          <div className="inline-flex items-center border border-gold-500/20 px-2.5 py-1 mb-4">
            <span className="text-[9px] font-mono uppercase tracking-widest text-gold-500">FICHA TÉCNICA</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">{model.name}</h1>
          <p className="text-jet-300 font-light text-lg max-w-2xl">{model.tagline}</p>
          <div className="w-16 h-[2px] bg-gold-500 mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-xl font-bold text-white mb-4">Descripción</h2>
              <p className="text-jet-300 font-light leading-relaxed">{model.description}</p>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white mb-4">Características</h2>
              <ul className="space-y-3">
                {model.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-jet-300">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span className="font-light">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white mb-4">Sectores</h2>
              <div className="flex flex-wrap gap-2">
                {model.applications.map((app) => (
                  <span key={app} className="text-xs font-mono uppercase tracking-wider text-gold-500 border border-gold-500/20 px-3 py-1.5">{app}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-jet-900 border border-jet-800 p-6 rounded">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-jet-800">
                <Ruler className="w-4 h-4 text-gold-500" />
                <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">Especificaciones Técnicas</h3>
              </div>
              <div className="space-y-1">
                {model.specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between text-sm py-2 border-b border-jet-800/60 last:border-b-0">
                    <span className="font-mono text-jet-300 uppercase tracking-wider text-[11px]">{spec.label}</span>
                    <span className="font-mono text-white font-medium text-xs">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-jet-900 border border-jet-800 p-6 rounded space-y-4">
              <h3 className="font-display font-bold text-white text-sm">Descargar ficha técnica</h3>
              <p className="text-xs text-jet-300 font-light">Solicite la ficha técnica completa con planos CAD y memoria descriptiva.</p>
              <Link to="/contacto" className="w-full px-5 py-3 bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-xs rounded flex items-center justify-center gap-2 transition-colors">
                <Download className="w-4 h-4" /> Solicitar ficha técnica
              </Link>
            </div>

            <Link to="/contacto" className="w-full px-5 py-3 border border-gold-500 hover:bg-gold-500/5 text-gold-500 font-bold uppercase tracking-wider text-xs rounded flex items-center justify-center gap-2 transition-colors">
              Cotizar este modelo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
