import { Link, useParams } from "react-router-dom";
import { Check, ArrowRight, Phone, Award } from "lucide-react";
import SEO from "../components/SEO";
import ScrollReveal from "../hooks/ScrollReveal";
import { getSector } from "../data/soluciones";

export default function SolucionDetalle() {
  const { slug } = useParams();
  const data = getSector(slug);

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

      {/* Real case (only for sectors with verified projects) */}
      {data.caso && (
        <section className="py-16 bg-jet-950 text-white">
          <div className="max-w-5xl mx-auto px-6">
            <ScrollReveal>
              <div className="bg-jet-900 border border-gold-500/20 rounded-xl p-8 sm:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="lg:w-1/3 shrink-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/30 rounded text-gold-500 text-xs font-mono mb-4">
                      <Award className="w-3.5 h-3.5" />
                      Caso real
                    </div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">
                      {data.caso.title}
                    </h2>
                    <Link
                      to={data.caso.href}
                      className="inline-flex items-center gap-1.5 text-gold-500 text-xs font-medium mt-4 group"
                    >
                      Ver caso completo <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <ul className="flex-1 space-y-3">
                    {data.caso.facts.map((fact, i) => (
                      <li key={i} className="flex items-start gap-3 bg-jet-950 border border-jet-800 rounded-lg p-4">
                        <span className="text-[10px] font-mono text-gold-500 mt-0.5 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-jet-200">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Recommended Models */}
      <section className="py-16 bg-jet-900 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold mb-8">Modelos Recomendados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {data.recommendedModels.map((model, i) => (
                <Link
                  key={i}
                  to={`/modelos/${model.slug}`}
                  className="group bg-jet-950 border border-jet-800 rounded-xl p-6 hover:border-gold-500/40 transition-all"
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
      <section className="py-16 bg-jet-950 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-display text-2xl font-bold mb-8">Beneficios para este Sector</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 bg-jet-900 border border-jet-800 rounded-lg p-4">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-jet-200">{benefit}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-jet-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              ¿Necesita una solución para <span className="text-gold-500">{data.title.toLowerCase()}</span>?
            </h2>
            <p className="text-jet-300 font-light mb-8">Contáctenos para una cotización personalizada según las necesidades de su sector.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contacto"
                className="px-8 py-3.5 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-sm rounded transition-all shadow-lg shadow-gold-500/20"
              >
                Solicitar Cotización
              </Link>
              <a
                href="https://wa.me/51993694677?text=Hola,%20estoy%20interesado%20en%20una%20solución%20modular%20para%20sector%20de%20%5Bnombre%20del%20sector%5D."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-[#ffffff] font-bold uppercase tracking-wider text-sm rounded transition-all"
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