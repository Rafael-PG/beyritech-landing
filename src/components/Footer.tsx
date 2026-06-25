import React from "react";
import { Mail, Phone, MapPin, Globe, ArrowUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { isLight } = useTheme();
  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-jet-950 text-white pt-20 pb-10 border-t border-jet-900 relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:600px]">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src={isLight ? "/logo/beyritech-logo-light.webp" : "/logo/beyritech-logo.webp"}
                alt="Beyritech"
                width="45" height="36"
                className="h-9 w-auto"
              />
            </div>
            
            <p className="text-xs text-jet-300 font-light leading-relaxed">
              Ingeniería volumétrica avanzada en **Módulos Multipropósito** para minería, infraestructura industrial, sanidad y sectores corporativos premium de alta velocidad.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-jet-300 font-mono">
              <Globe className="w-3.5 h-3.5 text-gold-500" />
              <span>Español | Latin América</span>
            </div>
          </div>

          {/* Links Col 1 */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-gold-500">
              Líneas de Negocio
            </h4>
            <ul className="space-y-2.5 text-xs text-jet-300 font-light">
              <li><a href="#why-choose-us" className="hover:text-gold-500 transition-colors">Campamentos Mineros</a></li>
              <li><a href="#why-choose-us" className="hover:text-gold-500 transition-colors">Oficinas Corporativas Modulares</a></li>
              <li><a href="#why-choose-us" className="hover:text-gold-500 transition-colors">Módulos Hospitalarios / Clínicas</a></li>
              <li><a href="#why-choose-us" className="hover:text-gold-500 transition-colors">Aulas y Módulos de Educación</a></li>
              <li><a href="#why-choose-us" className="hover:text-gold-500 transition-colors">Bodegas e Infraestructura Industrial</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-gold-500">
              Pilares Técnicos
            </h4>
            <ul className="space-y-2.5 text-xs text-jet-300 font-light">
              <li><a href="#sustainability" className="hover:text-gold-500 transition-colors">Eficiencia Sostenible R-32</a></li>
              <li><a href="#speed" className="hover:text-gold-500 transition-colors">Montaje Veloz Off-site</a></li>
              <li><a href="#logistics" className="hover:text-gold-500 transition-colors">Logística de Carga Intermodal</a></li>
              <li><a href="#process" className="hover:text-gold-500 transition-colors">Proceso de Ingeniería 4 Pasos</a></li>
              <li><a href="#projects" className="hover:text-gold-500 transition-colors">Estudios de Caso y Planos CAD</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-gold-500">
              Oficina Central
            </h4>
            <ul className="space-y-3 text-xs text-jet-300 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                <span>Av. Vitacura 2670, Las Condes, Santiago, Chile</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+56 2 2400 9000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>proyectos@beyritech.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-jet-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-jet-300 font-light">
          <div>
            <p>© {new Date().getFullYear()} Beyritech Modular Systems S.A. Todos los derechos reservados.</p>
            <p className="text-[10px] text-jet-300 mt-1">
              Optimizado para motores de búsqueda con foco en **Módulos Multipropósito** e ingeniería modular de alto desempeño.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#faq" className="hover:text-gold-500 transition-colors">Términos y Condiciones</a>
            <a href="#faq" className="hover:text-gold-500 transition-colors">Políticas de Privacidad</a>
            
            <button
              onClick={handleScrollToTop}
              className="w-8 h-8 rounded bg-jet-900 border border-jet-800 flex items-center justify-center text-gold-500 hover:text-jet-950 hover:bg-gold-500 transition-all duration-300"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
