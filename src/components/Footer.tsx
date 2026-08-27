import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe, ArrowUp } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { isLight } = useTheme();
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-jet-950 text-white pt-20 pb-10 border-t border-jet-900 relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:600px]">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={isLight ? "/logo/beyritech-logo-light.webp" : "/logo/beyritech-logo.webp"}
                alt="Beyritech — Fabricantes de Módulos Multipropósito"
                width="45" height="36"
                className="h-9 w-auto"
                loading="lazy"
              />
            </Link>
            <p className="text-xs text-jet-300 font-light leading-relaxed">
              Fabricación nacional de módulos prefabricados de alta performance
              para agroindustria, logística, corporaciones y salud.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-jet-300 font-mono">
              <Globe className="w-3.5 h-3.5 text-gold-500" />
              <span>Español | Latin América</span>
            </div>
          </div>

          {/* Productos */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-gold-500">
              Modelos
            </h4>
            <ul className="space-y-2.5 text-xs text-jet-300 font-light">
              <li><Link to="/modelos/multispace" className="hover:text-gold-500 transition-colors">Multispace</Link></li>
              <li><Link to="/modelos/doble-ala" className="hover:text-gold-500 transition-colors">Doble Ala</Link></li>
              <li><Link to="/modelos/mini-doble-ala" className="hover:text-gold-500 transition-colors">Mini Doble Ala</Link></li>

            </ul>
          </div>

          {/* Sectores */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-gold-500">
              Sectores
            </h4>
            <ul className="space-y-2.5 text-xs text-jet-300 font-light">
              <li><Link to="/soluciones/agroindustria" className="hover:text-gold-500 transition-colors">Agroindustria</Link></li>
              <li><Link to="/soluciones/logistica-almacenes" className="hover:text-gold-500 transition-colors">Logística y Almacenes</Link></li>
              <li><Link to="/soluciones/obra-construccion" className="hover:text-gold-500 transition-colors">Obra y Construcción</Link></li>
              <li><Link to="/soluciones/corporativo" className="hover:text-gold-500 transition-colors">Corporativo</Link></li>
              <li><Link to="/soluciones/educacion" className="hover:text-gold-500 transition-colors">Educación</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-gold-500">
              Empresa
            </h4>
            <ul className="space-y-2.5 text-xs text-jet-300 font-light">
              <li><Link to="/nosotros" className="hover:text-gold-500 transition-colors">Sobre nosotros</Link></li>
              <li><Link to="/casos-de-exito" className="hover:text-gold-500 transition-colors">Casos de éxito</Link></li>
              <li><Link to="/blog" className="hover:text-gold-500 transition-colors">Blog técnico</Link></li>
              <li><Link to="/recursos" className="hover:text-gold-500 transition-colors">Recursos y descargas</Link></li>
              <li><Link to="/contacto" className="hover:text-gold-500 transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4">
            <h4 className="font-display text-xs font-bold uppercase tracking-widest text-gold-500">
              Contacto
            </h4>
            <ul className="space-y-3 text-xs text-jet-300 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                <span>Av. Santa Elvira Mza. B Lote 8, Los Olivos, Lima</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+51 993 694 677</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span>asistente.comercial@beyritech.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-jet-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-jet-300 font-light">
          <p>© {new Date().getFullYear()} Beyritech Modular Systems S.A.C. Todos los derechos reservados.</p>

          <div className="flex items-center gap-6">
            <Link to="/terminos-y-condiciones" className="hover:text-gold-500 transition-colors">Términos y Condiciones</Link>
            <Link to="/politica-de-privacidad" className="hover:text-gold-500 transition-colors">Políticas de Privacidad</Link>

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
