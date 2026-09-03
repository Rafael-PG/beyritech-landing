import React from "react";
import { Flame, Maximize, Paintbrush, HardHat, Plug, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import ScrollReveal from "../hooks/ScrollReveal";

export default function WhyChooseUs() {
  const highlights = [
    {
      icon: Maximize,
      title: "Ingeniería Volumétrica Escalable",
      desc: "Sistemas de acoplamiento rápido que permiten unir módulos de forma lateral, longitudinal y vertical hasta 2 niveles de altura, maximizando la eficiencia de espacio."
    },
    {
      icon: ShieldCheck,
      title: "Protección Anticorrosión Industrial",
      desc: "Estructuras de acero con protección anticorrosión multicapa. Diseñado para condiciones extremas de viento y carga."
    },
    {
      icon: Flame,
      title: "Aislamiento Ignífugo e Hidrófugo",
      desc: "Paneles herméticos de núcleo Lana de roca con clasificación ignífuga. Bloquean ruidos y humedad ambiental para entornos exigentes."
    },
    {
      icon: HardHat,
      title: "Diseño para Entornos Exigentes",
      desc: "Nuestros módulos están diseñados para cumplir estándares de seguridad laboral y normativas de habitabilidad en entornos exigentes de costa y sierra."
    },
    {
      icon: Paintbrush,
      title: "Acabados y Revestimientos Duraderos",
      desc: "Estructura de acero galvanizado con recubrimiento electrostático blanco, paneles interiores plastificados lavables, marcos de aluminio y pisos de alta resistencia."
    },
    {
      icon: Plug,
      title: "Sistema eléctrico incluido",
      desc: "Los módulos Beyritech llegan con la instalación eléctrica integrada de fábrica (iluminación LED, tomas de corriente y tablero con protección). Solo conecta la energía y comienza a operar."
    }
  ];

  return (
    <section id="why-choose-us" className="section-texture py-24 bg-jet-950 text-white relative [content-visibility:auto] [contain-intrinsic-size:600px]">
      {/* Grid texture background */}
      <div className="absolute inset-0 gold-grid-overlay" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
            Ingeniería que Trasciende
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
            ¿Por qué elegir <span className="text-gold-500">Beyritech</span>?
          </h2>
          <div className="w-16 h-[2px] bg-gold-500 mx-auto mt-6" />
          <p className="text-jet-200 mt-4 font-sans text-base sm:text-lg font-light leading-relaxed">
            Fusionamos la velocidad de la prefabricación automatizada con la sofisticación de la arquitectura modular, creando Módulos Multipropósito, ideales para minería, corporaciones, clínicas y aulas modulares.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -6 }}
                className="group relative p-8 rounded bg-jet-900 border border-jet-800 hover:border-gold-500/40 transition-colors duration-300 shadow-xl hover:shadow-2xl hover:shadow-gold-500/5"
              >
                {/* Accent top bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Icon Container */}
                <div className="w-12 h-12 rounded bg-jet-950 border border-jet-800 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all duration-300 mb-6">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="font-display text-lg font-bold text-white mb-3 group-hover:text-gold-500 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-jet-300 font-light leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Comparison Banner */}
        <ScrollReveal>
          <div className="mt-16 bg-gradient-to-r from-jet-900 to-jet-950 rounded border border-jet-800 p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-semibold block mb-2">
                Líder de Categoría
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
                ¿Listo para dar el salto tecnológico a la construcción modular?
              </h3>
              <p className="text-sm text-jet-300 font-light leading-relaxed">
                Deje atrás las demoras operativas, las fugas de presupuesto y los residuos de obra húmeda. Beyritech ofrece presupuestos cerrados y tiempos de entrega garantizados bajo contrato comercial.
              </p>
            </div>
            <a
              href="#estimator"
              className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black text-xs font-mono font-bold tracking-wider uppercase rounded shrink-0 transition-colors duration-200 shadow-md shadow-gold-500/15"
            >
              Obtener Ficha Técnica
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
