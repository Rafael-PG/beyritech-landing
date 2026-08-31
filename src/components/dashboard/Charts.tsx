import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const TOOLTIP_STYLE = {
  backgroundColor: "#0a0a0a",
  border: "1px solid #FEC93440",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "12px",
  fontFamily: "monospace",
};

export const GOLD = "#FEC934";
export const GOLD_DARK = "#d4a017";
export const GOLD_MUTED = "#8a6d1b";
export const RED = "#e46d63";

const PIE_COLORS = [GOLD, GOLD_DARK, GOLD_MUTED, RED, "#c9a227", "#5e6b2f", "#a8841f", "#b8c0c8"];

function axisProps() {
  return {
    stroke: "#3a3a3a",
    fontSize: 11,
    tick: { fill: "#909090", fontFamily: "monospace", fontSize: 11 },
    tickLine: false,
    axisLine: { stroke: "#2a2a2a" },
  } as any;
}

export function BarGrouped({ data, categories }: { data: any[]; categories: { key: string; color: string; name: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1c1c1c" vertical={false} />
        <XAxis dataKey="fecha" {...axisProps()} tickFormatter={(v: string) => (v.length > 7 ? v.slice(5) : v)} />
        <YAxis {...axisProps()} allowDecimals={false} />
        <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "#ffffff08" }} />
        <Legend wrapperStyle={{ fontFamily: "monospace", fontSize: 11 }} />
        {categories.map((c) => (
          <Bar key={c.key} dataKey={c.key} name={c.name} fill={c.color} radius={[3, 3, 0, 0]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function AreaLines({ data, lines }: { data: any[]; lines: { key: string; color: string; name: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
        <defs>
          {lines.map((l) => (
            <linearGradient key={l.key} id={`grad-${l.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={l.color} stopOpacity={0.5} />
              <stop offset="100%" stopColor={l.color} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1c1c1c" vertical={false} />
        <XAxis dataKey="fecha" {...axisProps()} tickFormatter={(v: string) => (v.length > 7 ? v.slice(5) : v)} />
        <YAxis {...axisProps()} allowDecimals={false} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Legend wrapperStyle={{ fontFamily: "monospace", fontSize: 11 }} />
        {lines.map((l) => (
          <Area key={l.key} type="monotone" dataKey={l.key} name={l.name} stroke={l.color} strokeWidth={2} fill={`url(#grad-${l.key})`} />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function PieDonut({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2}>
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="#0a0a0a" />
          ))}
        </Pie>
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Legend wrapperStyle={{ fontFamily: "monospace", fontSize: 11 }} iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  );
}
