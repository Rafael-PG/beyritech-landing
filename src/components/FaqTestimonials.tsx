import { useState } from "react";
import { ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import { faqs } from "../data/faq";

export default function FaqTestimonials() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-[#050505] text-white relative [content-visibility:auto] [contain-intrinsic-size:600px]">
      {/* Grid texture background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FEC93406_1px,transparent_1px),linear-gradient(to_bottom,#FEC93406_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-500 font-semibold">
            Preguntas Frecuentes
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 tracking-tight">
            Respuestas Directas
          </h2>
          <p className="text-jet-300 mt-4 font-sans text-base font-light">
            Respuestas de ingeniería para directores, constructores y compradores corporativos.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <article
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
