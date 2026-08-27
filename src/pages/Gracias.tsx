import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import SEO from "../components/SEO";

export default function Gracias() {
  return (
    <section className="min-h-screen bg-jet-950 text-white pt-28 pb-20 flex items-center justify-center">
      <SEO title="Solicitud Recibida" noindex={true} />
      <div className="max-w-xl mx-auto px-6 text-center">
        <div className="bg-jet-900 border border-gold-500/30 rounded-lg p-10 sm:p-14 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-gold-500" />
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Solicitud recibida
          </h1>

          <p className="text-jet-300 font-light leading-relaxed mb-8">
            Gracias por su interés en Beyritech. Un ingeniero consultor se comunicará
            a la brevedad al correo o teléfono proporcionado con una propuesta técnica
            detallada.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-xs rounded transition-colors"
            >
              Volver al inicio
            </Link>
            <Link
              to="/modelos"
              className="px-6 py-3 border border-jet-700 hover:border-gold-500 text-white font-medium uppercase tracking-wider text-xs rounded transition-colors"
            >
              Ver modelos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
