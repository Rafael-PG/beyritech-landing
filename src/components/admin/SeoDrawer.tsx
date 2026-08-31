import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Search, Eye, Sparkles } from "lucide-react";
import AdminSeoPanel from "./AdminSeoPanel";

interface SeoDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  keywords: string;
  excerpt: string;
  slug: string;
  modelo: string;
  content: string;
}

const SITE_URL = "https://beyritech.com";

export default function SeoDrawer({
  open, onClose, title, keywords,
  excerpt, slug, modelo, content,
}: SeoDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const url = `${SITE_URL}/blog/${modelo}${slug ? "/" + slug : ""}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Panel SEO"
            className="relative w-full max-w-md h-full bg-jet-950 border-l border-jet-800/70 flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          >
            <header className="flex items-center justify-between px-5 h-16 border-b border-jet-800/70 flex-none">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <span className="font-display font-bold text-white">SEO</span>
              </div>
              <button type="button" onClick={onClose} className="text-jet-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Vista previa de Google */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.3, ease: "easeOut" }}
              >
                <p className="text-[10px] font-mono uppercase tracking-widest text-jet-500 mb-3 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" /> Vista previa de Google
                </p>
                <div className="bg-white rounded p-4">
                  <p className="text-xs text-green-700 truncate">{url}</p>
                  <p className="text-lg text-blue-700 leading-tight truncate pt-1">
                    {title || "Sin título"}
                  </p>
                  <p className="text-sm text-gray-600 leading-snug mt-1 line-clamp-2">
                    {excerpt || "Sin descripción."}
                  </p>
                </div>
              </motion.div>

              {/* Análisis en vivo */}
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-jet-500 mb-3 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" /> Análisis en vivo
                </p>
                <AdminSeoPanel title={title} keywords={keywords} excerpt={excerpt} content={content} />
              </div>

            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
