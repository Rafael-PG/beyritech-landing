import { useState, type FormEvent } from "react";
import { Send, MessageCircle } from "lucide-react";
import Modal from "./Modal";
import { catalog } from "../../data/modelos";
import { whatsappLink } from "../../data/empresa";
import { trackWhatsAppLead } from "../../api/tracking";

interface WhatsAppModalProps {
  open: boolean;
  onClose: () => void;
  onSkip: () => void;
}

const DEFAULT_MESSAGE = "";

export default function WhatsAppModal({ open, onClose, onSkip }: WhatsAppModalProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSelected(null);
      setMessage(DEFAULT_MESSAGE);
      setError(null);
      setSubmitting(false);
    }, 300);
  };

  const buildMessage = (modelName: string) => {
    const intro = `Hola, me interesa el ${modelName}.`;
    const extra = message.trim();
    return extra ? `${intro} ${extra}` : intro;
  };

  const submit = async (modelName: string) => {
    setSubmitting(true);
    await trackWhatsAppLead(modelName, buildMessage(modelName));
    setSubmitting(false);
    window.open(whatsappLink(buildMessage(modelName)), "_blank", "noopener,noreferrer");
    handleClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selected) {
      setError("Seleccione un modelo para continuar.");
      return;
    }
    setError(null);
    const model = catalog.find((m) => m.slug === selected);
    if (model) submit(model.name);
  };

  const skip = () => {
    onSkip();
    handleClose();
  };

  const models = catalog.map((m) => ({
    slug: m.slug,
    name: m.name.replace("Módulo Plegable ", ""),
  }));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Escríbenos"
      kicker="WHATSAPP"
    >
      <p className="text-sm text-jet-300 font-light mb-5 leading-relaxed">
        Elija el modelo de su interés y envíenos su mensaje. Lo contactamos a la brevedad.
      </p>

      <form onSubmit={handleSubmit}>
        <label className="block text-[11px] font-mono uppercase tracking-wider text-gold-500 mb-2">
          Modelo de interés *
        </label>
        <div className="grid grid-cols-3 gap-2">
          {models.map((m) => {
            const active = selected === m.slug;
            return (
              <button
                key={m.slug}
                type="button"
                onClick={() => {
                  setSelected(m.slug);
                  setError(null);
                }}
                className={`px-2 py-3 text-center border text-[11px] font-mono uppercase tracking-wide rounded transition-colors ${
                  active
                    ? "border-gold-500 bg-gold-500/10 text-gold-500"
                    : "border-jet-700 text-jet-300 hover:border-gold-500/50"
                }`}
              >
                {m.name}
              </button>
            );
          })}
        </div>

        {error && <p className="text-xs text-[#e46d63] mt-2">{error}</p>}

        <label className="block text-[11px] font-mono uppercase tracking-wider text-gold-500 mt-5 mb-2">
          Mensaje
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="Cuéntenos sobre su proyecto..."
          className="w-full px-4 py-3 bg-jet-950 border border-jet-700 text-white text-sm font-light focus:outline-none focus:border-gold-500 transition-colors resize-none"
        />

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 w-full px-6 py-3 bg-gold-500 hover:bg-gold-600 disabled:opacity-60 text-black font-bold uppercase tracking-wider text-xs rounded flex items-center justify-center gap-2 transition-colors"
        >
          <Send className="w-4 h-4" />
          {submitting ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>

      <button
        type="button"
        onClick={skip}
        className="mt-4 w-full text-center text-xs text-jet-400 hover:text-white transition-colors inline-flex items-center justify-center gap-1.5"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        Continuar sin escribir
      </button>
    </Modal>
  );
}
