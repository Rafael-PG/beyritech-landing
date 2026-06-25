import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FAQItem, Testimonial } from "../types";
import { ChevronDown, ChevronUp, Star, Quote, ShieldCheck } from "lucide-react";

const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Ing. Alejandro Ruiz",
    role: "Director de Infraestructura y Logística",
    company: "Consorcio Minero del Sur",
    quote: "Trabajar con Beyritech transformó completamente nuestra logística de campamentos. Logramos albergar a 1,200 operadores en un tiempo récord de 24 días a más de 4,000 metros de altitud. La respuesta térmica del PIR de 100mm en climas de helada extrema es sencillamente insuperable. Un estándar de ingeniería comparable a Caterpillar.",
    rating: 5
  },
  {
    id: "test-2",
    name: "Arq. Valeria Constantini",
    role: "Gerente de Proyectos y Sustentabilidad",
    company: "Desarrollos Inmobiliarios Globales",
    quote: "El diseño estético de Beyritech (con acabados de madera termotratada y cristal) demostró que modular no equivale a sacrificios visuales. El edificio de oficinas corporativas de tres niveles se erigió un 60% más rápido que la estructura tradicional. Recibimos la certificación LEED Oro gracias a la eficiencia energética pasiva y nulo desperdicio de obra.",
    rating: 5
  },
  {
    id: "test-3",
    name: "Dr. Eduardo Mendoza",
    role: "Director de Operaciones Médicas",
    company: "Clínicas Móviles de Emergencia",
    quote: "Desplegamos 4 clínicas sanitarias modulares Beyritech durante la crisis climática en el norte. La estanqueidad del aire, el revestimiento antibacteriano interno y las facilidades para integrar sistemas de presión negativa hicieron posible contar con salas de cirugía seguras operativas en 72 horas. Profesionalismo absoluto.",
    rating: 5
  }
];

const faqs: FAQItem[] = [
  {
    category: "Estructural",
    question: "¿Cuál es la vida útil estimada de los módulos Beyritech?",
    answer: "Nuestros módulos están calculados con perfiles de acero pesado galvanizado y multi-capa de protección C5-M, garantizando una vida útil de más de 50 años bajo mantenimiento preventivo estándar, superando a las construcciones tradicionales expuestas a salinidad o humedad severa."
  },
  {
    category: "Seguridad",
    question: "¿Qué resistencia sísmica y contra ráfagas de viento poseen?",
    answer: "Cada módulo cuenta con un diseño estructural optimizado bajo normas de sismicidad severa. Tienen certificación estructural sísmica Clase A y están dimensionados para resistir ráfagas de viento laterales sostenidas de hasta 180 km/h, habituales en costas y cumbres andinas."
  },
  {
    category: "Logística",
    question: "¿Los módulos son reubicables después de instalados?",
    answer: "Sí. Esa es una de las mayores ventajas financieras. Toda la estructura está unida por sistemas de fijación y pernos de alta resistencia de grado estructural. El módulo puede ser desarmado, cargado en fletes intermodales estándar e instalado en un nuevo emplazamiento con un 98% de recuperación de los componentes originales."
  },
  {
    category: "Térmica",
    question: "¿Cómo se comporta el aislamiento en temperaturas extremas?",
    answer: "Utilizamos núcleos de poliisocianurato (PIR) de alta densidad (40 kg/m³) de 100mm de espesor en muros y techos, logrando una resistencia térmica de R-32+. Esto bloquea el frío extremo de alta montaña (hasta -20°C) y la radiación solar extrema de zonas desérticas (hasta 45°C), reduciendo el gasto eléctrico de climatización un 45%."
  },
  {
    category: "Normativa",
    question: "¿Cumplen con las normativas sanitarias y laborales mineras?",
    answer: "Totalmente. Beyritech cumple con los estándares exigidos por la legislación laboral minera internacional (habitabilidad, espacios mínimos por operador, aislación acústica de dormitorios) e higiénico-sanitarios para clínicas, casinos y laboratorios químicos."
  }
];

