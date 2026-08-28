import { MessageCircle } from "lucide-react";
import { whatsappLink } from "../data/empresa";

const MESSAGE = "Hola, me interesa solicitar información sobre sus módulos multipropósitos.";

export default function WhatsAppButton() {
  const href = whatsappLink(MESSAGE);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-600 hover:bg-green-500 flex items-center justify-center shadow-lg shadow-green-600/30 transition-all duration-300 hover:scale-110"
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </a>
  );
}
