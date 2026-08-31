export interface DailyPoint {
  fecha: string;
  [key: string]: number | string;
}

export function toDayKey(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getFullYear())}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function lastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(
      `${String(d.getFullYear())}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
    );
  }
  return days;
}

export function groupByDay<T>(rows: { created_at: string }[], extract?: (r: T) => string): DailyPoint[] {
  return groupSeries(rows, (r) => toDayKey(r.created_at), extract as any);
}

export function groupSeries<T>(
  rows: T[],
  keyOf: (r: T) => string,
  countOf?: (r: T) => string
): DailyPoint[] {
  const map = new Map<string, Record<string, number>>();
  rows.forEach((r) => {
    const key = keyOf(r);
    if (!map.has(key)) map.set(key, {});
    if (countOf) {
      const cat = countOf(r);
      map.get(key)![cat] = (map.get(key)![cat] || 0) + 1;
    }
  });
  return Array.from(map.entries())
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([fecha, counts]) => ({ fecha, ...counts }));
}

export function countBy<T>(rows: T[], keyOf: (r: T) => string): { name: string; value: number }[] {
  const map = new Map<string, number>();
  rows.forEach((r) => {
    const k = keyOf(r);
    map.set(k, (map.get(k) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });
}

export function fmtShortDay(key: string): string {
  const [, m, d] = key.split("-");
  return `${d}/${m}`;
}