export default function FaqTestimonials() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);

  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
      setDirection(1);
    }, 7000);
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  const [direction, setDirection] = useState(0);
  const pointerStart = useRef<number | null>(null);

  const goNext = useCallback(() => {
    setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    setDirection(1);
    startAutoPlay();
  }, [startAutoPlay, testimonials.length]);

  const goPrev = useCallback(() => {
    setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setDirection(-1);
    startAutoPlay();
  }, [startAutoPlay, testimonials.length]);

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStart.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (pointerStart.current === null) return;
    const delta = e.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(delta) > 50) {
      if (delta > 0) goPrev();
      else goNext();
    }
  };

  const handleDotClick = (idx: number) => {
    setDirection(idx > activeTestimonial ? 1 : -1);
    setActiveTestimonial(idx);
    startAutoPlay();
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-jet-900 text-white relative [content-visibility:auto] [contain-intrinsic-size:600px]">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Testimonials Section */}
        <div id="testimonials" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
              Validación en el Terreno
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
              Testimonios de Clientes Corporativos
            </h2>
            <p className="text-jet-300 mt-4 font-sans text-base font-light">
              La confianza de los directores de proyectos es nuestro activo más valioso. Descubra lo que opinan los líderes de la industria.
            </p>
          </div>

          {/* Testimonials Slider Component */}
          <div
            className="max-w-4xl mx-auto bg-jet-950 border border-jet-800 rounded-lg p-8 sm:p-12 relative shadow-2xl select-none"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => { pointerStart.current = null; }}
            onMouseEnter={stopAutoPlay}
            onMouseLeave={startAutoPlay}
            style={{ touchAction: "pan-y" }}
          >
            <Quote className="absolute top-6 left-6 w-16 h-16 text-gold-500/10 pointer-events-none" />
            
            {/* Active quote container */}
            <div className="space-y-6 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeTestimonial}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {/* Rating stars */}
                  <div className="flex gap-1">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                    ))}
                  </div>

                  {/* Quote text */}
                  <p className="font-sans text-lg sm:text-xl text-jet-100 font-light italic leading-relaxed">
                    "{testimonials[activeTestimonial].quote}"
                  </p>

                  {/* Author details */}
                  <div className="flex justify-between items-end pt-6 border-t border-jet-800">
                    <div>
                      <h3 className="font-display font-bold text-white text-base">
                        {testimonials[activeTestimonial].name}
                      </h3>
                      <p className="text-xs text-gold-500 font-mono mt-0.5">
                        {testimonials[activeTestimonial].role}
                      </p>
                      <p className="text-xs text-jet-300 mt-0.5">
                        {testimonials[activeTestimonial].company}
                      </p>
                    </div>
                    
                    {/* Dots indicators */}
                    <div className="flex gap-2 mb-2">
                      {testimonials.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleDotClick(idx)}
                          className={`h-6 rounded-full transition-all duration-300 ${
                            activeTestimonial === idx ? "w-8 bg-gold-500" : "w-6 bg-jet-800"
                          }`}
                          aria-label={`Ir al testimonio ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="pt-12 border-t border-jet-800/60">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
              Consultas Técnicas Frecuentes
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
              Respuestas a Cuestiones Críticas
            </h2>
            <p className="text-jet-300 mt-4 font-sans text-base font-light">
              Respuestas directas y de ingeniería para directores, constructores y compradores corporativos de módulos multipropósito.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                  <div
                    key={idx}
                    className="bg-jet-950 border border-jet-800 rounded overflow-hidden"
                  >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-6 flex justify-between items-center gap-4 hover:bg-jet-950/80 transition-colors"
                  >
                    <div className="flex gap-3 items-center">
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-jet-900 border border-jet-800 text-gold-500 rounded uppercase">
                        {faq.category}
                      </span>
                      <span className="font-display font-bold text-sm sm:text-base text-white hover:text-gold-500 transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-gold-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-jet-300 shrink-0" />
                    )}
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden min-h-0">
                      <div className="border-t border-jet-900 p-6 text-sm text-jet-300 font-light leading-relaxed bg-jet-950/40 flex gap-3">
                        <ShieldCheck className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
