import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { modeloName, modeloShort } from "../lib/modelosMeta";

interface BlogPost {
  idBlog: number;
  slug: string;
  modelo: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  featured: boolean;
  isNew: boolean;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const modelos = ["todos", ...new Set(posts.map((p) => p.modelo))];
  const filtered = filter === "todos" ? posts : posts.filter((p) => p.modelo === filter);

  return (
    <section className="min-h-screen bg-jet-950 text-white pt-28 pb-20">
      <SEO
        title="Blog Técnico"
        description="Artículos sobre ingeniería modular, construcción prefabricada, aislamiento térmico y soluciones modulares para distintos sectores."
        url="/blog"
      />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
            Blog técnico
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-3 tracking-tight">
            Artículos y guías
          </h1>
          <div className="w-16 h-[2px] bg-gold-500 mt-6" />
          <p className="text-jet-300 mt-4 max-w-2xl font-light leading-relaxed">
            Contenido técnico sobre módulos prefabricados, requisitos de terreno,
            comparativas y buenas prácticas de instalación.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {modelos.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded transition-all border ${
                filter === s
                  ? "bg-gold-500 border-gold-500 text-black font-bold"
                  : "bg-jet-900 border-jet-800 text-jet-300 hover:border-gold-500/40"
              }`}
            >
              {modeloShort(s)}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-jet-300 font-mono text-sm">
            Cargando artículos...
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-jet-300 font-light">
            No hay artículos publicados aún.
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((post) => (
            <Link
              key={post.idBlog}
              to={`/blog/${post.modelo}/${post.slug}`}
              className="group bg-jet-900 border border-jet-800 hover:border-gold-500/40 rounded overflow-hidden transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-48 bg-gradient-to-br from-jet-900 to-jet-950 flex items-center justify-center">
                <span className="text-xs font-mono text-jet-600 uppercase tracking-widest">
                  {modeloName(post.modelo)}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {post.featured && (
                    <span className="text-[9px] font-mono uppercase tracking-wider text-gold-500 border border-gold-500/20 px-2 py-0.5">
                      Destacado
                    </span>
                  )}
                  {post.isNew && (
                    <span className="text-[9px] font-mono uppercase tracking-wider text-green-400 border border-green-400/20 px-2 py-0.5">
                      Nuevo
                    </span>
                  )}
                </div>
                <h2 className="font-display text-lg font-bold text-white group-hover:text-gold-500 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-jet-300 font-light line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-[10px] font-mono text-jet-400 uppercase tracking-wider">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                  <span>{new Date(post.date).toLocaleDateString("es-PE")}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
