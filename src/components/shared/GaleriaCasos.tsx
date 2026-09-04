import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export default function GaleriaCasos({ images, title }: { images: string[]; title: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const open = (i: number) => setSelectedIndex(i);
  const close = () => setSelectedIndex(null);

  const prev = useCallback(() => {
    setSelectedIndex((p) => (p !== null ? (p === 0 ? images.length - 1 : p - 1) : null));
  }, [images.length]);

  const next = useCallback(() => {
    setSelectedIndex((p) => (p !== null ? (p === images.length - 1 ? 0 : p + 1) : null));
  }, [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, prev, next]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <motion.div
            key={src + i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group border border-jet-800 hover:border-gold-500/50 transition-colors shadow-lg bg-jet-950"
            onClick={() => open(i)}
          >
            <div className="absolute inset-0 gold-grid-overlay opacity-20 pointer-events-none z-10" />
            <img
              src={src}
              alt={`${title} — imagen ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 relative z-0"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors z-20 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="p-2.5 rounded-full bg-black/70 backdrop-blur-md text-gold-500 border border-gold-500/40">
                <Maximize2 className="w-4 h-4" />
              </span>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-jet-300 border border-white/10 z-20">
              #{i + 1}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={close}
          >
            {/* Botón Cerrar */}
            <button
              onClick={close}
              className="absolute top-5 right-5 text-white/70 hover:text-gold-500 p-2.5 rounded-full bg-jet-900/80 border border-jet-700 hover:border-gold-500/50 z-30 transition-colors cursor-pointer"
              aria-label="Cerrar vista previa"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Flecha Izquierda */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 sm:left-8 text-white/70 hover:text-gold-500 p-3 rounded-full bg-jet-900/80 border border-jet-700 hover:border-gold-500/50 z-30 transition-colors cursor-pointer"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Imagen Principal en Modal */}
            <div className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={images[selectedIndex]}
                alt={`${title} — imagen ${selectedIndex + 1}`}
                className="max-w-[90vw] max-h-[82vh] object-contain rounded-lg border border-gold-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              />
            </div>

            {/* Flecha Derecha */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 sm:right-8 text-white/70 hover:text-gold-500 p-3 rounded-full bg-jet-900/80 border border-jet-700 hover:border-gold-500/50 z-30 transition-colors cursor-pointer"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicador de posición */}
            <div className="absolute bottom-6 text-center z-30">
              <span className="bg-jet-900/90 text-gold-500 border border-gold-500/30 px-4 py-1.5 rounded-full text-xs font-mono font-medium shadow-md">
                {selectedIndex + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
