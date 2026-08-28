import React, { useState, useEffect } from "react";
import { Leaf, Sun, Zap, Clock, Truck, ChevronRight, Scale, Snowflake, Wind } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "../hooks/ScrollReveal";

export default function SpeedSustainabilityLogistics() {
  const [activeTab, setActiveTab] = useState<"sustainability" | "speed" | "logistics">("sustainability");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "sustainability" || hash === "speed" || hash === "logistics") {
      setActiveTab(hash);
    }
  }, []);

  return (
    <section id="speed-sustainability-logistics" className="py-24 bg-[#090a0a] text-white relative [content-visibility:auto] [contain-intrinsic-size:600px]">
      {/* Grid texture background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FEC93406_1px,transparent_1px),linear-gradient(to_bottom,#FEC93406_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
            Pilares Estratégicos
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
            Eficiencia, Velocidad y Alcance
          </h2>
          <p className="text-jet-300 mt-4 font-sans text-base font-light leading-relaxed">
            Nuestros módulos multipropósito redefinen el rendimiento del proyecto a través de tres dimensiones críticas para la toma de decisiones ejecutivas.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-16 border-b border-jet-800 pb-1 max-w-xl mx-auto">
          <button
            onClick={() => setActiveTab("sustainability")}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider transition-all duration-200 border-b-2 ${
              activeTab === "sustainability"
                ? "border-gold-500 text-gold-500 font-bold"
                : "border-transparent text-jet-300 hover:text-white"
            }`}
          >
            <Leaf className="w-4 h-4" />
            Sostenibilidad
          </button>
          <button
            onClick={() => setActiveTab("speed")}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider transition-all duration-200 border-b-2 ${
              activeTab === "speed"
                ? "border-gold-500 text-gold-500 font-bold"
                : "border-transparent text-jet-300 hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" />
            Velocidad
          </button>
          <button
            onClick={() => setActiveTab("logistics")}
            className={`flex items-center gap-2 px-5 py-3 text-xs font-mono uppercase tracking-wider transition-all duration-200 border-b-2 ${
              activeTab === "logistics"
                ? "border-gold-500 text-gold-500 font-bold"
                : "border-transparent text-jet-300 hover:text-white"
            }`}
          >
            <Truck className="w-4 h-4" />
            Logística Global
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="min-h-[450px]">
          <AnimatePresence mode="wait">
          {/* TAB 1: SUSTAINABILITY */}
          {activeTab === "sustainability" && (
            <motion.div
              key="sustainability"
              id="sustainability"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <ScrollReveal direction="left" className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded text-gold-500 text-xs font-mono">
                  <Leaf className="w-3.5 h-3.5" />
                  Eco-Ingeniería Responsable
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  Sostenibilidad de Vanguardia y Eficiencia Térmica
                </h3>
                <p className="text-sm sm:text-base text-jet-200 font-light leading-relaxed">
                  Los módulos Beyritech se fabrican en un entorno controlado que reduce drásticamente el desperdicio de materiales en comparación con la construcción tradicional. Además, el diseño modular y el aislamiento de alta resistencia minimizan la energía necesaria para la climatización interna.
                </p>

                <div className="space-y-4 pt-4 border-t border-jet-800/80">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded bg-jet-900 border border-jet-800 flex items-center justify-center text-gold-500 shrink-0">
                      <Scale className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white">Alta Reciclabilidad</h4>
                      <p className="text-xs text-jet-300 font-light mt-1">Estructura de acero y cerramientos recuperables que minimizan el desperdicio industrial.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded bg-jet-900 border border-jet-800 flex items-center justify-center text-gold-500 shrink-0">
                      <Sun className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white">Estructura Solar-Ready</h4>
                      <p className="text-xs text-jet-300 font-light mt-1">Cubiertas pre-diseñadas para soportar la instalación inmediata de paneles fotovoltaicos y sistemas de almacenamiento.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Graphical Comparison Slider Card */}
              <div className="lg:col-span-7 bg-jet-900 border border-jet-800 rounded p-8 space-y-6 shadow-2xl">
                <h4 className="font-display text-sm font-mono text-gold-500 uppercase tracking-widest">
                  Comparativa de Huella Ecológica y Aislamiento
                </h4>
                
                {/* Visual Bar 1 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-jet-200">Residuos de Obra Húmeda (% volumen)</span>
                    <span className="text-gold-500 font-bold">Beyritech: significativamente menor | Tradicional: alto</span>
                  </div>
                  <div className="h-2.5 w-full bg-jet-950 rounded overflow-hidden flex">
                    <motion.div
                      className="h-full bg-gold-500"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "11%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                    <div className="h-full bg-jet-800" style={{ width: "89%" }} />
                  </div>
                </div>

                {/* Visual Bar 2 */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-jet-200">Transmitancia Térmica (Valor R de Aislamiento)</span>
                    <span className="text-gold-500 font-bold">Beyritech: Alto aislamiento PIR | Tradicional: convencional</span>
                  </div>
                  <div className="h-2.5 w-full bg-jet-950 rounded overflow-hidden flex">
                    <motion.div
                      className="h-full bg-gold-500"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "95%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                    <div className="h-full bg-jet-800" style={{ width: "5%" }} />
                  </div>
                </div>

                {/* Stat Box Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-jet-800">
                  <div className="bg-jet-950 p-4 rounded border border-jet-800/60">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-jet-300">Huella de Carbono</p>
                    <h5 className="font-display text-xl font-bold text-white mt-1">Reducción significativa</h5>
                    <p className="text-[10px] text-jet-300 mt-1">Menos transporte y desperdicio de material.</p>
                  </div>
                  <div className="bg-jet-950 p-4 rounded border border-jet-800/60">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-jet-300">Eficiencia Climatización</p>
                    <h5 className="font-display text-xl font-bold text-white mt-1">Ahorro notable</h5>
                    <p className="text-[10px] text-jet-300 mt-1">Ahorro constante de energía operativa.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: OPERATIONAL SPEED */}
          {activeTab === "speed" && (
            <motion.div
              key="speed"
              id="speed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <ScrollReveal direction="left" className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded text-gold-500 text-xs font-mono">
                  <Zap className="w-3.5 h-3.5" />
                  Operación Paralela
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  Velocidad de Despliegue que Acelera el Retorno
                </h3>
                <p className="text-sm sm:text-base text-jet-200 font-light leading-relaxed">
                  Mientras que en un proyecto tradicional no se puede construir el armazón hasta terminar los cimientos, Beyritech realiza la prefabricación modular en planta automatizada en paralelo con la preparación del terreno. Esto reduce significativamente el cronograma de ejecución global.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-jet-800/80">
                  <div>
                    <h4 className="font-display text-2xl font-bold text-gold-500 font-mono">En paralelo</h4>
                    <p className="text-xs text-jet-300 mt-1">Fabricación en planta mientras se prepara el terreno.</p>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-bold text-white font-mono">48 Horas</h4>
                    <p className="text-xs text-jet-300 mt-1">Ensamblaje y conexión total de servicios en obra.</p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Graphic Comparison Timeline */}
              <div className="lg:col-span-7 bg-jet-900 border border-jet-800 rounded p-8 space-y-8 shadow-2xl">
                <h4 className="font-display text-sm font-mono text-gold-500 uppercase tracking-widest">
                  Línea de Tiempo del Proyecto (Semanas)
                </h4>

                {/* Timeline Traditional */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-jet-300">CONSTRUCCIÓN TRADICIONAL DE HORMIGÓN/LADRILLO</span>
                    <span className="text-white font-bold">24 Semanas</span>
                  </div>
                  <div className="h-6 w-full bg-jet-950 rounded overflow-hidden flex text-[10px] font-mono text-center">
                    <div className="bg-jet-700 text-white flex items-center justify-center font-bold px-1" style={{ width: "25%" }}>Terreno</div>
                    <div className="bg-jet-800 text-white flex items-center justify-center px-1" style={{ width: "35%" }}>Armado</div>
                    <div className="bg-jet-900 text-jet-300 flex items-center justify-center px-1" style={{ width: "40%" }}>Instalaciones</div>
                  </div>
                </div>

                {/* Timeline Beyritech */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gold-500 font-bold">CONSTRUCCIÓN MODULAR BEYRITECH</span>
                    <span className="text-gold-500 font-bold">6 Semanas (Ahorro significativo)</span>
                  </div>
                  <div className="h-10 w-full bg-jet-950 rounded overflow-hidden flex text-[10px] font-mono text-center relative border border-gold-500/30">
                    <div className="bg-gold-700 text-jet-950 font-bold flex flex-col justify-center px-1" style={{ width: "50%" }}>
                      <span>Planta</span>
                      <span className="text-[8px] opacity-75">Paralelo</span>
                    </div>
                    <div className="bg-gold-600 text-jet-950 font-bold flex flex-col justify-center px-1" style={{ width: "30%" }}>
                      <span>Logística</span>
                    </div>
                    <div className="bg-gold-500 text-jet-950 font-bold flex flex-col justify-center px-1" style={{ width: "20%" }}>
                      <span>Montaje</span>
                      <span className="text-[8px] opacity-75">48h</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-jet-300 font-light italic">
                  El pre-ensamblaje industrial evita retrasos debido a condiciones climáticas adversas en la zona de instalación.
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 3: LOGISTICS */}
          {activeTab === "logistics" && (
            <motion.div
              key="logistics"
              id="logistics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              <ScrollReveal direction="left" className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded text-gold-500 text-xs font-mono">
                  <Truck className="w-3.5 h-3.5" />
                  Logística Sin Barreras
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                  Logística Global y Resistencia en Entornos Hostiles
                </h3>
                <p className="text-sm sm:text-base text-jet-200 font-light leading-relaxed">
                  Diseñamos cada módulo con acoplamientos normalizados según especificaciones ISO de transporte intermodal. Esto permite que viajen en barcos portacontenedores, trenes o camiones todo terreno sin requerir permisos de carga sobredimensionada, reduciendo el costo de los fletes internacionales.
                </p>

                <div className="space-y-4 pt-4 border-t border-jet-800/80">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded bg-jet-900 border border-jet-800 flex items-center justify-center text-gold-500 shrink-0">
                      <Snowflake className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white">Resistencia a Climas Extremos</h4>
                      <p className="text-xs text-jet-300 font-light mt-1">Módulos preparados para operar en condiciones térmicas extremas de costa y sierra.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded bg-jet-900 border border-jet-800 flex items-center justify-center text-gold-500 shrink-0">
                      <Wind className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white">Resistencia a Viento Intenso</h4>
                      <p className="text-xs text-jet-300 font-light mt-1">Cálculo de cargas laterales para entornos costeros y de sierra con vientos fuertes.</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Graphic container detail */}
              <div className="lg:col-span-7 bg-jet-900 border border-jet-800 rounded p-8 flex flex-col justify-between min-h-[350px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full filter blur-xl" />
                <div>
                  <h4 className="font-display text-sm font-mono text-gold-500 uppercase tracking-widest mb-4">
                    Configuración de Carga Intermodal Flat-Rack
                  </h4>
                    <p className="text-xs text-jet-300 font-light mb-6">
                    Los módulos se diseñan para optimizar el transporte en contenedores estándar de 20 o 40 pies.
                  </p>
                </div>

                <div className="border border-jet-800 bg-jet-950 p-6 rounded relative flex items-center justify-center py-12">
                  <div className="relative border-2 border-dashed border-gold-500/40 w-4/5 h-20 rounded flex items-center justify-center">
                    <div className="absolute -top-3 left-4 bg-jet-900 border border-jet-800 px-2 text-[9px] font-mono text-gold-500">
                      ISO Standard: 40ft High Cube Container Space
                    </div>
                    {/* Visual represents 4 stacked panels */}
                    <div className="w-11/12 h-10 bg-gradient-to-r from-gold-500/10 to-gold-500/30 border border-gold-500 flex items-center justify-between px-4 rounded text-[10px] font-mono">
                      <span>Beyritech Module Cell [BEY-HC-40]</span>
                      <span className="text-gold-300">READY TO SHIP</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center mt-6">
                  <div className="bg-jet-950 p-2.5 rounded border border-jet-800/40">
                    <span className="text-[9px] font-mono text-jet-300 uppercase">Capacidad Máxima</span>
                    <p className="text-xs font-bold text-white mt-1">4 Módulos / Cama</p>
                  </div>
                  <div className="bg-jet-950 p-2.5 rounded border border-jet-800/40">
                    <span className="text-[9px] font-mono text-jet-300 uppercase">Flete Optimizado</span>
                    <p className="text-xs font-bold text-gold-500 mt-1">Coste reducido</p>
                  </div>
                  <div className="bg-jet-950 p-2.5 rounded border border-jet-800/40">
                    <span className="text-[9px] font-mono text-jet-300 uppercase">Despliegue</span>
                    <p className="text-xs font-bold text-white mt-1">Plug & Play</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </section>
  );
}
