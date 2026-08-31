import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  delta?: string;
  accent?: string;
}

export default function MetricCard({ label, value, icon: Icon, delta, accent = "text-gold-500" }: MetricCardProps) {
  return (
    <div className="relative bg-jet-900/60 border border-jet-800/70 p-5">
      <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-gold-500/30" />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-jet-400">{label}</p>
          <p className="text-3xl font-display font-bold text-white mt-2">{value}</p>
          {delta && <p className="text-[11px] font-mono text-jet-400 mt-1">{delta}</p>}
        </div>
        <div className={`p-2.5 border border-jet-800 ${accent}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
