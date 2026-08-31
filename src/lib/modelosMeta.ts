export const MODELOS_META: Record<string, { name: string; short: string }> = {
  multispace: { name: "Módulo Plegable Multispace", short: "Multispace" },
  "doble-ala": { name: "Módulo Plegable Doble Ala", short: "Doble Ala" },
  "mini-doble-ala": { name: "Mini Doble Ala", short: "Mini Doble Ala" },
};

export const MODEL_SLUGS = ["multispace", "doble-ala", "mini-doble-ala"];

export function modeloName(slug?: string | null): string {
  if (!slug) return "Beyritech";
  const m = MODELOS_META[slug];
  return m ? m.name : slug;
}

export function modeloShort(slug?: string | null): string {
  if (!slug) return "Genérico";
  const m = MODELOS_META[slug];
  return m ? m.short : slug;
}
