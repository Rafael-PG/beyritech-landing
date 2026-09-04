import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Box, Award, CheckCircle2 } from "lucide-react";
import ScrollReveal from "../hooks/ScrollReveal";
import { modeloName } from "../lib/modelosMeta";

interface CasoItem {
  idCasos: number;
  slug: string;
  modelo: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string | null;
  featured?: boolean | number;
  isNew?: boolean | number;
}

export default function Projects() {
  const [casos, setCasos] = useState<CasoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/casos-exito")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCasos(data.slice(0, 3));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (!loading && casos.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="section-texture py-24 bg-jet-900 text-white relative [content-visibility:auto] [contain-intrinsic-size:600px]">
      {/* Grid texture background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FEC93406_1px,transparent_1px),linear-gradient(to_bottom,#FEC93406_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500 font-semibold inline-flex items-center gap-2">
              <Award className="w-3.5 h-3.5" /> Casos de Éxito
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 tracking-tight text-white leading-tight">
              Proyectos{" "}
              <span className="relative inline-block">
                reales
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gold-500/40" />
              </span>
            </h2>
            <p className="text-jet-400 mt-5 font-sans text-base font-light leading-relaxed max-w-xl mx-auto">
              Despliegues y configuraciones modulares ejecutadas para clientes con datos verificables.
            </p>
          </div>
        </ScrollReveal>

        {/* Dynamic case studies list */}
        <div className="space-y-12">
          {casos.map((caso, i) => (
            <div key={caso.idCasos}>
              <ScrollReveal delay={i * 0.15}>
                <div className="group rounded-xl overflow-hidden border border-gold-500/15 hover:border-gold-500/40 transition-all duration-300 bg-jet-950 shadow-2xl hover:shadow-gold-500/5">
                  <div className="flex flex-col lg:flex-row min-h-[340px]">
                    {/* Visual side */}
                    <div className="lg:w-5/12 relative min-h-[260px] lg:min-h-[340px] overflow-hidden bg-jet-900">
                      {caso.image ? (
                        <img
                          src={caso.image}
                          alt={caso.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-jet-800 to-jet-950">
                          <Box className="w-12 h-12 text-gold-500/30" />
                        </div>
                      )}
                      {/* Gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
                      <div className="absolute inset-0 bg-gold-500/5 mix-blend-overlay" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        <span className="px-3 py-1 rounded-sm bg-black/70 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-gold-500 border border-gold-500/30">
                          {modeloName(caso.modelo)}
                        </span>
                        <span className="px-2.5 py-1 rounded-sm bg-black/70 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-jet-300 border border-jet-700">
                          Caso Real
                        </span>
                      </div>
                    </div>

                    {/* Content side */}
                    <div className="lg:w-7/12 p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-gold-500/10 bg-jet-950">
                      <div>
                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-xs text-jet-400 font-mono mb-3">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gold-500" />
                            {new Date(caso.date).toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          <span className="text-jet-600">·</span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gold-500" />
                            {caso.readTime || "5 min lectura"}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-gold-500 transition-colors leading-snug">
                          <Link to={`/casos-de-exito/${caso.modelo}/${caso.slug}`}>
                            {caso.title}
                          </Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-jet-300 font-light leading-relaxed mb-6 line-clamp-3">
                          {caso.excerpt}
                        </p>
                      </div>

                      {/* Bottom bar */}
                      <div className="pt-6 border-t border-jet-800/80 flex items-center justify-between flex-wrap gap-4">
                        <Link
                          to={`/casos-de-exito/${caso.modelo}/${caso.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-gold-500 hover:text-gold-400 transition-colors group/link"
                        >
                          <span>Ver caso completo</span>
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 transition-transform" />
                        </Link>

                        <span className="text-[11px] font-mono text-jet-500 uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-500/70" />
                          Auditado por {caso.author || "Beyritech"}
                        </span>
                      </div>
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
              className="inline-flex items-center gap-2 px-6 py-3 border border-gold-500/30 hover:border-gold-500 text-white font-medium uppercase tracking-wider text-xs transition-all hover:bg-gold-500/10 rounded-sm"
            >
              Ver todos los casos de éxito <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
