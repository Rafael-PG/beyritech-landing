import { Link } from "react-router-dom";
import { MessageSquare, Compass, ShieldCheck, Truck, KeyRound, Handshake } from "lucide-react";
import SEO from "../components/SEO";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Contacto y Alcance",
    description: "Cuéntenos sobre su proyecto. Un ingeniero consultor recopila los requerimientos técnicos: sector, área, ubicación, condiciones climáticas y plazo objetivo.",
    detail: "Respuesta en 24-48 horas con propuesta preliminar.",
  },
  {
    icon: Compass,
    number: "02",
    title: "Diseño y Propuesta",
    description: "Nuestro equipo de ingeniería diseña la configuración óptima: selección de modelo, cálculo estructural, distribución interior y especificaciones técnicas.",
    detail: "Incluye plano de distribución y memoria técnica.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Control de Calidad",
    description: "Inspección dimensional, pruebas de estanqueidad, verificación de aislamiento y revisión de acabados. Cada módulo cumple con las especificaciones aprobadas.",
    detail: "Reporte fotográfico de cada etapa.",
  },
  {
    icon: Truck,
    number: "04",
    title: "Logística y Transporte",
    description: "Coordinamos el transporte terrestre, marítimo o fluvial según la ubicación. Módulos plegados para maximizar la eficiencia del flete.",
    detail: "Hasta 12 módulos por camión (según modelo).",
  },
  {
    icon: KeyRound,
    number: "05",
    title: "Montaje y Entrega",
    description: "Nuestro equipo de montaje viaja al sitio para instalar, conectar y poner en marcha los módulos. Espacio operativo en semanas, no en meses.",
    detail: "Capacitación al personal incluida.",
  },
  {
    icon: Handshake,
    number: "06",
    title: "Acompañamiento en Campo",
    description: "Tras la entrega, nuestro equipo técnico acompaña la operación en sitio: supervisión de uso, ajustes finos y soporte a las instalaciones mientras el proyecto se pone en marcha.",
    detail: "Soporte técnico en campo y canal directo con el equipo de planta.",
  },
];

export default function Proceso() {
  return (
    <section className="min-h-screen bg-jet-950 text-white pt-28 pb-20">
      <SEO
        title="Cómo Trabajamos — Proceso de 6 Pasos"
        description="Proceso claro de 6 pasos: contacto, diseño, control de calidad, logística, montaje y acompañamiento en campo. Sin imprevistos, sin sobrecostos."
        url="/proceso"
        structuredData={{ "@context": "https://schema.org", "@type": "HowTo", name: "Proceso Beyritech", description: "De la consulta al espacio operativo en 6 pasos", step: steps.map((s) => ({ "@type": "HowToStep", name: s.title, text: s.description })) }}
      />
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
            Cómo trabajamos
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-3 tracking-tight">
            De la consulta al espacio operativo
          </h1>
          <div className="w-16 h-[2px] bg-gold-500 mt-6" />
          <p className="text-jet-300 mt-4 max-w-2xl font-light leading-relaxed">
            Un proceso claro de 6 pasos. Sin imprevistos, sin sobrecostos.
            Cada etapa tiene un responsable y un plazo definido.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-jet-900 border border-jet-800 rounded p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start hover:border-gold-500/30 transition-colors"
            >
              <div className="shrink-0 flex items-center gap-4">
                <div className="w-14 h-14 rounded bg-gold-500/10 border border-gold-500/20 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-gold-500" />
                </div>
                <span className="text-3xl font-display font-bold text-jet-800 sm:hidden">{step.number}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-display font-bold text-jet-700 hidden sm:block">{step.number}</span>
                  <h2 className="font-display text-xl font-bold text-white">{step.title}</h2>
                </div>
                <p className="text-jet-300 font-light leading-relaxed mb-2">{step.description}</p>
                <p className="text-xs font-mono text-gold-500 uppercase tracking-wider">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-jet-900 border border-jet-800 rounded p-10">
          <h3 className="font-display text-xl font-bold text-white mb-3">¿Listo para comenzar?</h3>
          <p className="text-jet-300 font-light mb-6 max-w-lg mx-auto">
            Cuéntenos sobre su proyecto y reciba una propuesta técnica a la brevedad.
          </p>
          <Link to="/contacto" className="inline-flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-sm rounded transition-colors">
            Solicitar cotización
          </Link>
        </div>
      </div>
    </section>
  );
}
