import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

interface CasoExito {
  idCasos: number;
  slug: string;
  servicio: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
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

  const servicios = ["todos", ...new Set(casos.map((c) => c.servicio))];
  const filtered = filter === "todos" ? casos : casos.filter((c) => c.servicio === filter);

  return (
    <section className="min-h-screen bg-jet-950 text-white pt-28 pb-20">
      <SEO
        title="Casos de Éxito — Proyectos Reales"
        description="Dos casos reales bien documentados. Cada proyecto cuenta con autorización del cliente y datos verificables de alcance, tiempos y ubicación."
        url="/casos-de-exito"
      />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
            Casos de éxito
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-3 tracking-tight">
            Proyectos reales
          </h1>
          <div className="w-16 h-[2px] bg-gold-500 mt-6" />
          <p className="text-jet-300 mt-4 max-w-2xl font-light leading-relaxed">
            Dos casos reales bien contados convencen más que cinco inventados.
            Cada proyecto cuenta con autorización del cliente y fotos del módulo instalado.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {servicios.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded transition-all border ${
                filter === s
                  ? "bg-gold-500 border-gold-500 text-black font-bold"
                  : "bg-jet-900 border-jet-800 text-jet-300 hover:border-gold-500/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-20 text-jet-300 font-mono text-sm">
            Cargando casos...
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-jet-300 font-light">
            No hay casos publicados aún.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((caso) => (
            <Link
              key={caso.idCasos}
              to={`/casos-de-exito/${caso.slug}`}
              className="group bg-jet-900 border border-jet-800 hover:border-gold-500/40 rounded overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-52 bg-gradient-to-br from-jet-900 to-jet-950 flex items-center justify-center relative">
                <span className="text-xs font-mono text-jet-600 uppercase tracking-widest">
                  {caso.servicio}
                </span>
                {caso.featured && (
                  <span className="absolute top-4 right-4 text-[9px] font-mono uppercase tracking-wider text-gold-500 border border-gold-500/20 px-2 py-0.5 bg-jet-950/80">
                    Destacado
                  </span>
                )}
              </div>
              <div className="p-6">
                <h2 className="font-display text-lg font-bold text-white group-hover:text-gold-500 transition-colors mb-2">
                  {caso.title}
                </h2>
                <p className="text-sm text-jet-300 font-light line-clamp-2 mb-4">
                  {caso.excerpt}
                </p>
                <div className="flex items-center gap-4 text-[10px] font-mono text-jet-400 uppercase tracking-wider">
                  <span>{caso.author}</span>
                  <span>{caso.readTime}</span>
                  <span>{new Date(caso.date).toLocaleDateString("es-PE")}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
