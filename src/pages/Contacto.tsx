import { useSearchParams } from "react-router-dom";
import SEO from "../components/SEO";
import InteractiveConfigurator from "../components/InteractiveConfigurator";

const MODEL_LABELS: Record<string, string> = {
  "multispace": "Multispace",
  "doble-ala": "Doble Ala",
  "modulo-plegable-z": "Módulo Plegable Z",
};

export default function Contacto() {
  const [searchParams] = useSearchParams();
  const rawModel = searchParams.get("modelo") || "";
  const initialProjectType = MODEL_LABELS[rawModel] || "";

  return (
    <>
      <SEO
        title="Contacto — Solicite Cotización"
        description="Solicite su cotización de módulos multipropósito. Un ingeniero consultor se comunicará con una propuesta técnica detallada a la brevedad."
        url="/contacto"
        structuredData={{ "@context": "https://schema.org", "@type": "LocalBusiness", name: "Beyritech Modular Systems", telephone: "+51-993-694-677", email: "asistente.comercial@beyritech.com", address: { "@type": "PostalAddress", streetAddress: "Av. Santa Elvira Mza. B Lote 8", addressLocality: "Los Olivos", addressRegion: "Lima", addressCountry: "PE" } }}
      />
      <InteractiveConfigurator inPage initialProjectType={initialProjectType} />
    </>
  );
}