import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO";

interface BlogArticle {
  idBlog: number;
  slug: string;
  servicio: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  keywords: string;
}

export default function BlogArticle() {
  const { slug } = useParams();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(setArticle)
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-jet-950 flex items-center justify-center">
        <span className="text-jet-300 font-mono text-sm">Cargando...</span>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-jet-950 flex flex-col items-center justify-center gap-4">
        <h1 className="font-display text-3xl font-bold text-white">Artículo no encontrado</h1>
        <Link to="/blog" className="text-gold-500 hover:underline text-sm">
          Volver al blog
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-jet-950 text-white pt-28 pb-20">
      <SEO
        title={article.title}
        description={article.excerpt}
        url={`/blog/${article.slug}`}
        type="article"
      />
      <div className="max-w-3xl mx-auto px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 text-xs font-mono text-jet-400">
          <Link to="/" className="hover:text-gold-500 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-gold-500 transition-colors">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-jet-200">{article.title}</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500 border border-gold-500/20 px-2 py-0.5">
            {article.servicio}
          </span>
          <span className="text-[10px] font-mono text-jet-400">
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          {article.title}
        </h1>

        {/* Author & date */}
        <div className="flex items-center gap-4 text-xs font-mono text-jet-400 mb-10 pb-10 border-b border-jet-800">
          <span>{article.author}</span>
          <span>{new Date(article.date).toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" })}</span>
        </div>

        {/* Excerpt */}
        <p className="text-lg text-jet-200 font-light leading-relaxed mb-10 pb-10 border-b border-jet-800">
          {article.excerpt}
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
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-jet-800 text-center">
          <p className="text-jet-300 mb-4 font-light">¿Tu proyecto encaja con esta solución?</p>
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
