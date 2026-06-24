import React, { useState } from "react";
import { FileSearch, Factory, Box, KeyRound, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Process() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      icon: FileSearch,
      title: "1. Requerimientos y Diseño Modular",
      subtitle: "Ingeniería de Requerimientos a Medida",
      desc: "Analizamos las restricciones climáticas, sísmicas, el tipo de suelo y el uso final del módulo. Generamos planos en 3D con especificación técnica, cálculo estructural optimizado y propuesta de layout interior.",
      details: [
        "Estudio de condiciones de alta montaña o costa (vientos, nieve)",
        "Generación de renders 3D y planos CAD detallados",
        "Presupuesto cerrado sin desviaciones de costes"
      ]
    },
    {
      icon: Factory,
      title: "2. Prefabricación Automatizada Off-site",
      subtitle: "Construcción en Entorno Industrial Controlado",
      desc: "Fabricamos la estructura principal de acero y los paneles autoportantes PIR en nuestra planta robotizada. Se realiza el pre-cableado eléctrico y las instalaciones sanitarias internas bajo estricto control de calidad ISO 9001.",
      details: [
        "Estructura de acero soldada por sistemas robotizados",
        "Control de humedad y temperatura constante para evitar corrosión",
        "Integración de cañerías e instalaciones eléctricas en tabiques"
      ]
    },
    {
      icon: Box,
      title: "3. Logística Intermodal de Carga Segura",
      subtitle: "Transporte Estándar y Coordinado",
      desc: "Optimizamos el embalaje de los módulos para enviarlos como unidades intermodales estándar de 20 o 40 pies. Coordinamos fletes terrestres, fluviales o marítimos directos hacia el emplazamiento de obra sin demoras operativas.",
      details: [
        "Embalaje estanco y asegurado para rutas off-road extremas",
        "Documentación aduanera y permisos de transporte simplificados",
        "Monitoreo satelital GPS de la carga durante todo el trayecto"
      ]
    },
    {
      icon: KeyRound,
      title: "4. Ensamblaje Rápido y Entrega de Llaves",
      subtitle: "Despliegue y Conexión Plug & Play en Obra",
      desc: "En sitio, un equipo certificado de Beyritech posiciona los módulos mediante grúas pesadas. Se acoplan los cierres estructurales, se conectan las redes de servicios principales y se realiza la entrega llave en mano en un lapso de 48 a 72 horas.",
      details: [
        "Izaje seguro guiado por ingenieros especialistas",
        "Unión de redes de agua, alcantarillado, electricidad y datos",
        "Inspección final de habitabilidad y firma de acta de conformidad"
      ]
    }
  ];

  return (
    <section id="process" className="py-24 bg-jet-900 text-white relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
            Flujo de Trabajo Certificado
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
            Proceso de Implementación <span className="text-gold-500">Beyritech</span>
          </h2>
          <div className="w-16 h-[2px] bg-gold-500 mx-auto mt-6" />
          <p className="text-jet-300 mt-4 font-sans text-base sm:text-lg font-light leading-relaxed">
            De la formulación arquitectónica a la puesta en marcha. Descubra cómo reducimos tiempos y costes a través de nuestra metodología de pre-construcción industrial.
          </p>
        </div>

        {/* Process Step Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* List of Steps */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;
              return (
                <motion.button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  className={`text-left p-6 rounded border transition-all duration-300 flex items-start gap-4 ${
                    isSelected
                      ? "bg-jet-950 border-gold-500 shadow-xl shadow-gold-500/5"
                      : "bg-jet-950/40 border-jet-800 hover:border-jet-700 hover:bg-jet-950/60"
                  }`}
                >
                  <motion.div
                    animate={{
                      scale: isSelected ? 1.1 : 1,
                      backgroundColor: isSelected ? "var(--color-gold-500)" : "var(--color-jet-900)",
                    }}
                    className={`w-10 h-10 rounded flex items-center justify-center shrink-0 ${
                      isSelected ? "text-jet-950" : "text-jet-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h3 className={`font-display font-bold text-sm tracking-tight ${isSelected ? "text-gold-500" : "text-white"}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-jet-300 font-light mt-1 line-clamp-1">{step.subtitle}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Deep-dive Interactive Screen */}
          <div className="lg:col-span-7 bg-jet-950 border border-jet-800 rounded p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/5 rounded-full filter blur-2xl" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="space-y-6"
              >
              <div className="flex items-center gap-2 text-xs font-mono text-gold-500 uppercase tracking-widest">
                <span>Fase de Proyecto {activeStep + 1} / 4</span>
                <ChevronRight className="w-3.5 h-3.5" />
                <span>{steps[activeStep].subtitle}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {steps[activeStep].title.split(". ")[1]}
              </h3>

              <p className="font-sans text-base text-jet-200 font-light leading-relaxed">
                {steps[activeStep].desc}
              </p>

              <div className="space-y-3 pt-6 border-t border-jet-800/80">
                <h4 className="font-display text-xs font-bold uppercase tracking-widest text-gold-300">
                  Hitos e Entregables clave:
                </h4>
                <ul className="grid grid-cols-1 gap-2">
                  {steps[activeStep].details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-sm text-jet-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            </AnimatePresence>

            {/* Micro progress indicator */}
            <div className="mt-10 flex items-center justify-between pt-6 border-t border-jet-800/60">
              <span className="text-xs font-mono text-jet-300">
                Método de Producción Industrial Beyritech
              </span>
              <div className="flex gap-1.5">
                {steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeStep === idx ? "w-8 bg-gold-500" : "w-1.5 bg-jet-800"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
