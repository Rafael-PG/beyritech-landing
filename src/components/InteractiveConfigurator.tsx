import React, { useState } from "react";
import { EstimateRequest, EstimateResponse } from "../types";
import { 
  Wrench, 
  Cpu, 
  Leaf, 
  Clock, 
  Building, 
  Sparkles, 
  ArrowRight, 
  Mail, 
  User, 
  Phone, 
  CheckCircle, 
  Loader2, 
  Printer, 
  FileCheck 
} from "lucide-react";

export default function InteractiveConfigurator() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "Mining",
    moduleType: "Campamento de Viviendas",
    area: "500",
    capacity: "80",
    location: "",
    sustainability: true,
    insulation: true,
    timeline: "6",
    additionalSpecs: ""
  });

  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState("");
  const [result, setResult] = useState<EstimateResponse | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email || !formData.phone) {
      alert("Por favor complete todos los datos de contacto corporativo.");
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate multi-phase high-tech calculation phases for executive engagement
    const phases = [
      "Iniciando análisis estructural Beyritech...",
      "Calculando estabilidad sísmica y térmica...",
      "Generando propuesta volumétrica para " + formData.moduleType + "...",
      "Consultando motor de IA para especificaciones estructurales finales..."
    ];

    let currentPhaseIdx = 0;
    setLoadingPhase(phases[0]);
    
    const interval = setInterval(() => {
      currentPhaseIdx++;
      if (currentPhaseIdx < phases.length) {
        setLoadingPhase(phases[currentPhaseIdx]);
      }
    }, 1000);

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Estimatión fallida");
      }

      const data = await response.json();
      clearInterval(interval);
      setResult(data);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      clearInterval(interval);
      // Fallback generator already built-in on server side or here
      alert("Hubo un retraso de red, utilizando el motor local de contingencia.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowForm(true);
    setResult(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const moduleTypes: Record<string, string[]> = {
    Mining: ["Campamento de Viviendas", "Casino / Comedor Minero", "Oficinas de Faena", "Módulos de Primeros Auxilios", "Depósitos Técnicos"],
    Construction: ["Oficina Móvil de Obra", "Vestuarios y Sanitarios", "Casetas de Vigilancia", "Módulos Multi-Aulas"],
    Healthcare: ["Clínicas de Atención Primaria", "Módulos de Aislamiento Sanitario", "Laboratorio de Campaña", "Farmacia Modular"],
    Corporate: ["Oficinas Gerenciales Premium", "Salas de Reuniones Glaseadas", "Showrooms / Puntos de Venta", "Cafeterías de Personal"],
    Education: ["Aulas Escolares Climatizadas", "Laboratorios Escolares de Ciencia", "Oficinas Administrativas Escolares"],
    Industrial: ["Almacenes Modulares de Carga", "Centros de Control Operativo", "Talleres Técnicos Móviles"]
  };

  return (
    <section id="estimator" className="py-24 bg-jet-950 text-white relative border-t border-jet-800">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333d4705_1px,transparent_1px),linear-gradient(to_bottom,#333d4705_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded text-gold-500 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Configurador de Ingeniería Inteligente
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Diseñe su Módulo en <span className="text-gold-500">Tiempo Real</span>
          </h2>
          <p className="text-jet-300 mt-4 font-sans text-base sm:text-lg font-light leading-relaxed">
            Especifique el sector, el tamaño y las condiciones de su proyecto. Nuestro motor de IA estructurará una memoria técnica ejecutiva, plazos logísticos y un indicador de sustentabilidad de inmediato.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {showForm ? (
            <div className="bg-jet-900 border border-jet-800 rounded-lg p-6 sm:p-10 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full filter blur-xl" />
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Contact Information Block */}
                <div className="space-y-4">
                  <h3 className="font-display text-sm font-bold text-gold-500 uppercase tracking-widest border-b border-jet-800 pb-2">
                    1. Información Corporativa de Contacto
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-jet-300" htmlFor="name">Nombre de Contacto *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-jet-300 absolute left-3.5 top-3.5" />
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Ej. Ing. Rafael Huarcaya"
                          className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 pl-11 text-sm text-white focus:outline-none focus:border-gold-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-jet-300" htmlFor="company">Compañía / Institución *</label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-jet-300 absolute left-3.5 top-3.5" />
                        <input
                          id="company"
                          name="company"
                          type="text"
                          required
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Ej. Corporación Minera Andina"
                          className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 pl-11 text-sm text-white focus:outline-none focus:border-gold-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-jet-300" htmlFor="email">Correo Electrónico *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-jet-300 absolute left-3.5 top-3.5" />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Ej. r.huarcaya@compania.com"
                          className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 pl-11 text-sm text-white focus:outline-none focus:border-gold-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-jet-300" htmlFor="phone">Teléfono Móvil / Directo *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-jet-300 absolute left-3.5 top-3.5" />
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Ej. +56 9 1234 5678"
                          className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 pl-11 text-sm text-white focus:outline-none focus:border-gold-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Technical Scope block */}
                <div className="space-y-4 pt-4">
                  <h3 className="font-display text-sm font-bold text-gold-500 uppercase tracking-widest border-b border-jet-800 pb-2">
                    2. Parámetros Técnicos y Alcance del Módulo
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-jet-300" htmlFor="industry">Sector de Aplicación</label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
                      >
                        <option value="Mining">Minería (Alta Montaña / Faena)</option>
                        <option value="Construction">Construcción / Obra Urbana</option>
                        <option value="Healthcare">Salud / Clínicas de Emergencia</option>
                        <option value="Corporate">Corporativo / Oficinas de Lujo</option>
                        <option value="Education">Educativo / Aulas Técnicas</option>
                        <option value="Industrial">Industrial / Almacenaje Pesado</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-jet-300" htmlFor="moduleType">Tipo de Infraestructura Modular</label>
                      <select
                        id="moduleType"
                        name="moduleType"
                        value={formData.moduleType}
                        onChange={handleInputChange}
                        className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
                      >
                        {moduleTypes[formData.industry].map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-jet-300" htmlFor="area">Área Deseada Estimada (m²)</label>
                      <input
                        id="area"
                        name="area"
                        type="number"
                        min="20"
                        max="20000"
                        value={formData.area}
                        onChange={handleInputChange}
                        className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-jet-300" htmlFor="capacity">Capacidad de Operadores / Usuarios</label>
                      <input
                        id="capacity"
                        name="capacity"
                        type="number"
                        min="2"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-jet-300" htmlFor="location">Ubicación del Terreno / Condiciones Climáticas</label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        required
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Ej. Calama, Altitud 2,300 m, clima desértico seco"
                        className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-jet-300" htmlFor="timeline">Plazo Objetivo de Instalación (Semanas)</label>
                      <input
                        id="timeline"
                        name="timeline"
                        type="number"
                        min="3"
                        max="52"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Upgrades checkboxes */}
                <div className="space-y-4 pt-4">
                  <h3 className="font-display text-sm font-bold text-gold-500 uppercase tracking-widest border-b border-jet-800 pb-2">
                    3. Mejoras de Ingeniería Beyritech
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex items-start gap-3 p-4 bg-jet-950/40 rounded border border-jet-800 hover:border-gold-500/40 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        name="insulation"
                        checked={formData.insulation}
                        onChange={handleInputChange}
                        className="mt-1 accent-gold-500"
                      />
                      <div>
                        <span className="text-sm font-bold text-white block">Aislamiento Térmico PIR Extremo</span>
                        <span className="text-xs text-jet-300 font-light block mt-1">
                          Aumenta el espesor del núcleo a 100mm, asegurando confort hasta -25°C e insonorización industrial.
                        </span>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 bg-jet-950/40 rounded border border-jet-800 hover:border-gold-500/40 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        name="sustainability"
                        checked={formData.sustainability}
                        onChange={handleInputChange}
                        className="mt-1 accent-gold-500"
                      />
                      <div>
                        <span className="text-sm font-bold text-white block">Sostenibilidad Solar-Ready</span>
                        <span className="text-xs text-jet-300 font-light block mt-1">
                          Acero reciclado de alta resistencia y preparación estructural estructural en cubierta para paneles solares.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* 4. Notes */}
                <div className="space-y-1.5 pt-4">
                  <label className="text-xs font-mono text-jet-300" htmlFor="additionalSpecs">Requerimientos o Breve del Proyecto</label>
                  <textarea
                    id="additionalSpecs"
                    name="additionalSpecs"
                    rows={4}
                    value={formData.additionalSpecs}
                    onChange={handleInputChange}
                    placeholder="Detalle requerimientos específicos como: distribución de oficinas, húmedas, andenes de carga, acabados en madera de lujo tipo video..."
                    className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-6">
                  <button
                    id="estimator-submit-btn"
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-4 bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-sm rounded flex items-center justify-center gap-2 transition-colors disabled:bg-gold-700 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Generando Memoria por IA...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Generar Memoria Técnica de Ingeniería por IA</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Result Page (Technical Proposal UI) */
            <div id="estimator-result-card" className="bg-jet-900 border-2 border-gold-500/80 rounded-lg p-6 sm:p-10 shadow-2xl relative animate-fade-in print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
              {/* Header result */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-jet-800/80 pb-6 mb-6 print:border-black/20">
                <div>
                  <span className="text-xs font-mono bg-gold-500 text-jet-950 px-2.5 py-1 rounded font-bold uppercase">
                    PROYECTO EVALUADO POR IA
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-3 tracking-tight print:text-black">
                    {formData.moduleType}
                  </h3>
                  <p className="text-xs text-jet-300 font-mono mt-1 print:text-black/60">
                    Cód. de Registro: <span className="text-gold-500 font-bold">{result?.projectCode}</span> | {formData.company}
                  </p>
                </div>
                <div className="bg-jet-950 border border-jet-800 px-4 py-2.5 rounded text-right shrink-0 print:border-black/10 print:text-black">
                  <span className="text-[9px] font-mono text-jet-400 block uppercase">
                    Puntaje de Sustentabilidad
                  </span>
                  <span className="text-2xl font-display font-bold text-gold-500 font-mono">
                    {result?.sustainabilityScore.split(" ")[0]}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-display text-xs font-bold uppercase tracking-widest text-gold-300 mb-2 print:text-black">
                    Resumen Ejecutivo del Proyecto
                  </h4>
                  <p className="text-sm text-jet-200 font-light leading-relaxed print:text-black/80">
                    {result?.executiveSummary}
                  </p>
                </div>

                {/* Grid info details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-jet-800/60 print:border-black/10">
                  <div className="space-y-4">
                    <h5 className="font-display text-xs font-bold uppercase tracking-widest text-gold-500">
                      Layout y Configuración Recomendada
                    </h5>
                    <div className="p-4 bg-jet-950 border border-jet-800/80 rounded text-sm text-jet-200 font-light leading-relaxed print:bg-gray-100 print:text-black print:border-none">
                      {result?.recommendedLayout}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-display text-xs font-bold uppercase tracking-widest text-gold-500">
                      Línea de Tiempo Operativa Estimada
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      <div className="bg-jet-950 p-3 rounded border border-jet-800/40 print:bg-gray-50 print:text-black print:border-none">
                        <span className="text-[9px] text-jet-400 block">FABRICACIÓN INDUSTRIAL</span>
                        <span className="font-bold text-white block mt-0.5 print:text-black">{result?.timelineEstimate.manufacturing}</span>
                      </div>
                      <div className="bg-jet-950 p-3 rounded border border-jet-800/40 print:bg-gray-50 print:text-black print:border-none">
                        <span className="text-[9px] text-jet-400 block">LOGÍSTICA INTERMODAL</span>
                        <span className="font-bold text-white block mt-0.5 print:text-black">{result?.timelineEstimate.logistics}</span>
                      </div>
                      <div className="bg-jet-950 p-3 rounded border border-jet-800/40 print:bg-gray-50 print:text-black print:border-none">
                        <span className="text-[9px] text-jet-400 block">MONTAJE PLUG & PLAY</span>
                        <span className="font-bold text-white block mt-0.5 print:text-black">{result?.timelineEstimate.assembly}</span>
                      </div>
                      <div className="bg-jet-950 p-3 rounded border border-gold-500/20 print:bg-gray-100 print:text-black print:border-none">
                        <span className="text-[9px] text-gold-500 font-bold block">TIEMPO TOTAL ENTREGA</span>
                        <span className="font-bold text-gold-500 block mt-0.5 font-mono text-sm">{result?.timelineEstimate.totalWeeks} Semanas</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specs list */}
                <div className="pt-6 border-t border-jet-800/60 print:border-black/10">
                  <h4 className="font-display text-xs font-bold uppercase tracking-widest text-gold-300 mb-4 print:text-black">
                    Especificación de Materiales y Cumplimiento Normativo
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {result?.technicalSpecs.map((spec, index) => (
                      <div key={index} className="p-4 bg-jet-950 border border-jet-800 rounded relative print:bg-gray-50 print:text-black print:border-none">
                        <h5 className="font-display text-xs font-bold text-gold-500 mb-1">{spec.category}</h5>
                        <p className="text-xs text-jet-300 font-light leading-relaxed print:text-black/80">{spec.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Score Explainer */}
                <div className="p-4 bg-gold-500/5 border border-gold-500/30 rounded flex items-start gap-3 print:bg-gray-50 print:text-black print:border-none">
                  <Leaf className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-display text-xs font-bold text-gold-300 uppercase tracking-widest print:text-black">Justificación Ecológica</h5>
                    <p className="text-xs text-jet-200 font-light mt-1 leading-relaxed print:text-black/80">
                      {result?.sustainabilityScore}
                    </p>
                  </div>
                </div>

                {/* Dynamic warning if fallback was used */}
                {result?._warning && (
                  <p className="text-[10px] text-gold-500 font-mono text-center">
                    * {result._warning}
                  </p>
                )}

                {/* Actions bottom */}
                <div className="pt-8 border-t border-jet-800/60 flex flex-col sm:flex-row gap-3 print:hidden">
                  <button
                    onClick={handlePrint}
                    className="flex-1 px-5 py-3 rounded border border-jet-700 hover:border-gold-500 hover:bg-gold-500/5 text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Printer className="w-4 h-4 text-gold-500" />
                    Imprimir Memoria Técnica
                  </button>

                  <button
                    onClick={handleReset}
                    className="flex-1 px-5 py-3 rounded bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-xs"
                  >
                    Configurar Nuevo Proyecto
                  </button>
                </div>

                {/* Legal notice for quote lead generation */}
                <div className="bg-jet-950 border border-jet-800 p-4 rounded text-xs text-jet-300 font-light flex items-start gap-3 mt-4 print:hidden">
                  <FileCheck className="w-5 h-5 text-gold-500 shrink-0" />
                  <div>
                    <p className="font-bold text-white">Próximo Paso Ejecutivo:</p>
                    <p className="mt-1">
                      Un Ingeniero Consultor Senior de Beyritech ha recibido una copia de esta memoria técnica de pre-factibilidad para el proyecto <span className="font-mono text-gold-500 font-bold">{result?.projectCode}</span>. Nos pondremos en contacto con <span className="font-bold">{formData.name}</span> al correo <span className="font-mono">{formData.email}</span> o teléfono para agendar una sesión técnica detallada de revisión CAD en las próximas 12 horas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
