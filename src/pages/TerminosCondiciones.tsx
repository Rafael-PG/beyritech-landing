import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function TerminosCondiciones() {
  const today = new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });

  return (
    <section className="min-h-screen bg-jet-950 text-white pt-28 pb-20">
      <SEO
        title="Términos y Condiciones"
        description="Condiciones de uso del sitio web, información de productos, cotizaciones, propiedad intelectual y ley aplicable."
        url="/terminos-y-condiciones"
        noindex={true}
      />
      <div className="max-w-3xl mx-auto px-6">
        <nav className="mb-8 text-xs font-mono text-jet-400">
          <Link to="/" className="hover:text-gold-500 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-jet-200">Términos y Condiciones</span>
        </nav>

        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-8">Términos y Condiciones</h1>
        <div className="w-16 h-[2px] bg-gold-500 mb-10" />

        <div className="space-y-8 text-jet-300 font-light leading-relaxed">
          <p><strong className="text-white">Fecha de última actualización:</strong> {today}</p>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">1. Información general</h2>
            <p>Este sitio web es operado por Beyritech Modular Systems S.A.C., con domicilio en Av. Santa Elvira Mza. B Lote 8, Los Olivos, Lima, Perú. Al acceder y utilizar este sitio web, usted acepta estos términos y condiciones en su totalidad.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">2. Información de productos</h2>
            <p>La información técnica, especificaciones, imágenes y descripciones de productos mostrados en este sitio web son de carácter informativo. Nos reservamos el derecho de modificar especificaciones sin previo aviso. Las cotizaciones tienen una validez de 30 días calendario desde su emisión.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">3. Cotizaciones y pedidos</h2>
            <p>Las cotizaciones presentadas no constituyen un contrato vinculante. Un contrato se formaliza únicamente mediante la firma de un acuerdo comercial específico entre las partes. Los plazos de entrega son estimados y están sujetos a confirmación al momento del pedido.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">4. Propiedad intelectual</h2>
            <p>Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, imágenes, planos, diagramas y software, es propiedad de Beyritech Modular Systems S.A.C. o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual del Perú.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">5. Limitación de responsabilidad</h2>
            <p>Beyritech no será responsable por daños directos, indirectos, incidentales o consecuentes que resulten del uso o incapacidad de uso de este sitio web. La información proporcionada se ofrece "tal cual" sin garantías de ningún tipo.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">6. Enlaces a sitios de terceros</h2>
            <p>Este sitio web puede contener enlaces a sitios web de terceros. Estos enlaces se proporcionan únicamente para su conveniencia. Beyritech no controla ni respalda el contenido de dichos sitios web.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">7. Ley aplicable</h2>
            <p>Estos términos y condiciones se rigen por las leyes de la República del Perú. Cualquier controversia será resuelta por los tribunales competentes de Lima, Perú.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">8. Cambios en estos términos</h2>
            <p>Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios serán publicados en esta página con la fecha de última actualización.</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-jet-800">
          <Link to="/contacto" className="text-gold-500 hover:underline text-sm">¿Preguntas? Contáctenos</Link>
        </div>
      </div>
    </section>
  );
}
