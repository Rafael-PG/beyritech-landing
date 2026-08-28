import { MapPin, Phone, Mail, Building, ShieldCheck, Wrench } from "lucide-react";
import SEO from "../components/SEO";
import { empresa } from "../data/empresa";

export default function Nosotros() {
  return (
    <section className="min-h-screen bg-jet-950 text-white pt-28 pb-20">
      <SEO
        title="Sobre Beyritech — Fabricantes Nacionales"
        description="Empresa peruana dedicada a la fabricación de módulos prefabricados de alta performance. Planta de producción en Lima, entrega en todo Perú y Latinoamérica."
        url="/nosotros"
      />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
            Sobre nosotros
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-3 tracking-tight">
            Beyritech Modular Systems
          </h1>
          <div className="w-16 h-[2px] bg-gold-500 mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Story */}
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-white">
              Fabricantes, no intermediarios
            </h2>
            <p className="text-jet-300 font-light leading-relaxed">
              Beyritech es una empresa peruana dedicada a la fabricación de módulos
              prefabricados de alta performance. Operamos desde nuestra planta de
              producción en Lima, con capacidad de diseñar, fabricar e instalar
              soluciones modulares para sectores agroindustrial, logístico,
              corporativo y de salud.
            </p>
            <p className="text-jet-300 font-light leading-relaxed">
              A diferencia de importadores o intermediarios, controlamos todo el
              proceso: desde el cálculo estructural hasta el montaje en sitio.
              Eso significa tiempos más cortos, precios cerrados y un solo
              responsable de la calidad.
            </p>

            <div className="pt-6 border-t border-jet-800">
              <h3 className="font-display text-lg font-bold text-white mb-4">Datos de la empresa</h3>
              <ul className="space-y-3 text-sm text-jet-300">
                <li className="flex items-start gap-3">
                  <Building className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                  <span>{empresa.nombre}</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                  <span>{empresa.direccionCompleta}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                  <span>{empresa.telefono}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                  <span>{empresa.email}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Capabilities */}
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-6">
                Nuestra planta
              </h2>
              <p className="text-jet-300 font-light leading-relaxed mb-6">
                Contamos con una planta de fabricación equipada para la producción
                de estructuras metálicas, ensamblaje de paneles y control de calidad.
                Cada módulo se fabrica en entorno industrial controlado, lo que
                garantiza precisión y consistencia que la obra húmeda no puede ofrecer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, title: "Control de calidad", desc: "Cada pieza pasa por inspección dimensional y visual antes del ensamblaje." },
                { icon: Wrench, title: "Personalización", desc: "Configuramos cada módulo según el uso final del cliente: dormitorio, oficina, clínica, bodega." },
              ].map((item) => (
                <div key={item.title} className="bg-jet-900 border border-jet-800 p-6 rounded">
                  <item.icon className="w-8 h-8 text-gold-500 mb-3" />
                  <h3 className="font-display font-bold text-white text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-jet-300 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-jet-900 border border-jet-800 p-6 rounded">
              <h3 className="font-display font-bold text-white text-sm mb-3">Cobertura</h3>
              <p className="text-sm text-jet-300 font-light leading-relaxed">
                Entregamos en todo Perú y Latinoamérica. Coordinamos transporte
                terrestre, marítimo y fluvial. Nuestro equipo de montaje viaja
                al sitio para la instalación y puesta en marcha.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
