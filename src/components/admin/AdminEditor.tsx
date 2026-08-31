import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowLeft, Save, Loader2, FileText, Trash2, ImagePlus, Lightbulb, Sparkles,
} from "lucide-react";
import {
  getCms, createCms, updateCms, deleteCms, uploadCmsImage,
  type CmsKind, type CmsPost,
} from "../../api/dashboard";
import { ALLOWED_MODELS } from "../../lib/validation";
import { modeloName as modeloLabel } from "../../lib/modelosMeta";
import { analyzeSeo } from "../../lib/seo-check";
import TiptapEditor from "./TiptapEditor";
import SeoDrawer from "./SeoDrawer";
import { slugify } from "../../lib/html";

interface AdminEditorProps {
  kind: CmsKind;
  id: number | null;
  nonce: number;
  onExitEditor: () => void;
  onRefreshList: () => void;
}

const emptyPost: (kind: CmsKind) => CmsPost = (kind) => ({
  idBlog: kind === "blog" ? 0 : 0,
  slug: "",
  modelo: ALLOWED_MODELS[0],
  title: "",
  excerpt: "",
  content: "",
  date: new Date().toISOString().slice(0, 10),
  author: "Beyritech",
  readTime: "5 min lectura",
  image: null,
  featured: false,
  trafficRank: 0,
  isNew: true,
  keywords: "",
  published: true,
  gallery: kind === "casos" ? [] : [],
});

