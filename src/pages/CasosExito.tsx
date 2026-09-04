import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, Award, ShieldCheck } from "lucide-react";
import SEO from "../components/SEO";
import { modeloName, modeloShort } from "../lib/modelosMeta";

interface CasoExito {
  idCasos: number;
  slug: string;
  modelo: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string | null;
  featured: boolean;
  isNew: boolean;
}

export default function CasosExito() {
  const [casos, setCasos] = useState<CasoExito[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    fetch("/api/casos-exito")
      .then((r) => r.json())
      .then((data) => {
        setCasos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const modelos: string[] = ["todos", ...Array.from(new Set<string>(casos.map((c) => c.modelo)))];
  const filtered = filter === "todos" ? casos : casos.filter((c) => c.modelo === filter);

  return (
    <section className="min-h-screen bg-jet-950 text-white pt-28 pb-24 relative overflow-hidden">
      {/* Texturizado a cuadros de fondo */}
      <div className="absolute inset-0 gold-grid-overlay opacity-40 pointer-events-none" />
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <SEO
        title="Casos de Éxito — Proyectos Reales"
        description="Casos reales bien documentados. Cada proyecto cuenta con autorización del cliente y datos verificables de alcance, tiempos y ubicación."
        url="/casos-de-exito"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-mono uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            Despliegues Reales Auditados
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Casos de éxito y proyectos
          </h1>
          <div className="w-20 h-[2px] bg-gold-500 mt-5" />
          <p className="text-jet-300 mt-4 max-w-2xl font-light leading-relaxed text-base">
            Proyectos reales con datos técnicos verificables de alcance, plazos de entrega,
            condiciones de terreno e infraestructura operativa instalada.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2.5 mb-12">
          {modelos.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-md transition-all border ${
                filter === s
                  ? "bg-gold-500 border-gold-500 text-black font-bold shadow-[0_2px_12px_rgba(254,201,52,0.25)]"
                  : "bg-jet-900/80 border-jet-800 text-jet-300 hover:border-gold-500/40 hover:text-white"
              }`}
            >
              {modeloShort(s)}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-24 text-jet-400 font-mono text-sm flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
            Cargando proyectos...
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-jet-300 font-light border border-jet-800/80 rounded-xl bg-jet-900/40 p-12">
            <Award className="w-12 h-12 text-jet-600 mx-auto mb-4" />
            <p className="text-base text-jet-300">No hay casos de éxito en esta categoría aún.</p>
          </div>
        )}

        {/* Grid de Mini Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filtered.map((caso) => (
            <Link
              key={caso.idCasos}
              to={`/casos-de-exito/${caso.modelo}/${caso.slug}`}
              className="group relative bg-jet-900/90 border border-jet-800 hover:border-gold-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              {/* Esquinas Técnicas Industriales */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gold-500/40 group-hover:border-gold-500 transition-colors z-20" />
              <div className="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-gold-500/40 group-hover:border-gold-500 transition-colors z-20" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-gold-500/40 group-hover:border-gold-500 transition-colors z-20" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-gold-500/40 group-hover:border-gold-500 transition-colors z-20" />

              <div>
                {/* ─── IMAGEN DESTACADA DE LA MINI CARD ───────────────── */}
                <div className="h-56 sm:h-64 w-full relative overflow-hidden bg-jet-950">
                  {/* Texturizado a cuadros sobre la tarjeta */}
                  <div className="absolute inset-0 gold-grid-overlay opacity-30 z-10 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-jet-900 via-jet-900/30 to-transparent z-10 pointer-events-none" />

                  {caso.image ? (
                    <img
                      src={caso.image}
                      alt={caso.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 relative z-0"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-jet-950 via-jet-900 to-jet-950 relative z-0">
                      <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 mb-3 group-hover:scale-110 transition-transform">
                        <Award className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono text-jet-400 uppercase tracking-wider">
                        Proyecto en operación
                      </span>
                    </div>
                  )}

                  {/* Badges Flotantes Superiores */}
                  <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gold-500 bg-black/75 backdrop-blur-md border border-gold-500/30 px-2.5 py-1 rounded shadow-sm font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {modeloName(caso.modelo)}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {caso.featured ? (
                        <span className="text-[9px] font-mono uppercase tracking-widest text-black font-bold bg-gold-500 px-2 py-0.5 rounded shadow-sm">
                          Destacado
                        </span>
                      ) : null}
                      {caso.isNew ? (
                        <span className="text-[9px] font-mono uppercase tracking-widest text-white font-bold bg-emerald-700/80 backdrop-blur-sm border border-emerald-500/40 px-2 py-0.5 rounded shadow-sm">
                          Reciente
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* ─── CONTENIDO DE LA MINI CARD ─────────────────────── */}
                <div className="p-6">
                  {/* Metadatos */}
                  <div className="flex items-center gap-3 text-xs font-mono text-jet-400 mb-3">
                    <span className="flex items-center gap-1 text-gold-500/80">
                      <Clock className="w-3.5 h-3.5" />
                      {caso.readTime}
                    </span>
                    <span className="text-jet-600">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-jet-500" />
                      {new Date(caso.date).toLocaleDateString("es-PE", { year: "numeric", month: "short", day: "numeric" })}
                    </span>
                  </div>

                  {/* Título */}
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-gold-500 transition-colors line-clamp-2 leading-snug mb-3">
                    {caso.title}
                  </h3>

                  {/* Extracto */}
                  <p className="text-jet-300 text-sm font-light line-clamp-3 leading-relaxed">
                    {caso.excerpt}
                  </p>
                </div>
              </div>

              {/* ─── FOOTER DE LA MINI CARD ──────────────────────────── */}
              <div className="px-6 pb-6 pt-0">
                <div className="pt-4 border-t border-jet-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-gold-500 font-semibold flex items-center gap-1.5 group-hover:text-gold-400 transition-colors">
                    Ver caso de estudio
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                  </span>
                  <span className="text-[11px] font-mono text-jet-500">
                    {caso.author}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
