export interface ModelSpecRow {
  label: string;
  value: string;
}

export interface StructuralDetail {
  component: string;
  material: string;
  spec: string;
}

export interface ResistanceSpec {
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
  zones: string[];
  deliveryTime: string;
  installRequirements: string[];
  relatedSlugs: string[];
  /* Campos opcionales — se llenan con datos del PDF técnico */
  fichaPdf?: string;
  certifications?: string[];
  structuralDetails?: StructuralDetail[];
  resistanceSpecs?: ResistanceSpec[];
  electricalSystem?: string[];
  windowSpec?: string;
  doorSpec?: string;
  wallPanelSpec?: string;
  roofSpec?: string;
  floorSpec?: string;
}

export const catalog: CatalogModel[] = [
  {
    slug: "multispace",
    name: "Módulo Plegable Multispace",
    tagline: "Versatilidad estructural para múltiples sectores",
    description:
      "El módulo Multispace es reutilizable y cumple con estándares de vivienda de emergencia. Usado en oficinas, dormitorios y almacenes, destaca por su estructura de acero, fácil instalación, movilidad, resistencia al fuego y aislamiento térmico. Su construcción rápida y sin residuos lo hace ideal para empresas y usuarios que buscan eficiencia sin afectar el entorno geológico.",
    applications: ["Minería", "Construcción", "Educación", "Corporativo"],
    features: [
      "Estructura de acero de alta resistencia",
      "Instalación rápida y sencilla",
      "Fácil de trasladar y reutilizar",
      "Resistencia al fuego e integración de aislamiento térmico",
      "Montaje sin residuos ni impacto geológico",
      "Instalación eléctrica preinstalada con certificación CE",
    ],
    dimensionsOpen: "5800 × 2480 × 2500 mm",
    area: "13.6 m²",
    capacity: "8–12 personas",
    weight: "1,050 kg",
    insulation: "Lana de roca 60 kg/m³",
    specs: [
      { label: "Dimensiones externas", value: "5800 × 2480 × 2500 mm" },
      { label: "Dimensiones internas", value: "5600 × 2320 × 2420 mm" },
      { label: "Estado plegable", value: "5800 × 2500 × 380 mm" },
      { label: "Peso total", value: "1,050 kg" },
      { label: "Resistencia carga techo", value: "1.0 kN/m²" },
      { label: "Resistencia carga piso", value: "4.2 kN/m²" },
      { label: "Resistencia carga pasillo", value: "2.0 kN/m²" },
      { label: "Presión lateral paredes", value: "0.5 kN/m²" },
      { label: "Resistencia al fuego", value: "Grado A" },
      { label: "Resistencia sísmica", value: "Nivel 8" },
      { label: "Resistencia al viento", value: "Nivel 10" },
    ],
    options: [
      "Dormitorios con baño y ducha integrados",
      "Casino y comedor industrial",
      "Clínica o posta de salud",
      "Acabados premium para oficinas ejecutivas",
      "Preparación solar-ready para paneles fotovoltaicos",
    ],
    zones: [
      "Dormitorio",
      "Baño / ducha",
      "Casino · comedor",
      "Clínica / posta",
      "Oficina ejecutiva",
      "Solar-ready",
    ],
    deliveryTime: "Entre 4 y 8 semanas desde la confirmación del pedido, según cantidad de módulos y ubicación del proyecto.",
    installRequirements: [
      "Terreno nivelado con acceso para camión de carga",
      "Zapatas aisladas o losa ligera (no requiere cimentación profunda)",
      "Grúa para izaje durante el montaje (coordina nuestro equipo)",
      "Conexiones exteriores a electricidad, agua y desagüe",
    ],
    relatedSlugs: ["modulo-plegable-z", "doble-ala"],
    fichaPdf: "multispace",
    certifications: [
      "ISO 9001:2015",
      "CPR 1090-1:2009+A1:2011",
    ],
    structuralDetails: [
      { component: "Marco superior", material: "Tubos rectangulares de acero Q235B", spec: "40×80 mm, 1.0 mm" },
      { component: "Marco inferior", material: "Tubos rectangulares de acero Q235B", spec: "35×78 mm, 7.5 mm" },
      { component: "Lado de 5.8 m", material: "Tubos rectangulares de acero Q235B", spec: "20×20 mm, 1.8 mm" },
      { component: "Lado de 2.5 m", material: "Tubo tipo P + Q235B", spec: "78×72 mm, 1.0 mm" },
      { component: "Bisagras", material: "Bisagras de alta resistencia", spec: "120 mm" },
      { component: "Viga inferior", material: "Chapa galvanizada personalizada", spec: "L140×80×6 m" },
    ],
    resistanceSpecs: [
      { label: "Carga de techo", value: "1.0 kN/m²" },
      { label: "Carga de piso", value: "4.2 kN/m²" },
      { label: "Carga de pasillo", value: "2.0 kN/m²" },
      { label: "Presión lateral", value: "0.5 kN/m²" },
      { label: "Resistencia al fuego", value: "Grado A" },
      { label: "Resistencia sísmica", value: "Nivel 8" },
      { label: "Resistencia al viento", value: "Nivel 10" },
    ],
    electricalSystem: [
      "1 lámpara LED incluida",
      "1 enchufe de diez orificios",
      "1 enchufe simple de cinco orificios",
      "Cableado de cobre flexible 4² (norma nacional)",
      "Disyuntor de 20A",
      "Entrada para enchufe 2.5²",
      "Cumple normas contra la humedad — Certificación CE",
    ],
    windowSpec: "Ventana corredera de una hoja de plástico y acero · 920 × 920 mm · Vidrio de 4 mm · Incluye mosquitero y baranda de seguridad",
    doorSpec: "Puerta de seguridad de alta calidad (blanco cálido) · 970 × 1970 mm · Garantía de un año",
    wallPanelSpec: "Panel corrugado de 70 mm · Exterior 0.35 mm, interior 0.2 mm · Con lana de roca de 60 kg/m³ ±0.3 mm",
    roofSpec: "Hoja de acero color V961 de 0.25 mm · Tablero de vidrio-magnesio resistente al fuego de 15 mm",
    floorSpec: "Panel corrugado de 70 mm · Exterior 0.35 mm, interior 0.2 mm · Con lana de roca de 60 kg/m³ ±0.3 mm",
  },
  {
    slug: "modulo-plegable-z",
    name: "Módulo Plegable Z",
    tagline: "Plegado compacto con máxima eficiencia de espacio y despliegue ultra rápido",
    description:
      "El Módulo Plegable Z combina versatilidad y resistencia en un solo diseño. Es la opción ideal para proyectos modulares, permitiendo el acoplamiento de varias piezas para expandir el área según las necesidades del usuario. Su configuración adaptable lo convierte en la solución ideal para oficinas corporativas, centros logísticos, unidades de emergencia o habitacionales.",
    applications: ["Industrial", "Construcción", "Corporativo", "Salud"],
    features: [
      "Instalación completa en tiempo récord de menos de 15 minutos por unidad",
      "Permite montaje en niveles (uno sobre otro) gracias a su refuerzo estructural",
      "Estructura en acero galvanizado con recubrimiento de zinc de 80 g/m²",
      "Panel sándwich de lana de roca de 50 mm (50 kg/m³)",
      "Sistema eléctrico integral con caja de 8 circuitos y enchufe de aviación",
      "Puerta de acero con cerradura contra incendios estándar europeo",
    ],
    dimensionsOpen: "5800 × 2480 × 2500 mm",
    area: "13.6 m²",
    capacity: "4–8 personas",
    weight: "1,600 kg",
    insulation: "Lana de roca 50 mm (50 kg/m³)",
    specs: [
      { label: "Dimensiones externas", value: "5800 × 2480 × 2500 mm" },
      { label: "Dimensiones internas", value: "5600 × 2320 × 2420 mm" },
      { label: "Estado plegable", value: "5800 × 2500 × 380 mm" },
      { label: "Peso total", value: "1,600 kg" },
      { label: "Tiempo de despliegue", value: "< 15 minutos por unidad" },
      { label: "Montaje vertical", value: "Apto para varios niveles" },
      { label: "Aislamiento techo", value: "Lana de vidrio 100 mm (14 kg/m³)" },
      { label: "Aislamiento paredes", value: "Lana de roca 50 mm (50 kg/m³)" },
    ],
    options: [
      "Oficina corporativa o caseta técnica",
      "Centro logístico y oficina de faena",
      "Unidad habitacional o de emergencia",
      "Módulo sanitario compacto",
      "Preparación solar-ready para paneles fotovoltaicos",
    ],
    zones: [
      "Caseta técnica",
      "Oficina de obra",
      "Módulo sanitario",
      "Depósito / almacén",
      "Solar-ready",
    ],
    deliveryTime: "Entre 4 y 8 semanas desde la confirmación del pedido, según cantidad de módulos y ubicación del proyecto.",
    installRequirements: [
      "Terreno nivelado con acceso para camión de carga",
      "Zapatas aisladas o losa ligera (no requiere cimentación profunda)",
      "Grúa para izaje durante el montaje (coordina nuestro equipo)",
      "Conexiones exteriores a electricidad, agua y desagüe",
    ],
    relatedSlugs: ["multispace", "doble-ala"],
    fichaPdf: "modulo-plegable-z",
    certifications: [
      "ISO 9001:2015",
    ],
    structuralDetails: [
      { component: "Material general", material: "Acero galvanizado", spec: "Revestimiento de zinc 80 g/m²" },
      { component: "Pintura / Revestimiento", material: "Moldeo electrostático", spec: "Polvo de plástico blanco" },
      { component: "Marco superior (Techo)", material: "Acero galvanizado", spec: "Viga principal 170 mm + 2 laterales (2.3 mm) + 9 vigas secundarias" },
      { component: "Marco inferior (Base)", material: "Acero galvanizado", spec: "Viga principal 160 mm + 2 laterales (2.3 mm) + 9 vigas reforzadas" },
      { component: "Columnas", material: "Tira de acero reforzada", spec: "150 × 210 × 2535 mm, conexión 8 mm con refuerzo 'L'" },
      { component: "Esquineras de ensamble", material: "Acero de alta gama 3.0 mm", spec: "Fondo: 160 mm / Superior: 200 mm" },
    ],
    resistanceSpecs: [
      { label: "Tiempo de instalación", value: "< 15 min / unidad" },
      { label: "Montaje vertical", value: "Apto en niveles" },
      { label: "Galvanizado", value: "Zinc 80 g/m²" },
      { label: "Aislamiento techo", value: "100 mm lana vidrio" },
    ],
    electricalSystem: [
      "Cableado entrada principal y enchufes: 6 mm²",
      "Toma exclusiva para Aire Acondicionado (A/C): 4 mm²",
      "Tomas de corriente estándar: 2.5 mm² · Iluminación: 1.5 mm²",
      "3 tomas de corriente (5 orificios) + 1 toma para A/C + 2 luces LED",
      "Tablero avanzado de 8 circuitos (protector de fugas 2P32A, disyuntores 10A, 16A y 20A)",
      "Conexión exterior: Enchufe de aviación 220V / 50Hz (3P32A)",
    ],
    windowSpec: "2 ventanas de acero y plástico (920 × 1120 mm) · Vidrio de 3.0 mm · Incluyen malla antirrobo y mosquitero",
    doorSpec: "1 puerta de acero de alta calidad (970 × 1970 mm) con cerradura contra incendios (estándar europeo)",
    wallPanelSpec: "Panel sándwich lana de roca 50 mm (50 kg/m³) · Láminas acero 0.35 mm · Acabado piel de naranja exterior y blanco liso interior",
    roofSpec: "Cubierta exterior chapa acero a color 0.4 mm · Aislamiento lana de vidrio 100 mm (14 kg/m³) + resina · Falso techo chapa YX28-277-831 de 0.4 mm",
    floorSpec: "Tablero de cemento de 18 mm (1177 × 2820 mm) con piso de plástico soldado de 1.6 mm de grosor",
  },
  {
    slug: "doble-ala",
    name: "Módulo Plegable Doble Ala",
    tagline: "Doble amplitud simétrica para oficinas, viviendas y espacios de alta funcionalidad",
    description:
      "El Módulo Plegable Doble Ala es la solución de mayor amplitud y funcionalidad de Beyritech. Se entrega completamente equipado de fábrica: incluye 2 dormitorios independientes con puertas de acero, baño completo con ducha rectangular, inodoro, lavabo y espejo, más mueble de cocina en L con lavabo. Con estructura de acero Q235B, aislamiento ignífugo y más de 20 años de vida útil, es resistente tanto para interiores como para exteriores en condiciones exigentes.",
    applications: ["Corporativo", "Habitacional", "Industrial", "Salud"],
    features: [
      "Expansión simétrica de doble ala con diseño innovador y flexible",
      "Estructura reforzada en acero Q235B con vida útil superior a 20 años",
      "Aislamiento con tableros purificadores ignífugos de 50 mm y 65 mm",
      "Baño interior completo incluido (inodoro, lavabo, espejo y cuarto de ducha)",
      "Mueble en forma de L con lavabo y 2 dormitorios con puertas de acero",
      "1 puerta de entrada de aluminio con rotura de puente térmico y 8 ventanas corredizas",
    ],
    dimensionsOpen: "5900 × 6200 × 2480 mm",
    area: "35 m²",
    capacity: "8–16 personas",
    weight: "3,500 kg",
    insulation: "Espuma purificadora ignífuga 50 mm",
    specs: [
      { label: "Dimensiones externas", value: "5900 × 6200 × 2480 mm" },
      { label: "Dimensiones internas", value: "5740 × 6040 × 2200 mm" },
      { label: "Estado plegado", value: "5900 × 2200 × 2480 mm" },
      { label: "Peso total", value: "3,500 kg" },
      { label: "Vida útil estimada", value: "> 20 años" },
      { label: "Área útil aproximada", value: "35 m²" },
      { label: "Aislamiento paredes", value: "Espuma purificadora 50 mm" },
      { label: "Partición interior", value: "Espuma purificadora 65 mm" },
    ],
    options: [
      "Equipamiento completo de serie: 2 dormitorios + baño con ducha + kitchenette en L",
      "Configuración residencial / campamento de supervisión",
      "Configuración corporativa: oficinas ejecutivas y sala de guardia",
      "Puesto de salud o tópico de atención con área de descanso",
      "Preparación solar-ready para paneles fotovoltaicos",
    ],
    zones: [
      "Núcleo central",
      "Dormitorio 1",
      "Dormitorio 2",
      "Baño con ducha",
      "Cocina en L",
      "Solar-ready",
    ],
    deliveryTime: "Entre 4 y 8 semanas desde la confirmación del pedido, según cantidad de módulos y ubicación del proyecto.",
    installRequirements: [
      "Terreno nivelado con acceso para camión de carga",
      "Zapatas aisladas o losa ligera (no requiere cimentación profunda)",
      "Grúa para izaje durante el montaje (coordina nuestro equipo)",
      "Conexiones exteriores a electricidad, agua y desagüe",
    ],
    relatedSlugs: ["multispace", "modulo-plegable-z"],
    fichaPdf: "doble-ala",
    certifications: [
      "ISO 9001:2015",
    ],
    structuralDetails: [
      { component: "Viga superior media", material: "Acero Q235B", spec: "80 × 100 × T3.0 mm" },
      { component: "Umbral inferior medio", material: "Acero Q235B", spec: "80 × 140 × T3.0 mm" },
      { component: "Pilar B y esquineras", material: "Acero Q235B", spec: "150 × 210 × T3.0 mm" },
      { component: "Viga lateral del extremo", material: "Piezas de doblado Q235BZ", spec: "Espesor T2.0 mm" },
      { component: "Marco y correas de pared", material: "Tubo Q235B", spec: "40 × 80 × T1.3 mm / 40 × 60 × T1.3 mm" },
      { component: "Bisagras plegables", material: "Acero galvanizado", spec: "13 mm de alta resistencia" },
    ],
    resistanceSpecs: [
      { label: "Vida útil", value: "> 20 años" },
      { label: "Resistencia", value: "Antisísmico e ignífugo" },
      { label: "Protección", value: "Impermeable y anti-termitas" },
      { label: "Estructura", value: "Acero Q235B reforzado" },
    ],
    electricalSystem: [
      "Instalación en estricta conformidad con especificaciones a prueba de humedad",
      "Cableado y circuitos conectados según ingeniería de distribución de circuito",
      "Productos eléctricos certificados con protección avanzada",
      "Tomas de corriente e interruptores en cada ambiente",
      "Puntos de iluminación integrados en techo",
    ],
    windowSpec: "8 ventanas corredizas de aleación de aluminio (920 × 920 mm) con mosquiteros incluidos",
    doorSpec: "1 puerta de entrada de aluminio con rotura de puente térmico + puertas de acero para divisiones internas",
    wallPanelSpec: "Paredes laterales, frontal y trasera en tablero de espuma purificadora ignífuga T50 mm · Partición interna de T65 mm",
    roofSpec: "Cubierta y aislamiento superior en tablero de espuma purificadora ignífuga T50 mm con falso techo T193 suspendido",
    floorSpec: "Piso intermedio en suelo de cemento ignífugo de 18 mm + piso lateral en suelo de bambú de 18 mm + revestimiento de PVC de 2.0 mm",
  },
];

export function getModel(slug: string | undefined): CatalogModel | undefined {
  return catalog.find((m) => m.slug === slug);
}

export function getSortedModels(excludeSlug: string): CatalogModel[] {
  const related = new Set(catalog.find((m) => m.slug === excludeSlug)?.relatedSlugs ?? []);
  return catalog.filter((m) => related.has(m.slug));
}