export default function AdminEditor({ kind, id, nonce, onExitEditor, onRefreshList }: AdminEditorProps) {
  const [loading, setLoading] = useState(id !== null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);
  const [showSeo, setShowSeo] = useState(false);
  const [heroFileInput, setHeroFileInput] = useState<HTMLInputElement | null>(null);

  const [post, setPost] = useState<CmsPost>(() => emptyPost(kind));
  const [slugTouched, setSlugTouched] = useState(false);

  const isEdit = id !== null;

  useEffect(() => {
    if (!isEdit) {
      setPost(emptyPost(kind));
      setLoading(false);
      return;
    }
    setLoading(true);
    (async () => {
      const data = await getCms(kind, id);
      if (data) setPost(data);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, kind, isEdit, nonce]);

  const set = <K extends keyof CmsPost>(key: K, value: CmsPost[K]) =>
    setPost((p) => ({ ...p, [key]: value }));

  const handleTitle = (t: string) => {
    setPost((p) => {
      const next = { ...p, title: t };
      if (!slugTouched) next.slug = slugify(t);
      return next;
    });
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload: Record<string, unknown> = {
      ...post,
      slug: post.slug || slugify(post.title),
      published: post.published ? 1 : 0,
      featured: post.featured ? 1 : 0,
      isNew: post.isNew ? 1 : 0,
    };
    const res = isEdit
      ? await updateCms(kind, id, payload)
      : await createCms(kind, payload);
    setSaving(false);
    if (res.ok) {
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2500);
      onRefreshList();
    } else {
      setError(res.error || "No se pudo guardar.");
    }
  };

  const handleDelete = async () => {
    if (!isEdit) return;
    const ok = window.confirm("¿Seguro que deseas eliminar este registro?");
    if (!ok) return;
    const done = await deleteCms(kind, id);
    if (done) {
      onExitEditor();
      onRefreshList();
    }
  };

  const handleHeroUpload = async (file: File) => {
    const url = await uploadCmsImage(file, post.modelo, post.slug || slugify(post.title));
    if (url) set("image", url);
  };

  const seoResult = useMemo(
    () => analyzeSeo({ title: post.title || "", keywords: post.keywords || "", excerpt: post.excerpt || "", content: post.content || "" }),
    [post.title, post.keywords, post.excerpt, post.content]
  );

  const inlineSuggestion = (label: string): string | undefined => {
    const m = seoResult.metrics.find((x) => x.label === label);
    if (m && m.status !== "pass" && m.suggestion) return m.suggestion;
    return undefined;
  };

  const titleSuggestion = inlineSuggestion("Título");
  const keywordsSuggestion = inlineSuggestion("Keywords");
  const excerptSuggestion = inlineSuggestion("Excerpt");

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-6 h-6 text-gold-500 animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="flex-1 min-h-0 flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <button
          type="button"
          onClick={onExitEditor}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider border border-jet-700 text-jet-300 hover:text-white hover:border-gold-500/50 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Volver
        </button>

        <div className="flex-1" />

        <button
          type="button"
          onClick={() => setShowSeo(true)}
          className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider border transition-colors ${
            seoResult.score >= 80
              ? "border-green-500/40 text-green-300 hover:border-green-400"
              : seoResult.score >= 50
              ? "border-gold-500/50 text-gold-500 hover:border-gold-400"
              : "border-[#e46d63]/40 text-[#e46d63] hover:border-[#e46d63]"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          SEO <span className="font-bold">{seoResult.score}</span>
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider border border-red-500/30 text-[#e46d63] hover:bg-red-500/10 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Eliminar
          </button>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono uppercase tracking-wider bg-gold-500 hover:bg-gold-600 text-black font-bold rounded disabled:opacity-60 transition-colors"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Guardar
        </button>
      </div>

      {savedNotice && (
        <div className="mb-4 px-4 py-2 border border-green-500/30 bg-green-500/10 text-green-300 text-sm">
          Guardado correctamente.
        </div>
      )}
      {error && (
        <div className="mb-4 px-4 py-2 border border-[#e46d63]/30 bg-[#e46d63]/10 text-[#e46d63] text-sm">
          {error}
        </div>
      )}

      {/* Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <label className="block md:col-span-2">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-jet-400 mb-1.5">
            Título
          </span>
          <input
            value={post.title}
            onChange={(e) => handleTitle(e.target.value)}
            placeholder="Título del {modelo}"
            className="w-full px-3 py-2 bg-jet-900 border border-jet-700 text-white text-sm focus:outline-none focus:border-gold-500"
          />
          {titleSuggestion && (
            <p className="mt-1.5 flex items-start gap-1.5 text-xs text-amber-300">
              <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {titleSuggestion}
            </p>
          )}
        </label>

        {/* Palabra clave principal - justo después del título */}
        <label className="block">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-jet-400 mb-1.5">
            Palabra clave principal
          </span>
          <input
            value={post.keywords || ""}
            onChange={(e) => set("keywords", e.target.value)}
            placeholder="p. ej. módulos prefabricados"
            className="w-full px-3 py-2 bg-jet-900 border border-jet-700 text-white text-sm focus:outline-none focus:border-gold-500"
          />
          {keywordsSuggestion && (
            <p className="mt-1.5 flex items-start gap-1.5 text-xs text-amber-300">
              <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {keywordsSuggestion}
            </p>
          )}
        </label>

        <label className="block">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-jet-400 mb-1.5">
            Modelo
          </span>
          <select
            value={post.modelo}
            onChange={(e) => set("modelo", e.target.value)}
            className="w-full px-3 py-2 bg-jet-900 border border-jet-700 text-white text-sm focus:outline-none focus:border-gold-500"
          >
            {ALLOWED_MODELS.map((m) => (
              <option key={m} value={m}>{modeloLabel(m)}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-jet-400 mb-1.5">
            Slug
          </span>
          <input
            value={post.slug}
            onChange={(e) => { setSlugTouched(true); set("slug", slugify(e.target.value)); }}
            placeholder="slug-de-mi-articulo"
            className="w-full px-3 py-2 bg-jet-900 border border-jet-700 text-white text-sm focus:outline-none focus:border-gold-500"
          />
        </label>

        <label className="block">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-jet-400 mb-1.5">
            Autor
          </span>
          <input
            value={post.author}
            onChange={(e) => set("author", e.target.value)}
            className="w-full px-3 py-2 bg-jet-900 border border-jet-700 text-white text-sm focus:outline-none focus:border-gold-500"
          />
        </label>

        <label className="block">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-jet-400 mb-1.5">
            Fecha
          </span>
          <input
            type="date"
            value={post.date?.slice(0, 10)}
            onChange={(e) => set("date", e.target.value)}
            className="w-full px-3 py-2 bg-jet-900 border border-jet-700 text-white text-sm focus:outline-none focus:border-gold-500"
          />
        </label>

        <label className="block">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-jet-400 mb-1.5">
            Tiempo de lectura
          </span>
          <input
            value={post.readTime}
            onChange={(e) => set("readTime", e.target.value)}
            placeholder="5 min lectura"
            className="w-full px-3 py-2 bg-jet-900 border border-jet-700 text-white text-sm focus:outline-none focus:border-gold-500"
          />
        </label>

        {/* Excerpt - fila completa */}
        <label className="block md:col-span-3">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-jet-400 mb-1.5">
            Resumen (excerpt)
          </span>
          <textarea
            value={post.excerpt}
            onChange={(e) => set("excerpt", e.target.value)}
            maxLength={165}
            rows={2}
            placeholder="Descripción breve que aparece en listados y resultados de búsqueda"
            className="w-full px-3 py-2 bg-jet-900 border border-jet-700 text-white text-sm focus:outline-none focus:border-gold-500 resize-none"
          />
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-jet-500">{post.excerpt.length}/165 caracteres</span>
            {excerptSuggestion && (
              <p className="flex items-start gap-1.5 text-xs text-amber-300">
                <Lightbulb className="w-3.5 h-3.5 mt-0.5 shrink-0" /> {excerptSuggestion}
              </p>
            )}
          </div>
        </label>


        {/* Imagen destacada - fila completa */}
        <div className="md:col-span-3">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-jet-400 mb-1.5">
            Imagen destacada
          </span>
          {post.image && (
            <div className="w-full mb-2 border border-jet-700 overflow-hidden">
              <img
                src={post.image}
                alt="Imagen destacada"
                className="w-full h-48 object-cover"
              />
            </div>
          )}
          <button
            type="button"
            onClick={() => heroFileInput?.click()}
            className="w-full px-3 py-2 bg-jet-900 border border-jet-700 text-jet-300 hover:border-gold-500/50 hover:text-white text-sm transition-colors inline-flex items-center justify-center gap-2"
          >
            <ImagePlus className="w-3.5 h-3.5" />
            {post.image ? "Reemplazar imagen" : "Subir imagen"}
          </button>
          <input
            ref={setHeroFileInput}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleHeroUpload(f); e.target.value = ""; }}
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-wrap gap-4 mb-5">
        <label className="inline-flex items-center gap-2 text-sm text-jet-300 cursor-pointer">
          <input
            type="checkbox"
            checked={!!post.published}
            onChange={(e) => set("published", e.target.checked)}
            className="accent-gold-500"
          />
          Publicado
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-jet-300 cursor-pointer">
          <input
            type="checkbox"
            checked={!!post.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="accent-gold-500"
          />
          Destacado
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-jet-300 cursor-pointer">
          <input
            type="checkbox"
            checked={!!post.isNew}
            onChange={(e) => set("isNew", e.target.checked)}
            className="accent-gold-500"
          />
          Nuevo
        </label>
      </div>

      {/* Editor (fill remaining space) */}
      <div className="flex-1 min-h-0 border border-jet-800/70 bg-jet-900/30 flex flex-col overflow-hidden">
        <div className="px-5 py-3 border-b border-jet-800/40 flex items-center gap-2">
          <FileText className="w-4 h-4 text-gold-500" />
          <span className="text-sm font-mono uppercase tracking-wider text-jet-300">
            Editor de contenido
          </span>
        </div>
        <TiptapEditor
          initialContent={post.content}
          onChange={(html) => set("content", html)}
          modelo={post.modelo}
          slug={post.slug || slugify(post.title)}
        />
      </div>

      <SeoDrawer
        open={showSeo}
        onClose={() => setShowSeo(false)}
        title={post.title}
        keywords={post.keywords || ""}
        excerpt={post.excerpt}
        slug={post.slug || slugify(post.title)}
        modelo={post.modelo}
        content={post.content}
      />

      {/* Botón flotante SEO */}
      <button
        type="button"
        onClick={() => setShowSeo(true)}
        className="fixed right-0 top-1/3 z-40 flex flex-col items-center gap-1 px-2 py-3 bg-jet-900 border border-r-0 border-jet-700 text-jet-200 hover:border-gold-500/50 hover:text-gold-500 transition-colors"
        style={{ writingMode: "vertical-rl" }}
        title="Abrir análisis SEO"
      >
        <Sparkles className="w-4 h-4 rotate-90" />
        <span className="text-[10px] font-mono uppercase tracking-widest">SEO Score · {seoResult.score}</span>
      </button>
    </form>
  );
}
