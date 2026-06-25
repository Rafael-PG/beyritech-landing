import React, { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { useLenis } from "./hooks/useLenis";

const WhyChooseUs = lazy(() => import("./components/WhyChooseUs"));
const Models = lazy(() => import("./components/Models"));
const SpeedSustainabilityLogistics = lazy(() => import("./components/SpeedSustainabilityLogistics"));
const Process = lazy(() => import("./components/Process"));
const Projects = lazy(() => import("./components/Projects"));
const InteractiveConfigurator = lazy(() => import("./components/InteractiveConfigurator"));
const FaqTestimonials = lazy(() => import("./components/FaqTestimonials"));
const Footer = lazy(() => import("./components/Footer"));

function SectionFallback({ className }: { className?: string }) {
  return <div className={className} />;
}

export default function App() {
  useLenis();

  return (
    <ThemeProvider>
      <div className="bg-jet-950 font-sans text-white overflow-x-hidden [content-visibility:auto] [contain-intrinsic-size:1000px]">
        <Navbar />

      <main>
        <Hero />

        <Suspense fallback={<SectionFallback className="min-h-[600px]" />}>
          <WhyChooseUs />
        </Suspense>

        <Suspense fallback={<SectionFallback className="min-h-[700px]" />}>
          <Models />
        </Suspense>

        <Suspense fallback={<SectionFallback className="min-h-[500px]" />}>
          <SpeedSustainabilityLogistics />
        </Suspense>

        <Suspense fallback={<SectionFallback className="min-h-[500px]" />}>
          <Process />
        </Suspense>

        <Suspense fallback={<SectionFallback className="min-h-[600px]" />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionFallback className="min-h-[400px]" />}>
          <FaqTestimonials />
        </Suspense>

        <Suspense fallback={<SectionFallback className="min-h-[600px]" />}>
          <InteractiveConfigurator />
        </Suspense>
      </main>

      <Suspense fallback={<SectionFallback className="min-h-[300px]" />}>
        <Footer />
      </Suspense>
      </div>
    </ThemeProvider>
  );
}
