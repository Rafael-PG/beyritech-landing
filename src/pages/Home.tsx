import SEO from "../components/SEO";
import Hero from "../components/Hero";
import Models from "../components/Models";
import WhyChooseUs from "../components/WhyChooseUs";
import ComparisonTable from "../components/ComparisonTable";
import Process from "../components/Process";
import Projects from "../components/Projects";
import FaqTestimonials from "../components/FaqTestimonials";
import InteractiveConfigurator from "../components/InteractiveConfigurator";
import { faqs } from "../data/faq";

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
    mainEntity: faqs.slice(0, 5).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
      <ComparisonTable />
      <Process />
      <Projects />
      <WhyChooseUs />
      <InteractiveConfigurator />
      <FaqTestimonials />
    </>
  );
}
