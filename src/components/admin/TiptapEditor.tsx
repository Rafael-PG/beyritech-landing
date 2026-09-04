import { useEffect, useMemo, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import {
  Bold, Italic, Strikethrough, Code, Heading2, Heading3, List,
  ListOrdered, Quote, Undo, Redo, Link2, RemoveFormatting,
  AlignLeft, AlignCenter, AlignRight, ImagePlus, Eraser, Eye,
  Sparkles, ShieldCheck, Award, ImageIcon, ArrowLeft, ChevronRight,
  User, Calendar, Clock, Box, Maximize2
} from "lucide-react";
import { processHtml } from "../../lib/html";
import { uploadCmsImage } from "../../api/dashboard";
import { modeloName } from "../../lib/modelosMeta";
import FullPreviewModal from "./FullPreviewModal";

interface TiptapEditorProps {
  initialContent: string;
  onChange: (html: string) => void;
  modelo: string;
  slug: string;
  title?: string;
  excerpt?: string;
  image?: string | null;
  author?: string;
  date?: string;
  readTime?: string;
  isNew?: boolean | number;
  featured?: boolean | number;
  kind?: "blog" | "casos";
}

type ToolbarButton = {
  Icon: any;
  action?: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  badge?: string;
};

export default function TiptapEditor({
  initialContent,
  onChange,
  modelo,
  slug,
  title,
  excerpt,
  image,
  author,
  date,
  readTime,
  isNew,
  featured,
  kind = "casos",
}: TiptapEditorProps) {
  const [showPreview, setShowPreview] = useState(true);
  const [showFullModal, setShowFullModal] = useState(false);
  const [liveHtml, setLiveHtml] = useState(initialContent || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: "Escribe tu contenido aquí… Selecciona texto y haz clic en 'H2' para crear subtítulos con línea de oro." }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: false }),
      Typography,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setLiveHtml(html);
      onChange(html);
    },
  });

  // Only synchronize when content changes from outside (e.g. post loaded, not while typing)
  useEffect(() => {
    if (editor && !editor.isFocused && initialContent !== liveHtml) {
      editor.commands.setContent(initialContent || "");
      setLiveHtml(initialContent || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialContent, editor]);

  // Live processed preview updated synchronously on every keystroke
  const previewHtml = useMemo(
    () => processHtml(liveHtml),
    [liveHtml]
  );

  const setLink = () => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL del enlace", previous || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const openImageDialog = () => fileInputRef.current?.click();

  const handleImageFile = async (file: File) => {
    if (!editor || !file) return;
    const url = await uploadCmsImage(file, modelo, slug);
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result as string }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  if (!editor) return null;

  const buttons = (): ToolbarButton[][] => [
    [
      { Icon: Undo, action: () => editor.chain().focus().undo().run(), disabled: !editor.can().undo(), label: "Deshacer" },
      { Icon: Redo, action: () => editor.chain().focus().redo().run(), disabled: !editor.can().redo(), label: "Rehacer" },
    ],
    [
      { Icon: Heading2, active: editor.isActive("heading", { level: 2 }), action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), label: "Subtítulo Principal (H2)", badge: "H2" },
      { Icon: Heading3, active: editor.isActive("heading", { level: 3 }), action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), label: "Título Secundario (H3)", badge: "H3" },
    ],
    [
      { Icon: Bold, active: editor.isActive("bold"), action: () => editor.chain().focus().toggleBold().run(), label: "Negrita" },
      { Icon: Italic, active: editor.isActive("italic"), action: () => editor.chain().focus().toggleItalic().run(), label: "Cursiva" },
      { Icon: Strikethrough, active: editor.isActive("strike"), action: () => editor.chain().focus().toggleStrike().run(), label: "Tachado" },
      { Icon: Code, active: editor.isActive("code"), action: () => editor.chain().focus().toggleCode().run(), label: "Código" },
      { Icon: RemoveFormatting, action: () => editor.chain().focus().unsetAllMarks().run(), label: "Limpiar formato" },
    ],
    [
      { Icon: List, active: editor.isActive("bulletList"), action: () => editor.chain().focus().toggleBulletList().run(), label: "Lista con viñetas" },
      { Icon: ListOrdered, active: editor.isActive("orderedList"), action: () => editor.chain().focus().toggleOrderedList().run(), label: "Lista numerada" },
      { Icon: Quote, active: editor.isActive("blockquote"), action: () => editor.chain().focus().toggleBlockquote().run(), label: "Cita destacada" },
    ],
    [
      { Icon: Link2, active: editor.isActive("link"), action: setLink, label: "Enlace" },
      { Icon: ImagePlus, action: openImageDialog, label: "Insertar imagen (WebP automática)" },
      { Icon: AlignLeft, active: editor.isActive({ textAlign: "left" }), action: () => editor.chain().focus().setTextAlign("left").run(), label: "Alinear izquierda" },
      { Icon: AlignCenter, active: editor.isActive({ textAlign: "center" }), action: () => editor.chain().focus().setTextAlign("center").run(), label: "Centrar" },
      { Icon: AlignRight, active: editor.isActive({ textAlign: "right" }), action: () => editor.chain().focus().setTextAlign("right").run(), label: "Alinear derecha" },
      { Icon: Eraser, active: editor.isActive("highlight"), action: () => editor.chain().focus().toggleHighlight().run(), label: "Resaltar" },
    ],
  ];

  const formattedDate = useMemo(() => {
    try {
      const d = date ? new Date(date) : new Date();
      return d.toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });
    } catch {
      return "Fecha de publicación";
    }
  }, [date]);

  return (
    <div className="flex flex-col min-h-0 flex-1">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-jet-800/80 px-3 py-2 bg-jet-950/80 sticky top-0 z-20">
        {buttons().map((group, gi) => (
          <div key={gi} className="flex items-center gap-1 mr-1.5">
            {group.map((b, bi) => (
              <button
                key={`${gi}-${bi}`}
                type="button"
                title={b.label}
                disabled={b.disabled}
                onClick={b.action}
                className={`relative px-2 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1 ${
                  b.active
                    ? "bg-gold-500 text-black font-bold shadow-[0_0_10px_rgba(254,201,52,0.3)]"
                    : "text-jet-300 hover:text-white hover:bg-jet-800/80 border border-transparent hover:border-jet-700 disabled:opacity-30"
                }`}
              >
                <b.Icon className="w-3.5 h-3.5" />
                {b.badge && <span className="text-[10px] font-bold">{b.badge}</span>}
              </button>
            ))}
            {gi < buttons().length - 1 && <span className="w-px h-5 bg-jet-800/80 mx-1" />}
          </div>
        ))}

        <div className="flex-1" />

        {/* Toggle Vista Previa y Vista Completa */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreview((s) => !s)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider border rounded transition-all ${
              showPreview
                ? "bg-gold-500/10 border-gold-500/60 text-gold-500 font-bold shadow-sm"
                : "border-jet-700 text-jet-300 hover:border-gold-500/50 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {showPreview ? "Ocultar Split" : "Ver Split"}
          </button>

          <button
            type="button"
            onClick={() => setShowFullModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded transition-all bg-gold-500 hover:bg-gold-600 text-black font-bold shadow-[0_0_12px_rgba(254,201,52,0.25)] hover:scale-[1.02] active:scale-[0.98]"
            title="Abrir vista previa completa en pantalla completa"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Preview Completo
          </button>
        </div>
      </div>

      {/* Editor + Live Preview Split */}
      <div className="flex flex-1 min-h-0">
        {/* Panel Izquierdo: Editor Tiptap con tipografía idéntica */}
        <div className={`flex-1 min-w-0 overflow-y-auto ${showPreview ? "border-r border-jet-800/80" : ""} bg-jet-950/40`}>
          <div className="p-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-jet-800/60">
              <span className="text-[10px] font-mono uppercase tracking-widest text-jet-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gold-500/60" />
                Área de Redacción
              </span>
              <span className="text-[10px] font-mono text-jet-500">
                Usa <strong className="text-gold-500 font-mono">H2</strong> para subtítulos con línea dorada
              </span>
            </div>
            <EditorContent editor={editor} className="tiptap-editor" />
          </div>
        </div>

        {/* Panel Derecho: Vista previa idéntica a la página web en tiempo real */}
        {showPreview && (
          <div className="flex-1 min-w-0 overflow-y-auto bg-jet-950 relative">
            {/* Sutil overlay de cuadros como en la web real */}
            <div className="absolute inset-0 gold-grid-overlay opacity-25 pointer-events-none" />

            <div className="p-6 lg:p-8 max-w-3xl mx-auto relative z-10">
              {/* Header de la Vista Previa */}
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-jet-800/80">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500 flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Vista Previa Editorial en Vivo
                </span>
                <span className="text-[10px] font-mono text-jet-400 bg-jet-900 border border-jet-800 px-2 py-0.5 rounded">
                  Renderizado Web
                </span>
              </div>

              {/* ─── HERO REPLICA 1:1 EN VISTA PREVIA (Idéntico a la web) ─── */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-jet-800 shadow-2xl mb-8 min-h-[360px] sm:min-h-[420px] flex flex-col justify-end bg-jet-950 group">
                {image ? (
                  <img
                    src={image}
                    alt={title || "Hero"}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ objectPosition: "center 35%" }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-jet-950 via-jet-900 to-jet-950">
                    <div className="absolute inset-0 gold-grid-overlay opacity-50" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(254,201,52,0.12),transparent_70%)]" />
                  </div>
                )}

                {/* Gradientes de superposición idénticos a la página final */}
                <div className="absolute inset-0 bg-gradient-to-t from-jet-950 via-jet-950/70 to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-r from-jet-950/80 via-transparent to-transparent" />
                <div className="absolute inset-0 gold-grid-overlay opacity-25 pointer-events-none" />

                {/* Contenido sobre la imagen */}
                <div className="relative z-20 p-6 sm:p-8">
                  {/* Breadcrumbs */}
                  <div className="flex items-center gap-1.5 text-xs font-mono text-jet-300 mb-3.5 font-medium flex-wrap">
                    <span className="text-jet-400 flex items-center gap-1">
                      <ArrowLeft className="w-3.5 h-3.5" />
                      {kind === "blog" ? "Blog" : "Casos de éxito"}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-jet-600" />
                    <span className="uppercase tracking-wider text-gold-500 font-semibold">
                      {modeloName(modelo || "multispace")}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-jet-600" />
                    <span className="text-jet-400 truncate max-w-[180px] sm:max-w-xs">
                      {title || "Título del proyecto..."}
                    </span>
                  </div>

                  {/* Badges de Categoría */}
                  <div className="flex items-center gap-2 mb-3.5 flex-wrap">
                    {kind === "blog" ? (
                      <span className="bg-gold-500 text-black text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                        <Box className="w-3 h-3" />
                        Artículo Técnico
                      </span>
                    ) : (
                      <span className="bg-gold-500 text-black text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Caso Real Auditado
                      </span>
                    )}

                    <span className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
                      {modeloName(modelo || "multispace")}
                    </span>

                    {isNew ? (
                      <span className="bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                        {kind === "blog" ? "Nuevo" : "Reciente"}
                      </span>
                    ) : null}

                    {featured ? (
                      <span className="bg-gold-500/20 backdrop-blur-md border border-gold-500/40 text-gold-400 text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                        Destacado
                      </span>
                    ) : null}
                  </div>

                  {/* Título Principal (H1) idéntico a la web */}
                  <h1 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight mb-4 max-w-3xl">
                    {title ? title : <span className="text-jet-400 italic font-normal">Título de la publicación...</span>}
                  </h1>

                  {/* Metadatos: Autor, Fecha, Tiempo */}
                  <div className="flex flex-wrap items-center gap-3.5 text-xs font-mono text-jet-300">
                    <span className="flex items-center gap-1 text-white">
                      <User className="w-3.5 h-3.5 text-gold-500" />
                      <strong>{author || "Beyritech"}</strong>
                    </span>
                    <span className="text-jet-600">·</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gold-500" />
                      {formattedDate}
                    </span>
                    <span className="text-jet-600">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold-500" />
                      {readTime || "5 min lectura"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Indicador sutil si no hay imagen destacada aún */}
              {!image && (
                <div className="relative w-full py-4 rounded-xl overflow-hidden mb-6 border border-dashed border-jet-800/80 bg-jet-900/20 flex items-center justify-center gap-2 text-center text-jet-500 font-mono text-xs">
                  <ImageIcon className="w-4 h-4 text-jet-600" />
                  <span>Sin imagen destacada asignada (sube una arriba para verla en el Hero)</span>
                </div>
              )}

              {/* Caja de Extracto con Borde Dorado Izquierdo (Diseño oficial de la web) */}
              {excerpt ? (
                <div className="border-l-4 border-gold-500 bg-jet-900/70 p-5 rounded-r-xl my-6 border-y border-r border-jet-800/80 shadow-md">
                  <p className="text-sm sm:text-base text-jet-100 italic font-light leading-relaxed">
                    "{excerpt}"
                  </p>
                </div>
              ) : null}

              {/* Cuerpo del Artículo / Caso de Estudio */}
              <div className="mt-6 pt-4 border-t border-jet-800/60">
                {previewHtml && previewHtml.trim() ? (
                  <div
                    className="prose max-w-none text-jet-200"
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                ) : (
                  <div className="py-12 text-center text-jet-500 font-light text-sm border border-dashed border-jet-800 rounded-lg p-6">
                    <Sparkles className="w-6 h-6 text-gold-500/40 mx-auto mb-2" />
                    Empieza a escribir en el editor izquierdo para visualizar el formato en tiempo real...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleImageFile(f);
          e.target.value = "";
        }}
      />

      <FullPreviewModal
        open={showFullModal}
        onClose={() => setShowFullModal(false)}
        title={title || ""}
        excerpt={excerpt || ""}
        content={liveHtml}
        image={image}
        modelo={modelo}
        author={author}
        date={date}
        readTime={readTime}
        isNew={isNew}
        featured={featured}
        kind={kind}
      />
    </div>
  );
}

