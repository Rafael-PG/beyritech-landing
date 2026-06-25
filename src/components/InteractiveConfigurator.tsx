import React, { useState } from "react";
import { 
  Leaf, 
  Building, 
  Mail, 
  User, 
  Phone, 
  Loader2, 
  CheckCircle 
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
  const [submitted, setSubmitted] = useState(false);

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

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Error al enviar");
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Hubo un error al enviar la solicitud. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
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
    setSubmitted(false);
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
    <section id="estimator" className="py-24 bg-jet-950 text-white relative border-t border-jet-800 [content-visibility:auto] [contain-intrinsic-size:600px]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333d4705_1px,transparent_1px),linear-gradient(to_bottom,#333d4705_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded text-gold-500 text-xs font-mono mb-4">
            <Mail className="w-3.5 h-3.5" />
            Solicitud de Cotización
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Diseñe su Módulo en <span className="text-gold-500">Tiempo Real</span>
          </h2>
          <p className="text-jet-300 mt-4 font-sans text-base sm:text-lg font-light leading-relaxed">
            Especifique el sector, el tamaño y las condiciones de su proyecto. Nuestro equipo de ingeniería le enviará una propuesta técnica detallada a la brevedad.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {!submitted ? (
            <div className="bg-jet-900 border border-jet-800 rounded-lg p-6 sm:p-10 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_right_top,rgba(254,201,52,0.06),transparent_60%)] pointer-events-none hidden sm:block" />
              
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
                        <span>Enviando solicitud...</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        <span>Enviar Solicitud</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Success Message */
            <div className="max-w-xl mx-auto text-center">
              <div className="bg-jet-900 border border-gold-500/30 rounded-lg p-10 sm:p-14 shadow-2xl relative">
                <div className="absolute -top-10 -right-10 w-80 h-80 bg-[radial-gradient(circle_at_right_top,rgba(254,201,52,0.06),transparent_60%)] pointer-events-none hidden sm:block" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-gold-500" />
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                    Solicitud Enviada
                  </h3>
                  <p className="text-jet-300 font-sans text-base font-light leading-relaxed max-w-md mx-auto">
                    Gracias, <span className="text-white font-medium">{formData.name}</span>. Hemos recibido los datos de su proyecto y un ingeniero consultor se comunicará a la brevedad al correo <span className="text-white font-medium">{formData.email}</span> con una propuesta técnica detallada.
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-8 px-6 py-3 rounded bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-xs transition-colors"
                  >
                    Nueva Solicitud
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
