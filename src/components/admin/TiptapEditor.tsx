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
  AlignLeft, AlignCenter, AlignRight, ImagePlus, Eraser,
} from "lucide-react";
import { processHtml } from "../../lib/html";
import { uploadCmsImage } from "../../api/dashboard";

interface TiptapEditorProps {
  initialContent: string;
  onChange: (html: string) => void;
  modelo: string;
  slug: string;
}

type ToolbarButton = {
  Icon: any;
  action?: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
};

export default function TiptapEditor({ initialContent, onChange, modelo, slug }: TiptapEditorProps) {
  const [showPreview, setShowPreview] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, autolink: true }),
      Placeholder.configure({ placeholder: "Escribe o pega tu contenido aquí… (arrastra imágenes o usa el botón de imagen)" }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: false }),
      Typography,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== initialContent) {
      editor.commands.setContent(initialContent || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialContent]);

  const previewHtml = useMemo(
    () => (editor ? processHtml(editor.getHTML()) : ""),
    [editor?.getHTML(), initialContent]
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
      { Icon: Bold, active: editor.isActive("bold"), action: () => editor.chain().focus().toggleBold().run(), label: "Negrita" },
      { Icon: Italic, active: editor.isActive("italic"), action: () => editor.chain().focus().toggleItalic().run(), label: "Cursiva" },
      { Icon: Strikethrough, active: editor.isActive("strike"), action: () => editor.chain().focus().toggleStrike().run(), label: "Tachado" },
      { Icon: Code, active: editor.isActive("code"), action: () => editor.chain().focus().toggleCode().run(), label: "Código" },
      { Icon: RemoveFormatting, action: () => editor.chain().focus().unsetAllMarks().run(), label: "Limpiar formato" },
    ],
    [
      { Icon: Heading2, active: editor.isActive("heading", { level: 2 }), action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), label: "Subtítulo (H2)" },
      { Icon: Heading3, active: editor.isActive("heading", { level: 3 }), action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), label: "Título (H3)" },
      { Icon: List, active: editor.isActive("bulletList"), action: () => editor.chain().focus().toggleBulletList().run(), label: "Lista" },
      { Icon: ListOrdered, active: editor.isActive("orderedList"), action: () => editor.chain().focus().toggleOrderedList().run(), label: "Lista numerada" },
      { Icon: Quote, active: editor.isActive("blockquote"), action: () => editor.chain().focus().toggleBlockquote().run(), label: "Cita" },
    ],
    [
      { Icon: Link2, active: editor.isActive("link"), action: setLink, label: "Enlace" },
      { Icon: ImagePlus, action: openImageDialog, label: "Insertar imagen" },
      { Icon: AlignLeft, active: editor.isActive({ textAlign: "left" }), action: () => editor.chain().focus().setTextAlign("left").run(), label: "Izquierda" },
      { Icon: AlignCenter, active: editor.isActive({ textAlign: "center" }), action: () => editor.chain().focus().setTextAlign("center").run(), label: "Centro" },
      { Icon: AlignRight, active: editor.isActive({ textAlign: "right" }), action: () => editor.chain().focus().setTextAlign("right").run(), label: "Derecha" },
      { Icon: Eraser, active: editor.isActive("highlight"), action: () => editor.chain().focus().toggleHighlight().run(), label: "Resaltar" },
    ],
  ];

  return (
    <div className="flex flex-col min-h-0 flex-1">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-jet-800/70 p-2 bg-jet-900/40">
        {buttons().map((group, gi) => (
          <div key={gi} className="flex items-center gap-1 mr-1">
            {group.map((b, bi) => (
              <button
                key={`${gi}-${bi}`}
                type="button"
                title={b.label}
                disabled={b.disabled}
                onClick={b.action}
                className={`p-1.5 rounded transition-colors ${
                  b.active
                    ? "bg-gold-500 text-black"
                    : "text-jet-300 hover:text-white hover:bg-jet-800 disabled:opacity-30"
                }`}
              >
                <b.Icon className="w-4 h-4" />
              </button>
            ))}
            {gi < buttons().length - 1 && <span className="w-px h-5 bg-jet-800 mx-1" />}
          </div>
        ))}
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPreview((s) => !s)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono uppercase tracking-wider border transition-colors ${
              showPreview
                ? "border-gold-500/60 text-gold-500"
                : "border-jet-700 text-jet-300 hover:border-gold-500/50"
            }`}
          >
            Vista previa
          </button>
        </div>
      </div>

      {/* Editor + Preview split */}
      <div className="flex flex-1 min-h-0">
        <div className={`flex-1 min-w-0 overflow-y-auto ${showPreview ? "border-r border-jet-800/70" : ""}`}>
          <div className="max-w-none p-6">
            <EditorContent editor={editor} className="tiptap-editor" />
          </div>
        </div>

        {showPreview && (
          <div className="flex-1 min-w-0 overflow-y-auto bg-jet-950/60">
            <div className="p-6">
              <p className="text-[10px] font-mono uppercase tracking-widest text-jet-500 mb-4 border-b border-jet-800/70 pb-2">
                Vista previa
              </p>
              <div
                className="prose prose-invert prose-gold max-w-none
                  prose-headings:font-display prose-headings:text-white
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
                  prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
                  prose-p:text-jet-300 prose-p:font-light prose-p:leading-relaxed
                  prose-li:text-jet-300 prose-li:font-light
                  prose-strong:text-white
                  prose-a:text-gold-500 prose-a:no-underline hover:prose-a:underline
                  prose-img:rounded prose-img:border prose-img:border-jet-800"
                dangerouslySetInnerHTML={{ __html: previewHtml }}
              />
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
    </div>
  );
}
