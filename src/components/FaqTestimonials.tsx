import { useState } from "react";
import { FAQItem } from "../types";
import { ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";

const faqs: FAQItem[] = [
  {
    category: "Estructural",
    question: "¿Cuál es la vida útil de los módulos?",
    answer: "Nuestros módulos están construidos con perfiles de acero pesado galvanizado y protección anticorrosión multicapa, diseñados para larga vida útil bajo mantenimiento preventivo estándar."
  },
  {
    category: "Logística",
    question: "¿Los módulos son reubicables?",
    answer: "Sí. El módulo puede ser desarmado, cargado en fletes intermodales estándar e instalado en un nuevo emplazamiento con alta recuperación de los componentes originales. El módulo es un activo, no un gasto."
  },
  {
    category: "Térmica",
    question: "¿Cómo se comporta el aislamiento en temperaturas extremas?",
    answer: "Utilizamos núcleos de poliisocianurato (PIR) de alta densidad en muros y techos, logrando un alto nivel de aislamiento térmico. Esto reduce significativamente el consumo energético tanto en climas fríos como cálidos."
  },
  {
    category: "Tiempos",
    question: "¿Cuánto tiempo toma la instalación?",
    answer: "Dependiendo del alcance, entregamos módulos operativos en 4 a 8 semanas desde la confirmación del pedido. El montaje en sitio toma entre 3 y 14 días según la cantidad de módulos."
  },
  {
    category: "Normativa",
    question: "¿Cumplen con normativas sanitarias y laborales?",
    answer: "Totalmente. Cumplimos con la legislación laboral internacional (habitabilidad, espacios mínimos, aislación acústica) e higiénico-sanitarios para clínicas, casinos y laboratorios."
  },
  {
    category: "Presupuesto",
    question: "¿Qué incluye el precio del módulo?",
    answer: "El precio incluye estructura, aislamiento, revestimiento interior/exterior, instalación eléctrica preinstalada y ventanas. No incluye cimentación, conexiones a servicios públicos ni acabados interiores adicionales según configuración."
  },
  {
    category: "Terreno",
    question: "¿Qué necesita mi terreno para instalar un módulo?",
    answer: "Un terreno nivelado con acceso para camión de carga. No requiere cimentación profunda — se pueden usar zapatas aisladas o una losa ligera. Le proporcionamos las especificaciones exactas según el modelo elegido."
  },
  {
    category: "Cobertura",
    question: "¿En qué zonas del Perú instalan?",
    answer: "Operamos en todo el Perú. Hemos ejecutado proyectos en costa, sierra y selva. La logística de transporte se adapta a la ubicación del proyecto, incluyendo zonas remotas de acceso restringido."
  }
];

export default function FaqTestimonials() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-jet-900 text-white relative [content-visibility:auto] [contain-intrinsic-size:600px]">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
            Preguntas Frecuentes
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
            Respuestas Directas
          </h2>
          <p className="text-jet-300 mt-4 font-sans text-base font-light">
            Respuestas de ingeniería para directores, constructores y compradores corporativos.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <article
                key={idx}
                className="bg-jet-950 border border-jet-800 rounded overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-jet-950/80 transition-colors"
                >
                  <div className="flex gap-3 items-center">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-jet-900 border border-jet-800 text-gold-500 rounded uppercase">
                      {faq.category}
                    </span>
                    <span className="font-display font-bold text-sm sm:text-base text-white hover:text-gold-500 transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gold-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-jet-300 shrink-0" />
                  )}
                </button>

                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="border-t border-jet-900 p-6 text-sm text-jet-300 font-light leading-relaxed bg-jet-950/40 flex gap-3">
                      <ShieldCheck className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
