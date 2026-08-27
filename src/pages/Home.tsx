import SEO from "../components/SEO";
import Hero from "../components/Hero";
import Models from "../components/Models";
import UsageCards from "../components/UsageCards";
import SectorAccessCards from "../components/SectorAccessCards";
import WhyChooseUs from "../components/WhyChooseUs";
import ComparisonTable from "../components/ComparisonTable";
import SpeedSustainabilityLogistics from "../components/SpeedSustainabilityLogistics";
import Process from "../components/Process";
import Projects from "../components/Projects";
import FaqTestimonials from "../components/FaqTestimonials";
import InteractiveConfigurator from "../components/InteractiveConfigurator";

const homeStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Beyritech",
    url: "https://beyritech.com",
    logo: "https://beyritech.com/logo/beyritech-logo.png",
    description: "Fabricación de Módulos Multipropósito y contenedores de oficina modulares para agroindustria, logística, corporaciones y salud.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Santa Elvira Mza. B Lote 8",
      addressLocality: "Los Olivos",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51-993-694-677",
      contactType: "sales",
      email: "asistente.comercial@beyritech.com",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cuál es la vida útil de los módulos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Perfiles de acero pesado galvanizado con protección anticorrosión multicapa, diseñados para larga vida útil bajo mantenimiento preventivo estándar.",
        },
      },
      {
        "@type": "Question",
        name: "¿Los módulos son reubicables?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Se desarman, cargan en fletes intermodales y reinstalan con alta recuperación de los componentes originales.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo se comporta el aislamiento en temperaturas extremas?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Núcleo PIR de alta densidad que reduce significativamente el consumo energético en climas fríos y cálidos.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tiempo toma la instalación?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Entregamos módulos operativos en 4 a 8 semanas. El montaje en sitio toma entre 3 y 14 días según la cantidad.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cumplen con normativas sanitarias y laborales?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Totalmente. Cumplimos estándares internacionales de habitabilidad, espacios mínimos, aislación acústica e higiene sanitaria.",
        },
      },
    ],
  },
];

export default function Home() {
  return (
    <>
      <SEO
        title="Módulos Multipropósitos de Fabricación Nacional"
        description="Módulos prefabricados plegables para agroindustria, logística, obra y corporaciones. Reduzca tiempos de ejecución y obtenga un espacio operativo en semanas."
        url="/"
        structuredData={homeStructuredData}
      />
      <Hero />
      <Models />
      <UsageCards />
      <SectorAccessCards />
      <WhyChooseUs />
      <ComparisonTable />
      <SpeedSustainabilityLogistics />
      <Process />
      <Projects />
      <FaqTestimonials />
      <InteractiveConfigurator />
    </>
  );
}
