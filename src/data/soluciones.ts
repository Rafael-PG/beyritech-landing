import { Wheat, Warehouse, HardHat, Building2, GraduationCap, type LucideIcon } from "lucide-react";

export interface SectorCaso {
  title: string;
  facts: string[];
  href: string;
}

export interface Sector {
  icon: LucideIcon;
  title: string;
  slug: string;
  description: string;
  challenges: string[];
  useCases: string[];
  recommendedModels: { name: string; slug: string; fit: string }[];
  benefits: string[];
  gradient: string;
  caso?: SectorCaso;
}

export const sectors: Sector[] = [
  {
    icon: Wheat,
    title: "Agroindustria",
    slug: "agroindustria",
    description:
      "Módulos diseñados para operaciones agrícolas y procesadoras: dormitorios, casinos, clínicas y oficinas que soportan condiciones de campo extremas.",
    challenges: ["Acceso remoto", "Climatología extrema", "Normativas sanitarias estrictas"],
    useCases: [
      "Dormitorios para personal de campo",
      "Casinos y comedores industriales",
      "Clínicas y postas de salud",
      "Oficinas de administración de fundo",
      "Laboratorios de control de calidad",
    ],
    recommendedModels: [
      { name: "Multispace", slug: "multispace", fit: "Alojamiento y oficinas compactas" },
      { name: "Doble Ala", slug: "doble-ala", fit: "Espacios amplios y multiuso" },
    ],
    benefits: [
      "Aislamiento térmico para climas extremos",
      "Despliegue rápido en zonas remotas",
      "Normativas sanitarias cumplidas",
      "Reubicación entre campañas agrícolas",
    ],
    gradient: "from-emerald-600 to-emerald-800",
    caso: {
      title: "Complejo de dormitorios agroindustriales — Ica",
      facts: [
        "18 módulos Multispace, 144 operarios alojados",
        "Comedor industrial para 120 personas y posta de salud",
        "Entregado en 6 semanas para la campaña de exportación",
      ],
      href: "/casos-de-exito",
    },
  },
  {
    icon: Warehouse,
    title: "Logística y Almacenes",
    slug: "logistica-almacenes",
    description:
      "Bodegas modulares, oficinas operativas y plataformas de distribución que se amplían según la demanda del mercado.",
    challenges: ["Ampliación rápida", "Alta demanda estacional", "Costos operativos controlados"],
    useCases: [
      "Oficinas dentro de naves operativas",
      "Salas de control de despacho",
      "Plataformas de distribución",
      "Centros de operaciones portuarias",
      "Control de inventario y tránsito",
    ],
    recommendedModels: [
      { name: "Doble Ala", slug: "doble-ala", fit: "Oficinas dentro de naves y de amplio espectro" },
      { name: "Módulo Plegable Z", slug: "modulo-plegable-z", fit: "Oficinas operativas compactas" },
    ],
    benefits: [
      "Instalación sin interrumpir la operación",
      "Cero obra húmeda dentro de la nave",
      "Corrosión controlada en entorno industrial",
      "Reubicación según demanda estacional",
    ],
    gradient: "from-blue-600 to-blue-800",
    caso: {
      title: "Módulo operativo dentro de nave logística — Callao",
      facts: [
        "1 módulo Doble Ala instalado dentro de una nave en operación continua",
        "Oficina de control de despachos y sala de seguimiento de flota",
        "Montaje Plug & Play en 48 horas sin interrumpir la operación",
      ],
      href: "/casos-de-exito",
    },
  },
  {
    icon: HardHat,
    title: "Obra y Construcción",
    slug: "obra-construccion",
    description:
      "Campamentos, cuadros de comando y centros de acopio temporales para obras de infraestructura y minería.",
    challenges: ["Temporalidad", "Reubicación frecuente", "Seguridad en sitio"],
    useCases: [
      "Campamentos de obra",
      "Cuadros de comando y seguridad",
      "Centros de acopio y bodegas",
      "Oficinas de proyecto",
      "Baños y duchas temporales",
    ],
    recommendedModels: [
      { name: "Multispace", slug: "multispace", fit: "Campamentos y oficinas de campo" },
      { name: "Módulo Plegable Z", slug: "modulo-plegable-z", fit: "Oficinas y servicios temporales" },
    ],
    benefits: [
      "Temporalidad controlada — se retira al terminar",
      "Reubicación frecuente entre proyectos",
      "Seguridad y supervivencia en sitio",
      "Mínimo trabajo húmedo en campo",
    ],
    gradient: "from-orange-600 to-orange-800",
  },
  {
    icon: Building2,
    title: "Corporativo",
    slug: "corporativo",
    description:
      "Oficinas ejecutivas, salas de capacitación y espacios temporales con acabados profesionales para empresas en crecimiento.",
    challenges: ["Imagen profesional", "Ampliación sin detener operaciones", "Acabados premium"],
    useCases: [
      "Oficinas ejecutivas temporales",
      "Salas de juntas y capacitación",
      "Ampliación de oficinas existentes",
      "Centros de atención al cliente",
      "Espacios de innovación y coworking",
    ],
    recommendedModels: [
      { name: "Doble Ala", slug: "doble-ala", fit: "Oficinas ejecutivas amplias" },
      { name: "Módulo Plegable Z", slug: "modulo-plegable-z", fit: "Salas de reunión y oficinas compactas" },
    ],
    benefits: [
      "Acabados de arquitectura premium",
      "Imagen profesional inmediata",
      "Ampliación sin detener operaciones",
      "Costos predecibles",
    ],
    gradient: "from-purple-600 to-purple-800",
  },
  {
    icon: GraduationCap,
    title: "Educación",
    slug: "educacion",
    description:
      "Aulas, laboratorios y bibliotecas modulares que permiten expandir la infraestructura educativa en semanas, no en años.",
    challenges: ["Aislamiento acústico", "Seguridad estudiantil", "Despliegue en vacaciones"],
    useCases: [
      "Aulas temporales y permanentes",
      "Laboratorios de ciencias",
      "Bibliotecas y centros de estudio",
      "Salas de computación",
      "Espacios de atención estudiantil",
    ],
    recommendedModels: [
      { name: "Módulo Plegable Z", slug: "modulo-plegable-z", fit: "Aulas y espacios educativos compactos" },
      { name: "Doble Ala", slug: "doble-ala", fit: "Laboratorios y bibliotecas amplias" },
    ],
    benefits: [
      "Aislamiento acústico para ambientes de estudio",
      "Despliegue durante vacaciones escolares",
      "Seguridad para entornos estudiantiles",
      "Años de vida útil con bajo mantenimiento",
    ],
    gradient: "from-cyan-600 to-cyan-800",
  },
];

export function getSector(slug: string | undefined): Sector | undefined {
  return sectors.find((s) => s.slug === slug);
}