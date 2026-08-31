import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO";
import { modeloName } from "../lib/modelosMeta";
import { processHtml } from "../lib/html";

interface CasoExito {
  idCasos: number;
  slug: string;
  modelo: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  gallery: string[] | null;
}

export default function CasoExito() {
  const { modelo, slug } = useParams();
  const [caso, setCaso] = useState<CasoExito | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/casos-exito/${modelo}/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(setCaso)
      .catch(() => setCaso(null))
      .finally(() => setLoading(false));
  }, [modelo, slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-jet-950 flex items-center justify-center">
        <span className="text-jet-300 font-mono text-sm">Cargando...</span>
      </div>
    );
  }

  if (!caso) {
    return (
      <div className="min-h-screen bg-jet-950 flex flex-col items-center justify-center gap-4">
        <h1 className="font-display text-3xl font-bold text-white">Caso no encontrado</h1>
        <Link to="/casos-de-exito" className="text-gold-500 hover:underline text-sm">
          Volver a casos de éxito
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-jet-950 text-white pt-28 pb-20">
      <SEO
        title={caso.title}
        description={caso.excerpt}
        url={`/casos-de-exito/${caso.modelo}/${caso.slug}`}
        type="article"
      />
      <div className="max-w-3xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 text-xs font-mono text-jet-400">
          <Link to="/" className="hover:text-gold-500 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link to="/casos-de-exito" className="hover:text-gold-500 transition-colors">Casos de éxito</Link>
          <span className="mx-2">/</span>
          <span className="text-jet-200">{caso.title}</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500 border border-gold-500/20 px-2 py-0.5">
            {modeloName(caso.modelo)}
          </span>
          <span className="text-[10px] font-mono text-jet-400">
            {caso.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          {caso.title}
        </h1>

        {/* Author & date */}
        <div className="flex items-center gap-4 text-xs font-mono text-jet-400 mb-10 pb-10 border-b border-jet-800">
          <span>{caso.author}</span>
          <span>{new Date(caso.date).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" })}</span>
        </div>

        {/* Excerpt */}
        <p className="text-lg text-jet-200 font-light leading-relaxed mb-10 pb-10 border-b border-jet-800">
          {caso.excerpt}
        </p>

        {/* Content */}
        <div
          className="prose prose-invert prose-gold max-w-none
            prose-headings:font-display prose-headings:text-white
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-jet-300 prose-p:font-light prose-p:leading-relaxed
            prose-li:text-jet-300 prose-li:font-light
            prose-strong:text-white
            prose-a:text-gold-500 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: processHtml(caso.content) }}
        />

        {/* Gallery */}
        {caso.gallery && caso.gallery.length > 0 && (
          <div className="mt-12 pt-8 border-t border-jet-800">
            <h3 className="font-display text-lg font-bold text-white mb-6">Galería del proyecto</h3>
            <div className="grid grid-cols-2 gap-4">
              {caso.gallery.map((img, i) => (
                <div key={i} className="aspect-video bg-jet-900 border border-jet-800 rounded overflow-hidden flex items-center justify-center">
                  <img src={img} alt={`Galería ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-jet-800 text-center">
          <p className="text-jet-300 mb-4 font-light">¿Tu proyecto es similar? Hablemos.</p>
          <Link
            to="/contacto"
            className="inline-block px-8 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-sm rounded transition-colors"
          >
            Solicitar cotización
          </Link>
        </div>
      </div>
    </article>
  );
}
