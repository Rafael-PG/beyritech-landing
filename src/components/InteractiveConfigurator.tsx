import { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, User, Phone, Loader2, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function InteractiveConfigurator() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    industry: "Minería",
    projectType: "",
    area: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
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
    <section id="estimator" className="py-24 bg-jet-950 text-white relative border-t border-jet-800 [content-visibility:auto] [contain-intrinsic-size:600px]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#333d4705_1px,transparent_1px),linear-gradient(to_bottom,#333d4705_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 border border-gold-500/20 rounded text-gold-500 text-xs font-mono mb-4">
            <Mail className="w-3.5 h-3.5" />
            Cotización rápida
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Solicite su <span className="text-gold-500">Cotización</span>
          </h2>
          <p className="text-jet-300 mt-4 font-sans text-base sm:text-lg font-light leading-relaxed">
            Responda unas preguntas y reciba una propuesta técnica a la brevedad.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <div className="bg-jet-900 border border-jet-800 rounded-lg p-6 sm:p-8 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-jet-300" htmlFor="ec-name">Nombre *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-jet-300 absolute left-3 top-3" />
                    <input id="ec-name" name="name" type="text" required value={formData.name} onChange={handleInputChange}
                      placeholder="Ing. Rafael Huarcaya"
                      className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-gold-500" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-jet-300" htmlFor="ec-company">Empresa</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-jet-300 absolute left-3 top-3" />
                    <input id="ec-company" name="company" type="text" value={formData.company} onChange={handleInputChange}
                      placeholder="Nombre de la empresa"
                      className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-gold-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-jet-300" htmlFor="ec-phone">Teléfono *</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-jet-300 absolute left-3 top-3" />
                      <input id="ec-phone" name="phone" type="tel" required value={formData.phone} onChange={handleInputChange}
                        placeholder="+51 999 888 777"
                        className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-gold-500" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-jet-300" htmlFor="ec-email">Correo</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-jet-300 absolute left-3 top-3" />
                      <input id="ec-email" name="email" type="email" value={formData.email} onChange={handleInputChange}
                        placeholder="correo@empresa.com"
                        className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-gold-500" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-jet-300" htmlFor="ec-industry">Sector</label>
                    <select id="ec-industry" name="industry" value={formData.industry} onChange={handleInputChange}
                      className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500">
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
                      className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-jet-300" htmlFor="ec-area">Área aproximada (m²)</label>
                  <input id="ec-area" name="area" type="number" min="20" max="20000" value={formData.area} onChange={handleInputChange}
                    placeholder="500"
                    className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-jet-300" htmlFor="ec-message">Mensaje (opcional)</label>
                  <textarea id="ec-message" name="message" rows={3} value={formData.message} onChange={handleInputChange}
                    placeholder="Cuéntenos brevemente sobre su proyecto..."
                    className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500" />
                </div>

                <label className="flex items-start gap-3 p-4 bg-jet-950/40 rounded border border-jet-800 cursor-pointer">
                  <input type="checkbox" required className="mt-1 accent-gold-500" />
                  <span className="text-xs text-jet-300 font-light leading-relaxed">
                    Autorizo el tratamiento de mis datos personales conforme a la{" "}
                    <Link to="/politica-de-privacidad" className="text-gold-500 hover:underline" target="_blank">
                      Política de Privacidad
                    </Link>{" "}
                    (Ley N° 29733). Acepto recibir comunicaciones comerciales relacionadas con productos y servicios de Beyritech.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-4 bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-sm rounded flex items-center justify-center gap-2 transition-colors disabled:bg-gold-700"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</>
                  ) : (
                    <><Mail className="w-5 h-5" /> Solicitar cotización</>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center">
              <div className="bg-jet-900 border border-gold-500/30 rounded-lg p-10 sm:p-14 shadow-2xl">
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
                  <Link to="/" className="px-6 py-3 rounded bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-xs transition-colors">
                    Volver al inicio
                  </Link>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", phone: "", email: "", industry: "Minería", projectType: "", area: "", message: "" }); }}
                    className="px-6 py-3 rounded border border-jet-700 hover:border-gold-500 text-white font-medium uppercase tracking-wider text-xs transition-colors"
                  >
                    Nueva solicitud
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
