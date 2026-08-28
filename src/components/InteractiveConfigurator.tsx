import { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, User, Phone, Loader2, CheckCircle, MapPin, Clock, ArrowRight, ArrowLeft, Building2, Ruler, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { empresa } from "../data/empresa";

const steps = [
  { id: 1, label: "Contacto" },
  { id: 2, label: "Proyecto" },
  { id: 3, label: "Confirmar" },
];

export default function InteractiveConfigurator() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
name: "",
    company: "",
    phone: "",
    industry: "Agroindustria",
    projectType: "",
    area: "",
    message: "",
  });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const canProceed = () => {
    if (currentStep === 1) return formData.name && formData.phone;
    if (currentStep === 2) return true;
    if (currentStep === 3) return privacyAccepted;
    return false;
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) return;

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          company: formData.company,
          industry: formData.industry,
          moduleType: formData.projectType,
          area: formData.area,
          capacity: "",
          location: "",
          sustainability: false,
          insulation: false,
          timeline: "",
          additionalSpecs: formData.message,
        }),
      });

      if (response.ok) {
        navigate("/gracias");
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="estimator" className="section-texture py-24 bg-jet-900 text-white relative [content-visibility:auto] [contain-intrinsic-size:600px]">
      {/* Grid texture background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FEC93406_1px,transparent_1px),linear-gradient(to_bottom,#FEC93406_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs font-mono mb-4">
            <Mail className="w-3.5 h-3.5" />
            Cotización rápida
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Solicite su <span className="text-gold-500">Cotización</span>
          </h2>
          <p className="text-jet-400 mt-4 font-sans text-base font-light leading-relaxed">
            Responda unas preguntas y reciba una propuesta técnica a la brevedad.
          </p>
        </div>

        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left column - Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Corporate info card */}
              <div className="bg-jet-950 border border-jet-800/60 rounded-lg p-8">
                <h3 className="font-display text-lg font-bold text-white mb-6 pb-4 border-b border-jet-800">
                  Información Corporativa
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white">Sede Central</p>
                      <p className="text-xs text-jet-400 mt-1 leading-relaxed">
                        {empresa.direccionCompleta} (Planta de fabricación y oficinas)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white">Teléfono</p>
                      <p className="text-xs text-jet-400 mt-1">{empresa.telefono}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white">Correo</p>
                      <p className="text-xs text-jet-400 mt-1">{empresa.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response time card */}
              <div className="bg-jet-900 border border-gold-500/20 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/5 rounded-full filter blur-2xl" />
                <Clock className="w-6 h-6 text-gold-500 mb-3" />
                <h4 className="font-display text-base font-bold text-white mb-2">
                  Tiempo de Respuesta
                </h4>
                <p className="text-xs text-jet-400 leading-relaxed mb-3">
                  Un ingeniero consultor se comunicará dentro de las próximas 2 horas hábiles con una propuesta técnica personalizada.
                </p>
                <div className="text-[10px] font-mono text-gold-500 uppercase tracking-widest">
                  // Cobertura a nivel nacional
                </div>
              </div>
            </div>

            {/* Right column - Form */}
            <div className="lg:col-span-7">
              <div className="bg-jet-950 border border-jet-800/60 rounded-lg p-6 sm:p-8">
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    {steps.map((step, i) => (
                      <div key={step.id} className="flex items-center flex-1 last:flex-initial">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          currentStep > step.id
                            ? "bg-gold-500 text-black"
                            : currentStep === step.id
                            ? "bg-gold-500/20 border-2 border-gold-500 text-gold-500"
                            : "bg-jet-800 text-jet-500"
                        }`}>
                          {currentStep > step.id ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            step.id
                          )}
                        </div>
                        {i < steps.length - 1 && (
                          <div className={`flex-1 h-[2px] mx-2 transition-all duration-300 ${
                            currentStep > step.id ? "bg-gold-500" : "bg-jet-800"
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider">
                    {steps.map((step) => (
                      <span key={step.id} className={currentStep === step.id ? "text-gold-500" : "text-jet-500"}>
                        {step.label}
                      </span>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Contact */}
                  {currentStep === 1 && (
                    <div className="space-y-5">
                      <div className="mb-6">
                        <h3 className="font-display text-xl font-bold text-white mb-1">Datos de Contacto</h3>
                        <p className="text-sm text-jet-400">Cuéntenos sobre usted para poder contactarle.</p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-jet-300" htmlFor="ec-name">Nombre completo *</label>
                        <div className="relative">
                          <User className="w-4 h-4 text-jet-400 absolute left-3 top-3" />
                          <input id="ec-name" name="name" type="text" required value={formData.name} onChange={handleInputChange}
                            placeholder="Ing. Rafael Huarcaya"
                            className="w-full bg-jet-900 border border-jet-800/60 rounded px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-jet-300" htmlFor="ec-phone">Teléfono *</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-jet-400 absolute left-3 top-3" />
                          <input id="ec-phone" name="phone" type="tel" required value={formData.phone} onChange={handleInputChange}
                            placeholder="+51 999 888 777"
                            className="w-full bg-jet-900 border border-jet-800/60 rounded px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors" />
                        </div>
                      </div>

                      </div>
                  )}

                  {/* Step 2: Project */}
                  {currentStep === 2 && (
                    <div className="space-y-5">
                      <div className="mb-6">
                        <h3 className="font-display text-xl font-bold text-white mb-1">Detalles del Proyecto</h3>
                        <p className="text-sm text-jet-400">Infórmenos sobre su proyecto para personalizar la cotización.</p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-jet-300" htmlFor="ec-company">Empresa</label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-jet-400 absolute left-3 top-3" />
                          <input id="ec-company" name="company" type="text" value={formData.company} onChange={handleInputChange}
                            placeholder="Nombre de la empresa"
                            className="w-full bg-jet-900 border border-jet-800/60 rounded px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-jet-300" htmlFor="ec-industry">Sector</label>
                          <select id="ec-industry" name="industry" value={formData.industry} onChange={handleInputChange}
                            className="w-full bg-jet-900 border border-jet-800/60 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors">
                            <option value="Agroindustria">Agroindustria</option>
                            <option value="Minería">Minería</option>
                            <option value="Logística">Logística / Almacenes</option>
                            <option value="Construcción">Construcción / Obra</option>
                            <option value="Corporativo">Corporativo</option>
                            <option value="Educación">Educación</option>
                            <option value="Salud">Salud</option>
                          </select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-mono text-jet-300" htmlFor="ec-projectType">Uso previsto</label>
                          <input id="ec-projectType" name="projectType" type="text" value={formData.projectType} onChange={handleInputChange}
                            placeholder="Ej. Campamento, oficinas, clínica"
                            className="w-full bg-jet-900 border border-jet-800/60 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-jet-300" htmlFor="ec-area">Área aproximada (m²)</label>
                        <div className="relative">
                          <Ruler className="w-4 h-4 text-jet-400 absolute left-3 top-3" />
                          <input id="ec-area" name="area" type="number" min="20" max="20000" value={formData.area} onChange={handleInputChange}
                            placeholder="500"
                            className="w-full bg-jet-900 border border-jet-800/60 rounded px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Confirm */}
                  {currentStep === 3 && (
                    <div className="space-y-5">
                      <div className="mb-6">
                        <h3 className="font-display text-xl font-bold text-white mb-1">Confirmar Envío</h3>
                        <p className="text-sm text-jet-400">Revise sus datos y envíe la solicitud de cotización.</p>
                      </div>

                      {/* Summary */}
                      <div className="bg-jet-900 border border-jet-800/60 rounded-lg p-5 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-jet-400">Nombre:</span>
                          <span className="text-white font-medium">{formData.name || "-"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-jet-400">Teléfono:</span>
                          <span className="text-white font-medium">{formData.phone || "-"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-jet-400">Empresa:</span>
                          <span className="text-white font-medium">{formData.company || "-"}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-jet-400">Sector:</span>
                          <span className="text-white font-medium">{formData.industry}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-jet-400">Área:</span>
                          <span className="text-white font-medium">{formData.area ? `${formData.area} m²` : "-"}</span>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-mono text-jet-300" htmlFor="ec-message">Mensaje adicional (opcional)</label>
                        <div className="relative">
                          <MessageSquare className="w-4 h-4 text-jet-400 absolute left-3 top-3" />
                          <textarea id="ec-message" name="message" rows={3} value={formData.message} onChange={handleInputChange}
                            placeholder="Cuéntenos brevemente sobre su proyecto..."
                            className="w-full bg-jet-900 border border-jet-800/60 rounded px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors" />
                        </div>
                      </div>

                      {/* Privacy checkbox */}
                      <label className="flex items-start gap-3 p-4 bg-jet-900 border border-jet-800/60 cursor-pointer hover:border-gold-500/30 transition-colors">
                        <input
                          type="checkbox"
                          checked={privacyAccepted}
                          onChange={(e) => setPrivacyAccepted(e.target.checked)}
                          className="mt-1 accent-gold-500"
                        />
                        <span className="text-xs text-jet-400 font-light leading-relaxed">
                          Autorizo el tratamiento de mis datos personales conforme a la{" "}
                          <Link to="/politica-de-privacidad" className="text-gold-500 hover:underline" target="_blank">
                            Política de Privacidad
                          </Link>{" "}
                          (Ley N° 29733). Acepto recibir comunicaciones comerciales relacionadas con productos y servicios de Beyritech.
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-jet-800">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center gap-2 px-5 py-2.5 border border-jet-700 hover:border-gold-500/50 text-jet-300 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Anterior
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className="flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Siguiente
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading || !canProceed()}
                        className="flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Mail className="w-4 h-4" />
                            Enviar cotización
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-jet-900 border border-gold-500/30 rounded-lg p-10 sm:p-14">
              <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
                Solicitud Enviada
              </h3>
              <p className="text-jet-300 font-sans text-base font-light leading-relaxed max-w-md mx-auto">
                Gracias, <span className="text-white font-medium">{formData.name}</span>. Un ingeniero consultor se comunicará a la brevedad con una propuesta técnica.
              </p>
              <div className="flex gap-3 justify-center mt-8">
                <Link to="/" className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold uppercase tracking-wider text-xs transition-colors">
                  Volver al inicio
                </Link>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                    setPrivacyAccepted(false);
                    setFormData({ name: "", phone: "", company: "", industry: "Agroindustria", projectType: "", area: "", message: "" });
                  }}
                  className="px-6 py-3 border border-jet-700 hover:border-gold-500 text-white font-medium uppercase tracking-wider text-xs transition-colors"
                >
                  Nueva solicitud
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
