import { Clock, DollarSign, Droplets, RotateCcw, VolumeX, Settings } from "lucide-react";
import ScrollReveal from "../hooks/ScrollReveal";

const rows = [
  {
    icon: Clock,
    criteria: "Tiempo de ejecución",
    modular: "Semanas",
    tradicional: "Meses",
    modularWidth: 25,
    tradicionalWidth: 90,
    detail: "Un módulo Multispace se despliega en 48h vs. 6+ meses de obra convencional",
  },
  {
    icon: DollarSign,
    criteria: "Predecibilidad de presupuesto",
    modular: "Alta",
    tradicional: "Baja",
    modularWidth: 90,
    tradicionalWidth: 30,
    detail: "Costo fijo por módulo. Sin sorpresas por demoras o materiales",
  },
  {
    icon: Droplets,
    criteria: "Trabajo húmedo en sitio",
    modular: "Mínimo",
    tradicional: "Extensivo",
    modularWidth: 15,
    tradicionalWidth: 85,
    detail: "Solo conexiones. Sin mezcla, curado ni secado en terreno",
  },
  {
    icon: RotateCcw,
    criteria: "Reubicabilidad",
    modular: "Se reinstala",
    tradicional: "Se demuele",
    modularWidth: 95,
    tradicionalWidth: 5,
    detail: "El módulo es un activo, no un gasto. Se muda con la operación",
  },
  {
    icon: VolumeX,
    criteria: "Impacto durante obra",
    modular: "Bajo",
    tradicional: "Alto",
    modularWidth: 15,
    tradicionalWidth: 85,
    detail: "Sin ruido, polvo ni interrupción de operaciones circundantes",
  },
  {
    icon: Settings,
    criteria: "Personalización",
    modular: "Alta",
    tradicional: "Media",
    modularWidth: 85,
    tradicionalWidth: 50,
    detail: "Interior configurable: sanitarios, baños, divisiones, acabados",
  },
];

export default function ComparisonTable() {
  return (
    <section className="py-24 relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:400px]">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-jet-950 via-jet-900 to-jet-950" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-500/3 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-500 font-semibold">
              Comparativa
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 tracking-tight text-white">
              Modular vs.{" "}
              <span className="text-jet-500 line-through decoration-2">Tradicional</span>
            </h2>
            <p className="text-jet-400 mt-5 font-sans text-base font-light leading-relaxed">
              La construcción modular supera a la obra tradicional en cada métrica que importa.
            </p>
          </div>
        </ScrollReveal>

        {/* Infographic rows */}
        <div className="space-y-8">
          {rows.map((row, i) => (
            <div key={i}>
              <ScrollReveal delay={i * 80}>
                <div className="group">
                  {/* Header with icon + criteria */}
                  <div className="flex items-center gap-3 mb-2">
                    <row.icon className="w-4 h-4 text-gold-500" />
                    <span className="font-display text-sm font-bold text-white">{row.criteria}</span>
                  </div>
                  {/* Detail text */}
                  <p className="text-[11px] text-jet-500 mb-3 ml-7 font-light">{row.detail}</p>

                  {/* Bars container */}
                  <div className="space-y-2 ml-7">
                    {/* Modular bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gold-500 w-20 shrink-0 text-right">Modular</span>
                      <div className="flex-1 h-7 bg-jet-800/50 rounded-full overflow-hidden relative">
                        <div
                          className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full flex items-center justify-end pr-3 animate-bar-grow"
                          style={{ width: `${row.modularWidth}%` }}
                        >
                          <span className="text-[10px] font-mono font-bold text-jet-950">{row.modular}</span>
                        </div>
                      </div>
                    </div>

                    {/* Traditional bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-jet-500 w-20 shrink-0 text-right">Tradicional</span>
                      <div className="flex-1 h-7 bg-jet-800/50 rounded-full overflow-hidden relative">
                        <div
                          className="h-full bg-jet-600 rounded-full flex items-center justify-end pr-3 animate-bar-grow"
                          style={{ width: `${row.tradicionalWidth}%`, animationDelay: `${0.15 + i * 0.08}s` }}
                        >
                          <span className="text-[10px] font-mono font-bold text-jet-300">{row.tradicional}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        {/* Legend */}
        <ScrollReveal>
          <div className="mt-12 flex items-center justify-center gap-8 text-xs text-jet-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gold-600 to-gold-400" />
              <span>Beyritech Modular</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-jet-600" />
              <span>Construcción tradicional</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
