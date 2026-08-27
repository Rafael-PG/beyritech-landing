import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, User, Building, Phone, Loader2, CheckCircle, MessageCircle } from "lucide-react";
import SEO from "../components/SEO";

export default function Contacto() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "Mining",
    moduleType: "",
    area: "",
    capacity: "",
    location: "",
    sustainability: false,
    insulation: false,
    timeline: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          moduleType: "Contacto directo",
          area: "",
          capacity: "",
          location: "",
          sustainability: false,
          insulation: false,
          timeline: "",
          additionalSpecs: formData.message,
        }),
      });
      if (res.ok) {
        navigate("/gracias");
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-jet-950 text-white pt-28 pb-20">
      <SEO
        title="Contacto — Solicite Cotización"
        description="Complete el formulario y un ingeniero consultor se comunicará con una propuesta técnica detallada. Formulario de contacto Beyritech."
        url="/contacto"
        structuredData={{ "@context": "https://schema.org", "@type": "LocalBusiness", name: "Beyritech Modular Systems", telephone: "+51-993-694-677", email: "asistente.comercial@beyritech.com", address: { "@type": "PostalAddress", streetAddress: "Av. Santa Elvira Mza. B Lote 8", addressLocality: "Los Olivos", addressRegion: "Lima", addressCountry: "PE" } }}
      />
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
            Contacto
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-3 tracking-tight">
            Hablemos de su proyecto
          </h1>
          <div className="w-16 h-[2px] bg-gold-500 mt-6" />
          <p className="text-jet-300 mt-4 font-light leading-relaxed">
            Complete el formulario y un ingeniero consultor se comunicará a la brevedad
            con una propuesta técnica detallada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-jet-900 border border-jet-800 rounded-lg p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-jet-300 block mb-1.5" htmlFor="c-name">Nombre *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-jet-300 absolute left-3 top-3" />
                    <input id="c-name" name="name" type="text" required value={formData.name} onChange={handleChange}
                      className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 pl-11 text-sm text-white focus:outline-none focus:border-gold-500" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-mono text-jet-300 block mb-1.5" htmlFor="c-company">Empresa *</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-jet-300 absolute left-3 top-3" />
                    <input id="c-company" name="company" type="text" required value={formData.company} onChange={handleChange}
                      className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 pl-11 text-sm text-white focus:outline-none focus:border-gold-500" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-mono text-jet-300 block mb-1.5" htmlFor="c-email">Correo *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-jet-300 absolute left-3 top-3" />
                    <input id="c-email" name="email" type="email" required value={formData.email} onChange={handleChange}
                      className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 pl-11 text-sm text-white focus:outline-none focus:border-gold-500" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-mono text-jet-300 block mb-1.5" htmlFor="c-phone">Teléfono *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-jet-300 absolute left-3 top-3" />
                    <input id="c-phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                      className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 pl-11 text-sm text-white focus:outline-none focus:border-gold-500" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-jet-300 block mb-1.5" htmlFor="c-industry">Sector</label>
                  <select id="c-industry" name="industry" value={formData.industry} onChange={handleChange}
                    className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500">
                    <option value="Mining">Minería</option>
                    <option value="Agroindustria">Agroindustria</option>
                    <option value="Logistica">Logística / Almacenes</option>
                    <option value="Construction">Construcción / Obra</option>
                    <option value="Corporate">Corporativo</option>
                    <option value="Education">Educación</option>
                    <option value="Healthcare">Salud</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono text-jet-300 block mb-1.5" htmlFor="c-moduleType">Tipo de módulo</label>
                  <select id="c-moduleType" name="moduleType" value={formData.moduleType} onChange={handleChange}
                    className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500">
                    <option value="">Seleccione...</option>
                    <option value="multispace">Multispace</option>
                    <option value="doble-ala">Doble Ala</option>
                    <option value="mini-doble-ala">Mini Doble Ala</option>
                    <option value="no-se">No sé aún</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono text-jet-300 block mb-1.5" htmlFor="c-area">Área estimada (m²)</label>
                  <input id="c-area" name="area" type="number" min="0" value={formData.area} onChange={handleChange}
                    placeholder="Ej: 200"
                    className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500" />
                </div>
                <div>
                  <label className="text-xs font-mono text-jet-300 block mb-1.5" htmlFor="c-capacity">Capacidad (personas)</label>
                  <input id="c-capacity" name="capacity" type="number" min="0" value={formData.capacity} onChange={handleChange}
                    placeholder="Ej: 50"
                    className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500" />
                </div>
                <div>
                  <label className="text-xs font-mono text-jet-300 block mb-1.5" htmlFor="c-timeline">Plazo deseado (semanas)</label>
                  <input id="c-timeline" name="timeline" type="number" min="0" value={formData.timeline} onChange={handleChange}
                    placeholder="Ej: 8"
                    className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500" />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-jet-300 block mb-1.5" htmlFor="c-location">Ubicación del proyecto</label>
                <input id="c-location" name="location" type="text" value={formData.location} onChange={handleChange}
                  placeholder="Ciudad, región o dirección"
                  className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500" />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="sustainability" checked={formData.sustainability} onChange={(e) => setFormData(prev => ({ ...prev, sustainability: e.target.checked }))} className="accent-gold-500" />
                  <span className="text-xs text-jet-300">Requiere certificación sostenible</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="insulation" checked={formData.insulation} onChange={(e) => setFormData(prev => ({ ...prev, insulation: e.target.checked }))} className="accent-gold-500" />
                  <span className="text-xs text-jet-300">Aislamiento reforzado (extrema)</span>
                </label>
              </div>

              <div>
                <label className="text-xs font-mono text-jet-300 block mb-1.5" htmlFor="c-message">Mensaje</label>
                <textarea id="c-message" name="message" rows={4} value={formData.message} onChange={handleChange}
                  placeholder="Cuéntenos sobre su proyecto: ubicación, uso previsto, cantidad estimada..."
                  className="w-full bg-jet-950 border border-jet-800 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-gold-500" />
              </div>

              <label className="flex items-start gap-3 p-4 bg-jet-950/40 rounded border border-jet-800 cursor-pointer">
                <input type="checkbox" required className="mt-1 accent-gold-500" />
                <span className="text-xs text-jet-300 font-light leading-relaxed">
                  Autorizo el tratamiento de mis datos personales conforme a la{" "}
                  <a href="/politica-de-privacidad" className="text-gold-500 hover:underline" target="_blank">
                    Política de Privacidad
                  </a>{" "}
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
                  <><Mail className="w-5 h-5" /> Enviar solicitud</>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-jet-900 border border-jet-800 rounded p-6">
              <h3 className="font-display font-bold text-white text-sm mb-4">Canal directo</h3>
              <ul className="space-y-3 text-sm text-jet-300">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold-500" />
                  <span>+51 993 694 677</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold-500" />
                  <span>asistente.comercial@beyritech.com</span>
                </li>
              </ul>
              <a
                href="https://wa.me/51993694677?text=Hola,%20estoy%20interesado%20en%20una%20cotización%20de%20módulos%20modulares."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-[10px] rounded flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>

            <div className="bg-jet-900 border border-jet-800 rounded p-6">
              <h3 className="font-display font-bold text-white text-sm mb-4">Horario</h3>
              <p className="text-sm text-jet-300 font-light">
                Lunes a viernes: 8:00 a.m. – 6:00 p.m.<br />
                Sábados: 9:00 a.m. – 1:00 p.m.
              </p>
            </div>

            <div className="bg-jet-900 border border-jet-800 rounded p-6">
              <h3 className="font-display font-bold text-white text-sm mb-4">Ubicación</h3>
              <p className="text-sm text-jet-300 font-light">
                Av. Santa Elvira Mza. B Lote 8<br />
                Los Olivos, Lima – Perú
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
