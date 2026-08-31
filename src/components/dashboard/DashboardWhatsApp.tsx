import { MousePointerClick, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import MetricCard from "./MetricCard";
import { BarGrouped, PieDonut, GOLD, RED } from "./Charts";
import { countBy, fmtDate } from "../../lib/chartUtils";
import type { WhatsappClickRow, WhatsappLeadRow } from "../../api/dashboard";

interface Props {
  clicks: WhatsappClickRow[];
  leads: WhatsappLeadRow[];
}

export default function DashboardWhatsApp({ clicks, leads }: Props) {
  const clickByPage = countBy(clicks, (c) => c.page || "sin página");
  const leadByService = countBy(leads, (l) => l.modelo || "sin modelo");
  const leadByPage = countBy(leads, (l) => l.page || "sin página");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard label="Clicks totales" value={clicks.length} icon={MousePointerClick} />
        <MetricCard label="Leads enviados" value={leads.length} icon={MessageCircle} />
        <MetricCard label="Tasa de conversión" value={clicks.length ? `${Math.round((leads.length / clicks.length) * 100)}%` : "—"} icon={MousePointerClick} accent="text-[#e46d63]" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <ChartCard title="Clicks por página">
          <PieDonut data={clickByPage} />
        </ChartCard>
        <ChartCard title="Leads por modelo">
          <PieDonut data={leadByService} />
        </ChartCard>
      </div>

      <ChartCard title="Leads por página">
        <div className="h-56">
          <Table data={leadByPage} color="#e46d63" />
        </div>
      </ChartCard>

      <ChartCard title="Últimos leads de WhatsApp">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-jet-800 text-[10px] font-mono uppercase tracking-widest text-jet-400">
                <th className="py-2 pr-4">Fecha</th>
                <th className="py-2 pr-4">Modelo</th>
                <th className="py-2 pr-4">Página</th>
                <th className="py-2">Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 15).map((l) => (
                <tr key={l.idWspLead} className="border-b border-jet-800/40">
                  <td className="py-2.5 pr-4 text-jet-300 whitespace-nowrap">{fmtDate(l.created_at)}</td>
                  <td className="py-2.5 pr-4 text-gold-500">{l.modelo}</td>
                  <td className="py-2.5 pr-4 text-jet-300">{l.page || "—"}</td>
                  <td className="py-2.5 text-jet-300 max-w-[300px] truncate">{l.message || "—"}</td>
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

function Table({ data, color }: { data: { name: string; value: number }[]; color?: string }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="space-y-2">
      {data.slice(0, 10).map((d) => (
        <div key={d.name} className="flex items-center gap-3">
          <span className="w-32 text-xs font-mono text-jet-300 truncate">{d.name}</span>
          <div className="flex-1 h-5 bg-jet-950 border border-jet-800 relative">
            <div
              className="h-full"
              style={{ width: `${(d.value / max) * 100}%`, backgroundColor: color || GOLD }}
            />
          </div>
          <span className="w-8 text-right text-xs font-mono text-white">{d.value}</span>
        </div>
      ))}
    </div>
  );
}
