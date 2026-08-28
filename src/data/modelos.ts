export interface ModelSpecRow {
  label: string;
  value: string;
}

export interface CatalogModel {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  applications: string[];
  features: string[];
  dimensionsOpen: string;
  area: string;
  capacity: string;
  weight: string;
  insulation: string;
  specs: ModelSpecRow[];
  options: string[];
  deliveryTime: string;
  installRequirements: string[];
  relatedSlugs: string[];
}

export const catalog: CatalogModel[] = [
  {
    slug: "multispace",
    name: "Módulo Plegable Multispace",
    tagline: "Versatilidad estructural para múltiples sectores",
    description:
      "Sistema modular plegable de rápida implementación. Su diseño multispace permite configuraciones flexibles sin comprometer la resistencia estructural. Ideal para campamentos de obra, aulas temporales, oficinas de faena y clínicas de campaña.",
    applications: ["Minería", "Construcción", "Educación", "Corporativo"],
    features: [
      "Plegado en Z para transporte eficiente",
      "Montaje en 1-2 días por módulo",
      "Aislamiento térmico y acústico integrado",
      "Instalación eléctrica preinstalada",
      "Revestimiento interior acabado",
      "Ventanas con doble acristalamiento",
    ],
    dimensionsOpen: "6m × 12m × 3m",
    area: "72 m²",
    capacity: "8–12 personas",
    weight: "2.5 ton",
    insulation: "PIR 80 mm",
    specs: [
      { label: "Dimensiones plegado", value: "6m × 3m × 3m" },
      { label: "Dimensiones desplegado", value: "6m × 12m × 3m" },
      { label: "Área útil", value: "72 m²" },
      { label: "Capacidad", value: "8–12 personas" },
      { label: "Peso estructural", value: "2.5 ton" },
      { label: "Aislamiento PIR", value: "80 mm" },
      { label: "Sobrecarga de nieve", value: "Calculado para clima de sierra" },
      { label: "Viento lateral", value: "Calculado para vientos costeros y de altura" },
    ],
    options: [
      "Dormitorios con baño y ducha integrados",
      "Casino y comedor industrial",
      "Clínica o posta de salud",
      "Acabados premium para oficinas ejecutivas",
      "Preparación solar-ready para paneles fotovoltaicos",
    ],
    deliveryTime: "Entre 4 y 8 semanas desde la confirmación del pedido, según cantidad de módulos y ubicación del proyecto.",
    installRequirements: [
      "Terreno nivelado con acceso para camión de carga",
      "Zapatas aisladas o losa ligera (no requiere cimentación profunda)",
      "Grúa para izaje durante el montaje (coordina nuestro equipo)",
      "Conexiones exteriores a electricidad, agua y desagüe",
    ],
    relatedSlugs: ["doble-ala", "mini-doble-ala"],
  },
  {
    slug: "doble-ala",
    name: "Módulo Plegable Doble Ala",
    tagline: "Doble amplitud para espacios corporativos y sanitarios",
    description:
      "Estructura de doble ala plegable que ofrece el doble de espacio útil sin duplicar el peso. Perfecto para clínicas modulares, salas de reuniones ejecutivas, laboratorios de campaña y espacios corporativos de alta gama.",
    applications: ["Salud", "Corporativo", "Educación", "Industrial"],
    features: [
      "Expansión simétrica de doble ala",
      "Núcleo central de conexión reforzado",
      "Adecuado para salas de cirugía y laboratorios",
      "Compatibilidad con sistemas de presión negativa",
      "Acabados premium disponibles",
      "Ampliación modular progresiva",
    ],
    dimensionsOpen: "8m × 18m × 3.2m",
    area: "144 m²",
    capacity: "16–24 personas",
    weight: "4.2 ton",
    insulation: "PIR 80 mm",
    specs: [
      { label: "Dimensiones plegado", value: "8m × 3.2m × 3.2m" },
      { label: "Dimensiones desplegado", value: "8m × 18m × 3.2m" },
      { label: "Área útil", value: "144 m²" },
      { label: "Capacidad", value: "16–24 personas" },
      { label: "Peso estructural", value: "4.2 ton" },
      { label: "Aislamiento PIR", value: "80 mm" },
      { label: "Sobrecarga de nieve", value: "Calculado para clima de sierra" },
      { label: "Viento lateral", value: "Calculado para vientos costeros y de altura" },
    ],
    options: [
      "Oficina de control dentro de naves logísticas",
      "Sala de reuniones o juntas ejecutivas",
      "Laboratorio o sala de proceso",
      "Módulo sanitario de mayor escala",
      "Preparación solar-ready para paneles fotovoltaicos",
    ],
    deliveryTime: "Entre 4 y 8 semanas desde la confirmación del pedido, según cantidad de módulos y ubicación del proyecto.",
    installRequirements: [
      "Terreno nivelado con acceso para camión de carga",
      "Zapatas aisladas o losa ligera (no requiere cimentación profunda)",
      "Grúa para izaje durante el montaje (coordina nuestro equipo)",
      "Conexiones exteriores a electricidad, agua y desagüe",
    ],
    relatedSlugs: ["multispace", "mini-doble-ala"],
  },
  {
    slug: "mini-doble-ala",
    name: "Mini Doble Ala",
    tagline: "Compacto, eficiente, ideal para espacios reducidos",
    description:
      "Versión compacta del doble ala. Diseñado para casetas técnicas, módulos sanitarios, oficinas temporales y depósitos de herramientas. Maximiza el espacio en terrenos reducidos.",
    applications: ["Salud", "Industrial", "Corporativo"],
    features: [
      "Diseño compacto para terrenos reducidos",
      "Transporte optimizado en camión estándar",
      "Montaje en menos de 1 día",
      "Ideal para oficinas de obra y casetas técnicas",
      "Aislamiento térmico completo",
      "Revestimiento interior y exterior incluido",
    ],
    dimensionsOpen: "5m × 9m × 2.8m",
    area: "45 m²",
    capacity: "4–8 personas",
    weight: "1.6 ton",
    insulation: "PIR 80 mm",
    specs: [
      { label: "Dimensiones plegado", value: "5m × 2.8m × 2.8m" },
      { label: "Dimensiones desplegado", value: "5m × 9m × 2.8m" },
      { label: "Área útil", value: "45 m²" },
      { label: "Capacidad", value: "4–8 personas" },
      { label: "Peso estructural", value: "1.6 ton" },
      { label: "Aislamiento PIR", value: "80 mm" },
      { label: "Sobrecarga de nieve", value: "Calculado para clima de sierra" },
      { label: "Viento lateral", value: "Calculado para vientos costeros y de altura" },
    ],
    options: [
      "Oficina de obra o caseta técnica",
      "Módulo sanitario compacto",
      "Depósito de herramientas o almacén de insumos",
      "Preparación solar-ready para paneles fotovoltaicos",
    ],
    deliveryTime: "Entre 4 y 8 semanas desde la confirmación del pedido, según cantidad de módulos y ubicación del proyecto.",
    installRequirements: [
      "Terreno nivelado con acceso para camión de carga",
      "Zapatas aisladas o losa ligera (no requiere cimentación profunda)",
      "Grúa para izaje durante el montaje (coordina nuestro equipo)",
      "Conexiones exteriores a electricidad, agua y desagüe",
    ],
    relatedSlugs: ["multispace", "doble-ala"],
  },
];

export function getModel(slug: string | undefined): CatalogModel | undefined {
  return catalog.find((m) => m.slug === slug);
}

export function getSortedModels(excludeSlug: string): CatalogModel[] {
  const related = new Set(catalog.find((m) => m.slug === excludeSlug)?.relatedSlugs ?? []);
  return catalog.filter((m) => related.has(m.slug));
}