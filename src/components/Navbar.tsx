import React, { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.slice(1));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Características", href: "#why-choose-us" },
    { name: "Sostenibilidad", href: "#sustainability" },
    { name: "Velocidad", href: "#speed" },
    { name: "Proceso", href: "#process" },
    { name: "Proyectos", href: "#projects" },
    { name: "FAQ", href: "#faq" }
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      {/* Always-present background with opacity transition */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isScrolled ? "opacity-100 bg-jet-900 border-b border-jet-800/80 shadow-lg" : "opacity-0"
        }`}
      />
      
      <div className="relative max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <a
          id="brand-logo"
          href="#"
          onClick={(e) => handleScrollTo(e, "#root")}
          className="flex items-center gap-3 group"
        >
          <img
            src="/logo/beyritech-logo.png?v=2"
            alt="Beyritech"
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop Links */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase()}`}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`relative font-sans text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-gold-500" : "text-jet-100 hover:text-gold-500"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gold-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Lang */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-xs text-jet-300 font-mono">
            <Globe className="w-3.5 h-3.5 text-gold-500" />
            <span>ESP</span>
          </div>
          <a
            id="nav-cta-btn"
            href="#estimator"
            onClick={(e) => handleScrollTo(e, "#estimator")}
            className="px-5 py-2.5 rounded bg-gold-500 hover:bg-gold-600 text-jet-950 font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-gold-500/10 hover:shadow-gold-500/20 active:translate-y-px"
          >
            Cotizar Proyecto
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 lg:hidden">
          <a
            id="mobile-quick-cta"
            href="#estimator"
            onClick={(e) => handleScrollTo(e, "#estimator")}
            className="px-3 py-1.5 rounded bg-gold-500 text-jet-950 font-bold text-xs uppercase tracking-wider"
          >
            Cotizar
          </a>
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-gold-500 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="lg:hidden absolute top-full left-0 right-0 bg-jet-950/98 border-b border-jet-800 p-6 flex flex-col gap-5 shadow-2xl backdrop-blur-lg"
          >
          {navLinks.map((link) => (
            <a
              key={link.name}
              id={`mobile-nav-link-${link.name.toLowerCase()}`}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-lg font-medium text-jet-100 hover:text-gold-500 py-2 border-b border-jet-900"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-1.5 text-sm text-jet-300 font-mono">
              <Globe className="w-4 h-4 text-gold-500" />
              <span>Español (ES)</span>
            </div>
            <a
              id="mobile-menu-cta"
              href="#estimator"
              onClick={(e) => handleScrollTo(e, "#estimator")}
              className="px-6 py-3 rounded bg-gold-500 text-jet-950 font-bold text-sm uppercase tracking-wider text-center"
            >
              Solicitar Cotización
            </a>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}
