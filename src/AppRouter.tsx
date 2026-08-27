import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Soluciones = lazy(() => import("./pages/Soluciones"));
const SolucionDetalle = lazy(() => import("./pages/SolucionDetalle"));
const Recursos = lazy(() => import("./pages/Recursos"));
const Modelos = lazy(() => import("./pages/Modelos"));
const ModeloDetalle = lazy(() => import("./pages/ModeloDetalle"));
const Proceso = lazy(() => import("./pages/Proceso"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const CasosExito = lazy(() => import("./pages/CasosExito"));
const CasoExito = lazy(() => import("./pages/CasoExito"));
const Nosotros = lazy(() => import("./pages/Nosotros"));
const Contacto = lazy(() => import("./pages/Contacto"));
const Gracias = lazy(() => import("./pages/Gracias"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const TerminosCondiciones = lazy(() => import("./pages/TerminosCondiciones"));

function PageFallback() {
  return (
    <div className="min-h-screen bg-jet-950 flex items-center justify-center">
      <span className="text-jet-300 font-mono text-sm">Cargando...</span>
    </div>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/soluciones" element={<Soluciones />} />
        <Route path="/soluciones/:slug" element={<SolucionDetalle />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/modelos" element={<Modelos />} />
        <Route path="/modelos/:slug" element={<ModeloDetalle />} />
        <Route path="/proceso" element={<Proceso />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/casos-de-exito" element={<CasosExito />} />
        <Route path="/casos-de-exito/:slug" element={<CasoExito />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/gracias" element={<Gracias />} />
        <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />
        <Route path="*" element={
          <div className="min-h-screen bg-jet-950 flex flex-col items-center justify-center gap-4">
            <h1 className="font-display text-6xl font-bold text-gold-500">404</h1>
            <p className="text-jet-300 font-light">Página no encontrada</p>
            <a href="/" className="text-gold-500 hover:underline text-sm mt-4">Volver al inicio</a>
          </div>
        } />
      </Routes>
    </Suspense>
  );
}
