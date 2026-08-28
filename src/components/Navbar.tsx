import { useState, useEffect, useCallback, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import Sun from "lucide-react/dist/esm/icons/sun";
import Moon from "lucide-react/dist/esm/icons/moon";
import { useTheme } from "../context/ThemeContext";

const NAV_LINKS = [
  { name: "Soluciones", href: "/soluciones" },
  { name: "Modelos", href: "/modelos" },
  { name: "Proceso", href: "/proceso" },
  { name: "Proyectos", href: "/casos-de-exito" },
  { name: "Blog", href: "/blog" },
  { name: "Nosotros", href: "/nosotros" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLight, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleScrollToTop = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      {/* Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isScrolled ? "opacity-100 bg-jet-900 border-b border-jet-800/80 shadow-lg" : "opacity-0"
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand */}
        <Link
          to="/"
          onClick={handleScrollToTop}
          className="flex items-center gap-3 group"
        >
          <img
            src={isLight ? "/logo/beyritech-logo-light.webp" : "/logo/beyritech-logo.webp"}
            alt="Logo Beyritech — Módulos Multipropósito"
            width="80" height="64"
            className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
            fetchpriority="high"
            loading="eager"
          />
        </Link>

        {/* Desktop Nav */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.href || location.pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`relative font-sans text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-gold-500" : "text-jet-100 hover:text-gold-500"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side: CTA + theme toggle */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/contacto"
            className="px-5 py-2.5 bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-xs rounded transition-all duration-200 shadow-md shadow-gold-500/15"
          >
            Cotizar
          </Link>

          <button
            id="theme-toggle"
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-jet-800 transition-colors text-jet-300 hover:text-gold-500"
            aria-label={isLight ? "Activar modo oscuro" : "Activar modo claro"}
          >
            {isLight ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile: CTA + theme + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/contacto"
            className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-jet-950 font-bold uppercase tracking-wider text-[10px] rounded"
          >
            Cotizar
          </Link>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-jet-800 transition-colors text-jet-300"
            aria-label={isLight ? "Activar modo oscuro" : "Activar modo claro"}
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-gold-500 transition-colors p-2"
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-nav-menu"
        className={`lg:hidden absolute top-full left-0 right-0 bg-jet-950/98 border-b border-jet-800 p-6 flex flex-col gap-5 shadow-2xl backdrop-blur-lg transition-all duration-200 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.href;
          return (
            <Link
              key={link.name}
              to={link.href}
              className={`text-lg font-medium py-2 border-b border-jet-900 transition-colors ${
                isActive ? "text-gold-500" : "text-jet-100 hover:text-gold-500"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
