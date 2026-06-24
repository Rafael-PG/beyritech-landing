import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyChooseUs from "./components/WhyChooseUs";
import SpeedSustainabilityLogistics from "./components/SpeedSustainabilityLogistics";
import Process from "./components/Process";
import Projects from "./components/Projects";
import InteractiveConfigurator from "./components/InteractiveConfigurator";
import FaqTestimonials from "./components/FaqTestimonials";
import Footer from "./components/Footer";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  useLenis();

  return (
    <div className="bg-jet-950 font-sans text-white overflow-x-hidden">
      {/* 1. Header (Navbar) */}
      <Navbar />

      <main>
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Why Choose Beyritech */}
        <WhyChooseUs />

        {/* 4, 5, 6. Sustainable Efficiency, Operational Speed, Logistics Without Borders */}
        <SpeedSustainabilityLogistics />

        {/* 7. Implementation Process (4 Steps) */}
        <Process />

        {/* 8. Featured Projects */}
        <Projects />

        {/* 9, 10. Testimonials & FAQ Accordions */}
        <FaqTestimonials />

        {/* 11. Contact CTA & AI Quote Estimator */}
        <InteractiveConfigurator />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
}
