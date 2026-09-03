import { useState, type FormEvent } from "react";
import { Mail, Check, Download, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import Modal from "./Modal";
import { isValidEmail } from "../../lib/validation";
import { trackFichaDownload } from "../../api/tracking";

interface FichaModalProps {
  open: boolean;
  onClose: () => void;
  modelo: { slug: string; name: string };
}

export default function FichaModal({ open, onClose, modelo }: FichaModalProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setEmail("");
      setError(null);
      setLoading(false);
      setDone(false);
    }, 300);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!isValidEmail(value)) {
      setError("Ingrese un correo electrónico válido.");
      return;
    }
    setError(null);
    setLoading(true);
    await trackFichaDownload(value, modelo.slug);

    // Trigger real PDF download
    const pdfUrl = `/fichas/${modelo.slug}.pdf`;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `Ficha-Tecnica-${modelo.name.replace(/\s+/g, "-")}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setLoading(false);
    setDone(true);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Ingresa tu correo para poder descargar la ficha"
      kicker="DESCARGAR FICHA TÉCNICA"
    >
      {done ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-6"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-gold-500/40 text-gold-500 mb-4">
            <Check className="w-6 h-6" />
          </div>
          <p className="font-display text-lg font-bold text-white">¡Descarga lista!</p>
          <p className="text-sm text-jet-300 font-light mt-2">
            La ficha técnica de <strong className="text-white">{modelo.name}</strong> se ha descargado en su dispositivo.
          </p>
          <p className="text-xs text-jet-400 mt-3">
            ¿No inició la descarga automáticamente?{" "}
            <a
              href={`/fichas/${modelo.slug}.pdf`}
              download={`Ficha-Tecnica-${modelo.name.replace(/\s+/g, "-")}.pdf`}
              className="text-gold-500 hover:underline font-medium"
            >
              Clic aquí para descargarla
            </a>
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-6 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-xs rounded transition-colors"
          >
            Cerrar
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <p className="text-sm text-jet-300 font-light mb-5 leading-relaxed">
            Ingresa tu correo electrónico para desbloquear y descargar la ficha técnica de{" "}
            <strong className="text-white">{modelo.name}</strong>.
          </p>

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-jet-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              autoFocus
              className="w-full pl-10 pr-4 py-3 bg-jet-950 border border-jet-700 text-white text-sm font-light focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-[#e46d63] mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full px-6 py-3 bg-gold-500 hover:bg-gold-600 disabled:opacity-60 text-black font-bold uppercase tracking-wider text-xs rounded flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {loading ? "Procesando..." : "Descargar ficha"}
          </button>
        </form>
      )}
    </Modal>
  );
}
