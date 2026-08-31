import { useMemo } from "react";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { analyzeSeo, type SeoInput, type SeoStatus } from "../../lib/seo-check";

interface AdminSeoPanelProps extends SeoInput {}

const STATUS_META: Record<SeoStatus, { icon: any; color: string; text: string }> = {
  pass: { icon: CheckCircle2, color: "text-green-400", text: "text-green-300" },
  warn: { icon: AlertTriangle, color: "text-amber-400", text: "text-amber-300" },
  fail: { icon: XCircle, color: "text-[#e46d63]", text: "text-[#e46d63]" },
};

function scoreColor(score: number): { bar: string; label: string; message: string } {
  if (score >= 80) return { bar: "bg-green-400", label: "text-green-400", message: "Excelente SEO" };
  if (score >= 50) return { bar: "bg-amber-400", label: "text-amber-400", message: "Mejorable" };
  return { bar: "bg-[#e46d63]", label: "text-[#e46d63]", message: "Necesita atención" };
}

export default function AdminSeoPanel({ title, keywords, excerpt, content }: AdminSeoPanelProps) {
  const result = useMemo(
    () => analyzeSeo({ title: title || "", keywords: keywords || "", excerpt: excerpt || "", content: content || "" }),
    [title, keywords, excerpt, content]
  );

  const color = scoreColor(result.score);

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className="flex items-center gap-5">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 100 100" className="w-24 h-24 -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" strokeWidth="10" className="stroke-jet-800" />
            <circle
              cx="50" cy="50" r="42" fill="none" strokeWidth="10" strokeLinecap="round"
              className={color.bar}
              strokeDasharray={2 * Math.PI * 42}
              strokeDashoffset={2 * Math.PI * 42 * (1 - result.score / 100)}
              style={{ transition: "stroke-dashoffset 500ms ease" }}
            />
          </svg>
          <span className={`absolute inset-0 flex items-center justify-center font-display text-2xl font-bold ${color.label}`}>
            {result.score}
          </span>
        </div>
        <div>
          <p className={`font-display text-lg font-bold ${color.label}`}>{color.message}</p>
          <p className="text-xs font-mono text-jet-400 mt-1 uppercase tracking-wider">
            Puntuación SEO
          </p>
        </div>
      </div>

      {/* Métricas */}
      <ul className="space-y-2">
        {result.metrics.map((m, i) => {
          const meta = STATUS_META[m.status];
          const Icon = meta.icon;
          return (
            <li key={i} className="border border-jet-800/70 bg-jet-900/40 p-3">
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 shrink-0 ${meta.color}`} />
                <span className="flex-1 text-sm text-jet-200">{m.label}</span>
                <span className="text-[10px] font-mono text-jet-500 uppercase tracking-wider">{m.value}</span>
              </div>
              <p className={`text-xs mt-1 ml-6.5 ${meta.text}`}>{m.message}</p>
              {m.suggestion && (
                <div className="mt-2 ml-6.5 border-l-2 border-gold-500/40 pl-3">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-jet-500">Sugerencia</p>
                  <p className="text-xs text-jet-300 font-light">{m.suggestion}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Guía rápida */}
      <div className="border border-jet-800/70 bg-jet-900/40 p-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-jet-500 mb-2">Guía rápida</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-jet-300 font-light">
          <li>• Título de 50–60 caracteres</li>
          <li>• 1 H1 y 2+ H2</li>
          <li>• Alt en las imágenes</li>
          <li>• Links internos</li>
          <li>• 300+ palabras</li>
          <li>• Keyword en título y texto</li>
        </ul>
      </div>
    </div>
  );
}
