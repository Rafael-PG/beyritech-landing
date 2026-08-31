import { MousePointerClick, MessageCircle, FileDown, Users } from "lucide-react";
import type { ReactNode } from "react";
import MetricCard from "./MetricCard";
import { AreaLines, PieDonut, BarGrouped, GOLD, RED } from "./Charts";
import { countBy, lastNDays, groupSeries, fmtShortDay } from "../../lib/chartUtils";
import type { WhatsappClickRow, WhatsappLeadRow, FichaLeadRow } from "../../api/dashboard";

interface Props {
  clicks: WhatsappClickRow[];
  leads: WhatsappLeadRow[];
  fichas: FichaLeadRow[];
}

export default function DashboardGeneral({ clicks, leads, fichas }: Props) {
  const days = lastNDays(14);
  const all = (rows: { created_at: string }[]) => {
    const grouped = groupSeries(rows, (r) => {
      const d = new Date(r.created_at);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    });
    const map = new Map(grouped.map((g) => [g.fecha, g] as [string, any]));
    return days.map((d) => ({ fecha: fmtShortDay(d), value: (map.get(d) as any)?.value || 0 }));
  };

  const clicksSeries = days.map((d) => {
    const key = `${d}`;
    const same = clicks.filter((c) => c.created_at.slice(0, 10) === d);
    return { fecha: fmtShortDay(d), clicked: same.length };
  });

  const leadsSeries = days.map((d) => ({
    fecha: fmtShortDay(d),
    leads: leads.filter((l) => l.created_at.slice(0, 10) === d).length,
  }));

  const fichasSeries = days.map((d) => ({
    fecha: fmtShortDay(d),
    fichas: fichas.filter((f) => f.created_at.slice(0, 10) === d).length,
  }));

  const clickByPage = countBy(clicks, (c) => c.page || "sin página");
  const leadByService = countBy(leads, (l) => l.modelo || "sin modelo");
  const fichaByModel = countBy(fichas, (f) => f.modelo || "sin modelo");

  const totalLeads = leads.length + fichas.length;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard label="Clicks WhatsApp" value={clicks.length} icon={MousePointerClick} />
        <MetricCard label="Leads WhatsApp" value={leads.length} icon={MessageCircle} />
        <MetricCard label="Fichas descargadas" value={fichas.length} icon={FileDown} />
        <MetricCard label="Leads totales" value={totalLeads} icon={Users} accent="text-[#e46d63]" />
      </div>

      {/* Chart: actividad por día */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <ChartCard title="Actividad — WhatsApp" subtitle="Clicks y leads por día (14 días)">
          <BarGrouped
            data={days.map((d) => ({
              fecha: fmtShortDay(d),
              Clicks: clicks.filter((c) => c.created_at.slice(0, 10) === d).length,
              Leads: leads.filter((l) => l.created_at.slice(0, 10) === d).length,
            }))}
            categories={[
              { key: "Clicks", color: GOLD, name: "Clicks" },
              { key: "Leads", color: RED, name: "Leads" },
            ]}
          />
        </ChartCard>

        <ChartCard title="Descargas de fichas" subtitle="Por día (14 días)">
          <AreaLines
            data={fichasSeries}
            lines={[{ key: "fichas", color: GOLD, name: "Fichas" }]}
          />
        </ChartCard>
      </div>

      {/* Distribución */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <ChartCard title="Clicks por página">
          <PieDonut data={clickByPage} />
        </ChartCard>
        <ChartCard title="Leads WhatsApp por modelo">
          <PieDonut data={leadByService} />
        </ChartCard>
        <ChartCard title="Fichas por modelo">
          <PieDonut data={fichaByModel} />
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <div className="bg-jet-900/60 border border-jet-800/70 p-5">
      <h3 className="font-display font-bold text-white text-sm">{title}</h3>
      {subtitle && <p className="text-[11px] font-mono text-jet-400 mt-0.5 mb-4">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}
