import React, { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { name: "Características", href: "#why-choose-us" },
  { name: "Modelos", href: "#models" },
  { name: "Pilares", href: "#speed-sustainability-logistics" },
  { name: "Proceso", href: "#process" },
  { name: "Proyectos", href: "#projects" },
  { name: "FAQ", href: "#faq" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        const sectionIds = NAV_LINKS.map(l => l.href.slice(1));
        let found = false;
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const el = document.getElementById(sectionIds[i]);
          if (el && el.getBoundingClientRect().top <= 120) {
            setActiveSection(prev => prev !== sectionIds[i] ? sectionIds[i] : prev);
            found = true;
            break;
          }
        }
        if (!found) {
          setActiveSection(prev => prev !== "" ? "" : prev);
        }
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const offset = 80;
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
  }, []);

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
            width="50" height="40"
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop Links */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
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

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 lg:hidden">
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
          {NAV_LINKS.map((link) => (
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
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}
