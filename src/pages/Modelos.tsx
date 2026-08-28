import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import { catalog, type CatalogModel } from "../data/modelos";

function specRows(model: CatalogModel) {
  return [
    { label: "Dimensiones", value: model.dimensionsOpen },
    { label: "Área útil", value: model.area },
    { label: "Capacidad", value: model.capacity },
    { label: "Peso", value: model.weight },
    { label: "Aislamiento PIR", value: model.insulation },
  ];
}

export default function Modelos() {
  return (
    <section className="min-h-screen bg-jet-950 text-white pt-28 pb-20">
      <SEO
        title="Catálogo de Modelos — Multispace, Doble Ala, Mini Doble Ala"
        description="Tres líneas de módulos prefabricados optimizados para diferentes sectores. Especificaciones técnicas, fichas y tabla comparativa."
        url="/modelos"
        structuredData={{ "@context": "https://schema.org", "@type": "ItemList", name: "Modelos Beyritech", numberOfItems: 3, itemListElement: catalog.map((m, i) => ({ "@type": "ListItem", position: i + 1, name: m.name })) }}
      />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
            Catálogo de Modelos
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-3 tracking-tight">
            Módulos <span className="text-gold-500">Multipropósitos</span>
          </h1>
          <div className="w-16 h-[2px] bg-gold-500 mt-6" />
          <p className="text-jet-300 mt-4 max-w-2xl font-light leading-relaxed">
            Tres líneas de módulos prefabricados, cada una optimizada
            para diferentes requisitos de espacio y sector. Descargue la ficha técnica
            o solicite una cotización personalizada.
          </p>
        </div>

        {/* Model Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {catalog.map((model) => (
            <div
              key={model.slug}
              className="bg-jet-900 border border-jet-800 hover:border-gold-500/30 transition-all duration-300 rounded overflow-hidden flex flex-col"
            >
              {/* Blueprint header */}
              <div className="h-48 border-b border-jet-800 bg-jet-950/50 flex items-center justify-center relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-gold-500/30" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-gold-500/30" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-gold-500/30" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-gold-500/30" />
                <span className="text-xs font-mono text-jet-600 uppercase tracking-widest">
                  {model.area}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h2 className="font-display text-xl font-bold text-white mb-1">
                  {model.name}
                </h2>
                <p className="text-[11px] font-mono text-jet-300 uppercase tracking-wider mb-3">
                  {model.tagline}
                </p>

                <div className="border border-jet-800/60 bg-jet-950/60 p-3 mb-4">
                  <div className="space-y-1">
                    {specRows(model).map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between text-xs py-1 border-b border-jet-900/60 last:border-b-0">
                        <span className="font-mono text-jet-300 uppercase tracking-wider text-[10px]">{spec.label}</span>
                        <span className="font-mono text-white font-medium text-[11px]">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {model.applications.map((app) => (
                    <span key={app} className="text-[9px] font-mono uppercase tracking-wider text-gold-500/70 border border-gold-500/10 px-2 py-0.5">
                      {app}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <Link
                    to={`/modelos/${model.slug}`}
                    className="flex-1 px-4 py-2.5 bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-[10px] rounded flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    Ver ficha <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link
                    to={`/contacto?modelo=${model.slug}`}
                    className="px-4 py-2.5 border border-jet-700 hover:border-gold-500/50 text-jet-300 hover:text-white font-mono text-[10px] uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors text-center"
                  >
                    Cotizar
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white mb-8">
            Tabla Comparativa
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-jet-800">
              <thead>
                <tr className="bg-jet-900 border-b border-jet-800">
                  <th className="text-left font-mono text-[10px] uppercase tracking-widest text-gold-500 px-4 py-3">Característica</th>
                  {catalog.map((m) => (
                    <th key={m.slug} className="text-left font-mono text-[10px] uppercase tracking-widest text-gold-500 px-4 py-3">{m.name.split(" ").slice(-1)[0]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { key: "area", label: "Área útil", fn: (m: CatalogModel) => m.area },
                  { key: "capacity", label: "Capacidad", fn: (m: CatalogModel) => m.capacity },
                  { key: "dimensions", label: "Dimensiones", fn: (m: CatalogModel) => m.dimensionsOpen },
                  { key: "weight", label: "Peso", fn: (m: CatalogModel) => m.weight },
                  { key: "insulation", label: "Aislamiento", fn: (m: CatalogModel) => m.insulation },
                  { key: "apps", label: "Sectores", fn: (m: CatalogModel) => m.applications.join(", ") },
                ].map((row, i) => (
                  <tr key={row.key} className={`border-b border-jet-800/60 ${i % 2 === 0 ? "" : "bg-jet-900/30"}`}>
                    <td className="px-4 py-3 font-mono text-jet-300 text-xs">{row.label}</td>
                    {catalog.map((m) => (
                      <td key={m.slug} className="px-4 py-3 text-white font-medium text-xs">{row.fn(m)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-jet-900 border border-jet-800 rounded p-10">
          <h3 className="font-display text-xl font-bold text-white mb-3">
            ¿Necesita una configuración específica?
          </h3>
          <p className="text-jet-300 font-light mb-6 max-w-lg mx-auto">
            Diseñamos módulos a medida para su sector y requerimientos. Solicite una cotización sin compromiso.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-sm rounded transition-colors"
          >
            Solicitar cotización <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}