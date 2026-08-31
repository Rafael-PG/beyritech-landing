import { FileDown, Mail, Users } from "lucide-react";
import type { ReactNode } from "react";
import MetricCard from "./MetricCard";
import { PieDonut, BarGrouped, GOLD, RED, GOLD_DARK, GOLD_MUTED } from "./Charts";
import { countBy, fmtDate, lastNDays, fmtShortDay } from "../../lib/chartUtils";
import type { FichaLeadRow } from "../../api/dashboard";

interface Props {
  fichas: FichaLeadRow[];
}

export default function DashboardFichas({ fichas }: Props) {
  const byModel = countBy(fichas, (f) => f.modelo || "sin modelo");
  const byPage = countBy(fichas, (f) => f.page || "sin página");
  const unique = new Set(fichas.map((f) => f.email)).size;

  const days = lastNDays(14);
  const series = days.map((d) => ({
    fecha: fmtShortDay(d),
    fichas: fichas.filter((f) => f.created_at.slice(0, 10) === d).length,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard label="Fichas descargadas" value={fichas.length} icon={FileDown} />
        <MetricCard label="Correos únicos" value={unique} icon={Users} />
        <MetricCard label="Correos capturados" value={fichas.length} icon={Mail} accent="text-[#e46d63]" />
      </div>

      <ChartCard title="Descargas por día (14 días)">
        <BarGrouped
          data={series}
          categories={[{ key: "fichas", color: GOLD, name: "Descargas" }]}
        />
      </ChartCard>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <ChartCard title="Por modelo">
          <PieDonut data={byModel} />
        </ChartCard>
        <ChartCard title="Por página">
          <PieDonut data={byPage} />
        </ChartCard>
      </div>

      <ChartCard title="Correos capturados">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-jet-800 text-[10px] font-mono uppercase tracking-widest text-jet-400">
                <th className="py-2 pr-4">Fecha</th>
                <th className="py-2 pr-4">Correo</th>
                <th className="py-2 pr-4">Modelo</th>
                <th className="py-2">Página</th>
              </tr>
            </thead>
            <tbody>
              {fichas.slice(0, 20).map((f) => (
                <tr key={f.idFichaLead} className="border-b border-jet-800/40">
                  <td className="py-2.5 pr-4 text-jet-300 whitespace-nowrap">{fmtDate(f.created_at)}</td>
                  <td className="py-2.5 pr-4 text-gold-500 break-all">{f.email}</td>
                  <td className="py-2.5 pr-4 text-jet-300">{f.modelo}</td>
                  <td className="py-2.5 text-jet-300">{f.page || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-jet-900/60 border border-jet-800/70 p-5">
      <h3 className="font-display font-bold text-white text-sm mb-4">{title}</h3>
      {children}
    </div>
  );
}
