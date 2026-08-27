import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function PoliticaPrivacidad() {
  const today = new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });

  return (
    <section className="min-h-screen bg-jet-950 text-white pt-28 pb-20">
      <SEO
        title="Política de Privacidad — Ley N° 29733"
        description="Protección de datos personales conforme a la legislación peruana. Responsable del tratamiento, derechos del titular y finalidad."
        url="/politica-de-privacidad"
        noindex={true}
      />
      <div className="max-w-3xl mx-auto px-6">
        <nav className="mb-8 text-xs font-mono text-jet-400">
          <Link to="/" className="hover:text-gold-500 transition-colors">Inicio</Link>
          <span className="mx-2">/</span>
          <span className="text-jet-200">Política de Privacidad</span>
        </nav>

        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-8">Política de Privacidad</h1>
        <div className="w-16 h-[2px] bg-gold-500 mb-10" />

        <div className="space-y-8 text-jet-300 font-light leading-relaxed">
          <p><strong className="text-white">Fecha de última actualización:</strong> {today}</p>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">1. Responsable del tratamiento</h2>
            <p>Beyritech Modular Systems S.A.C., con domicilio en Av. Santa Elvira Mza. B Lote 8, Los Olivos, Lima, Perú. Correo electrónico: asistente.comercial@beyritech.com</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">2. Datos que recopilamos</h2>
            <p>A través de nuestros formularios de contacto, recopilamos los siguientes datos personales:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Nombre de empresa o institución</li>
              <li>Sector industrial</li>
              <li>Información sobre el proyecto (área, uso previsto, ubicación)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">3. Finalidad del tratamiento</h2>
            <p>Sus datos personales serán utilizados exclusivamente para:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Responder a su solicitud de información o cotización</li>
              <li>Enviar propuestas técnicas relacionadas con su proyecto</li>
              <li>Comunicaciones comerciales relacionadas con nuestros productos y servicios</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">4. Base legal</h2>
            <p>El tratamiento de sus datos se realiza bajo su consentimiento explícito, otorgado al completar y enviar nuestros formularios de contacto, conforme a la Ley N° 29733 – Ley de Protección de Datos Personales del Perú.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">5. Conservación de datos</h2>
            <p>Sus datos serán conservados mientras mantengamos una relación comercial activa o durante un período máximo de 24 meses desde su última comunicación, después del cual serán eliminados de forma segura.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">6. Sus derechos</h2>
            <p>Usted tiene derecho a:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Acceder a sus datos personales</li>
              <li>Solicitar la rectificación de datos inexactos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al tratamiento de sus datos</li>
              <li>Revocar su consentimiento en cualquier momento</li>
            </ul>
            <p className="mt-2">Para ejercer estos derechos, contáctenos a: asistente.comercial@beyritech.com</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">7. Seguridad</h2>
            <p>Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.</p>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold text-white mb-3">8. Cambios en esta política</h2>
            <p>Nos reservamos el derecho de actualizar esta política de privacidad. Los cambios serán publicados en esta página con la fecha de última actualización.</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-jet-800">
          <Link to="/contacto" className="text-gold-500 hover:underline text-sm">¿Preguntas? Contáctenos</Link>
        </div>
      </div>
    </section>
  );
}
