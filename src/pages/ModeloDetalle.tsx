import { useParams, Link } from "react-router-dom";
import { Ruler, ArrowRight, CheckCircle2, Download, Wrench, Clock, MapPin, Layers } from "lucide-react";
import SEO from "../components/SEO";
import { getModel, getSortedModels } from "../data/modelos";

export default function ModeloDetalle() {
  const { slug } = useParams();
  const model = getModel(slug);
  const related = getSortedModels(slug || "");

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
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-4 h-4 text-gold-500" />
                <h2 className="font-display text-xl font-bold text-white">Opciones y personalización</h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {model.options.map((opt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-jet-300 bg-jet-900 border border-jet-800 rounded p-3">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span className="font-light">{opt}</span>
                  </li>
                ))}
              </ul>
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
                    <span className="font-mono text-white font-medium text-xs text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-jet-900 border border-jet-800 p-6 rounded space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-500" />
                <h3 className="font-display font-bold text-white text-sm">Plazo de entrega</h3>
              </div>
              <p className="text-xs text-jet-300 font-light">{model.deliveryTime}</p>
            </div>

            <div className="bg-jet-900 border border-jet-800 p-6 rounded space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-500" />
                <h3 className="font-display font-bold text-white text-sm">Requisitos de instalación</h3>
              </div>
              <ul className="space-y-2">
                {model.installRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-jet-300 font-light">
                    <span className="w-1 h-1 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-jet-900 border border-jet-800 p-6 rounded space-y-4">
              <h3 className="font-display font-bold text-white text-sm">Descargar ficha técnica</h3>
              <p className="text-xs text-jet-300 font-light">Solicite la ficha técnica completa con planos CAD y memoria descriptiva.</p>
              <Link to={`/contacto?modelo=${model.slug}`} className="w-full px-5 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-xs rounded flex items-center justify-center gap-2 transition-colors">
                <Download className="w-4 h-4" /> Solicitar ficha técnica
              </Link>
            </div>

            <Link to={`/contacto?modelo=${model.slug}`} className="w-full px-5 py-3 border border-gold-500 hover:bg-gold-500/5 text-gold-500 font-bold uppercase tracking-wider text-xs rounded flex items-center justify-center gap-2 transition-colors">
              Cotizar este modelo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20 border-t border-jet-800 pt-12">
            <h2 className="font-display text-2xl font-bold text-white mb-8">Modelos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/modelos/${rel.slug}`}
                  className="group bg-jet-900 border border-jet-800 rounded-xl p-6 hover:border-gold-500/40 transition-all"
                >
                  <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-gold-500 transition-colors">{rel.name}</h3>
                  <p className="text-sm text-jet-300 mb-3">{rel.tagline}</p>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-jet-300 uppercase tracking-wider">
                    <span>{rel.area}</span>
                    <span className="text-jet-700">|</span>
                    <span>{rel.capacity}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-gold-500 text-xs font-medium mt-3 group-hover:gap-2.5 transition-all">
                    Ver ficha <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}