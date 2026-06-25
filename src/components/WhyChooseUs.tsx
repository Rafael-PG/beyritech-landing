import React from "react";
import { ShieldAlert, Cpu, Layers, HardHat, FileCheck, Anchor } from "lucide-react";
import { motion } from "motion/react";
import ScrollReveal from "../hooks/ScrollReveal";

export default function WhyChooseUs() {
  const highlights = [
    {
      icon: Cpu,
      title: "Ingeniería Volumétrica Escalable",
      desc: "Sistemas de acoplamiento rápido tridimensional que permiten unir módulos de forma lateral, longitudinal y vertical hasta 3 niveles de altura, maximizando la eficiencia de espacio."
    },
    {
      icon: Anchor,
      title: "Resistencia Extrema C5-M",
      desc: "Estructuras de acero de alto límite elástico con protección anticorrosión marina multicapa. Soportan vientos de hasta 180 km/h y cargas de nieve extremas."
    },
    {
      icon: ShieldAlert,
      title: "Aislamiento Ignífugo e Hidrófugo",
      desc: "Materiales certificados Clase 1 contra incendios. Paneles herméticos de núcleo PIR/Lana de roca de alta densidad que bloquean ruidos y humedad ambiental."
    },
    {
      icon: HardHat,
      title: "Homologación Minera y Corporativa",
      desc: "Nuestros módulos cumplen con los exigentes estándares de seguridad laboral (OSHA, HSE) y normativas de habitabilidad para campamentos en alta montaña."
    },
    {
      icon: Layers,
      title: "Acabados de Arquitectura Premium",
      desc: "Combinación de metales industriales pulidos, carpintería de madera termotratada y paneles de vidrio templado panorámico, tal como se aprecia en el diseño de vanguardia de nuestros proyectos."
    },
    {
      icon: FileCheck,
      title: "Certificación Sísmica y Estructural",
      desc: "Diseños calculados por algoritmos estructurales avanzados para zonas de alta sismicidad, garantizando la seguridad ininterrumpida de sus operaciones y su personal."
    }
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-jet-900 text-white relative [content-visibility:auto] [contain-intrinsic-size:600px]">
      <div className="max-w-7xl mx-auto px-6">
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
            Fusionamos la velocidad de la prefabricación automatizada con la sofisticación de la arquitectura de lujo, creando estructuras de resistencia extrema listas para operar de inmediato.
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
                className="group relative p-8 rounded bg-jet-950 border border-jet-800 hover:border-gold-500/40 transition-colors duration-300 shadow-xl hover:shadow-2xl hover:shadow-gold-500/5"
              >
                {/* Accent top bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Icon Container */}
                <div className="w-12 h-12 rounded bg-jet-900 border border-jet-800 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:text-jet-950 transition-all duration-300 mb-6">
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
          <div className="mt-16 bg-gradient-to-r from-jet-950 to-jet-900 rounded border border-jet-800 p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono text-gold-500 uppercase tracking-widest font-semibold block mb-2">
              Líder de Categoría
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2">
              ¿Listo para dar el salto tecnológico a la construcción modular?
            </h3>
            <p className="text-sm text-jet-300 font-light leading-relaxed">
              Deje atrás las demoras climáticas, las fugas de presupuesto y los residuos de obra húmeda. Beyritech ofrece presupuestos cerrados y tiempos de entrega garantizados bajo contrato comercial.
            </p>
          </div>
          <a
            href="#estimator"
            className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-jet-950 text-xs font-mono font-bold tracking-wider uppercase rounded shrink-0 transition-colors duration-200 shadow-md shadow-gold-500/15"
          >
            Obtener Ficha Técnica
          </a>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
