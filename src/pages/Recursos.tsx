import React, { useState } from "react";
import { Download, FileText, Mail, ArrowRight } from "lucide-react";
import SEO from "../components/SEO";
import ScrollReveal from "../hooks/ScrollReveal";

interface Resource {
  title: string;
  description: string;
  type: string;
  slug: string;
}

const resources: Resource[] = [
  {
    title: "Catálogo General Beyritech",
    description: "Presentación completa de módulos, especificaciones y casos de uso por sector.",
    type: "PDF",
    slug: "catalogo-general",
  },
  {
    title: "Ficha Técnica — Multispace",
    description: "Especificaciones detalladas, planos CAD y memoria descriptiva del modelo Multispace.",
    type: "PDF",
    slug: "ficha-multispace",
  },
  {
    title: "Ficha Técnica — Doble Ala",
    description: "Especificaciones detalladas, planos CAD y memoria descriptiva del modelo Doble Ala.",
    type: "PDF",
    slug: "ficha-doble-ala",
  },
  {
    title: "Ficha Técnica — Mini Doble Ala",
    description: "Especificaciones detalladas, planos CAD y memoria descriptiva del modelo Mini Doble Ala.",
    type: "PDF",
    slug: "ficha-mini-doble-ala",
  },
  {
    title: "Ficha Técnica — Almacén",
    description: "Especificaciones detalladas, planos CAD y memoria descriptiva del modelo Almacén.",
    type: "PDF",
    slug: "ficha-almacen",
  },
  {
    title: "Guía de Preparación de Terreno",
    description: "Requisitos mínimos de terreno, cimentación y acceso para la instalación de módulos.",
    type: "PDF",
    slug: "guia-terreno",
  },
];

export default function Recursos() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);

  const handleDownload = (slug: string) => {
    setPendingSlug(slug);
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    // In production, this would trigger an email send + download link
  };

  return (
    <>
      <SEO
        title="Recursos y Descargas — Fichas Técnicas y Catálogos"
        description="Descargue fichas técnicas, catálogos y guías de preparación de terreno para módulos Beyritech."
        url="/recursos"
      />

      <section className="min-h-screen bg-jet-950 text-white pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="mb-12">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
                Centro de Descargas
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold mt-3 tracking-tight">
                Recursos <span className="text-gold-500">técnicos</span>
              </h1>
              <div className="w-16 h-[2px] bg-gold-500 mt-6" />
              <p className="text-jet-300 mt-4 max-w-2xl font-light leading-relaxed">
                Fichas técnicas, catálogos y guías para la planificación de su proyecto. Deje su correo para recibir los documentos.
              </p>
            </div>
          </ScrollReveal>

          {/* Email Form (shown when a download is requested) */}
          {pendingSlug && !submitted && (
            <ScrollReveal>
              <div className="bg-jet-900 border border-gold-500/30 rounded-xl p-8 mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-gold-500" />
                  <h3 className="font-display text-lg font-bold text-white">Reciba el documento por correo</h3>
                </div>
                <p className="text-sm text-jet-300 font-light mb-6">
                  Ingrese su correo electrónico y le enviaremos un enlace de descarga para <strong className="text-white">{resources.find(r => r.slug === pendingSlug)?.title}</strong>.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@empresa.com"
                    required
                    className="flex-1 px-4 py-3 bg-jet-950 border border-jet-700 rounded text-white text-sm font-light focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-xs rounded transition-colors"
                  >
                    Enviar enlace
                  </button>
                </form>
                <button
                  onClick={() => setPendingSlug(null)}
                  className="text-xs text-jet-400 hover:text-white mt-3 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </ScrollReveal>
          )}

          {submitted && (
            <ScrollReveal>
              <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-xl p-8 mb-10 text-center">
                <p className="text-emerald-400 font-medium mb-2">Enlace de descarga enviado</p>
                <p className="text-sm text-jet-300 font-light">Revise su bandeja de entrada ({email}). El enlace expira en 24 horas.</p>
                <button
                  onClick={() => { setSubmitted(false); setPendingSlug(null); setEmail(""); }}
                  className="text-xs text-gold-500 hover:text-gold-400 mt-4 transition-colors"
                >
                  Volver a recursos
                </button>
              </div>
            </ScrollReveal>
          )}

          {/* Resource Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, i) => (
              <div key={i}>
              <ScrollReveal delay={i * 80}>
                <div className="h-full bg-jet-900 border border-jet-800 rounded-xl p-6 flex flex-col hover:border-gold-500/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-500 mb-4">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-sm font-bold text-white mb-2">{resource.title}</h3>
                  <p className="text-xs text-jet-400 font-light leading-relaxed mb-4 flex-1">{resource.description}</p>
                  <button
                    onClick={() => handleDownload(resource.slug)}
                    className="w-full px-4 py-2.5 border border-jet-700 hover:border-gold-500/50 text-jet-300 hover:text-white font-mono text-[10px] uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3 h-3" /> Descargar {resource.type}
                  </button>
                </div>
              </ScrollReveal>
              </div>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal>
            <div className="mt-16 text-center bg-jet-900 border border-jet-800 rounded-xl p-10">
              <h3 className="font-display text-xl font-bold text-white mb-3">
                ¿Necesita información adicional?
              </h3>
              <p className="text-jet-300 font-light mb-6 max-w-lg mx-auto">
                Contáctenos para planos CAD personalizados, memoria descriptiva o asesoría técnica específica.
              </p>
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-sm rounded transition-colors"
              >
                Contactar asesoría <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
