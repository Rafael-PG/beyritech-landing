import { BrowserRouter, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import AppRouter from "./AppRouter";

function SiteLayout() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/direccion");

  return (
    <>
      {!isDashboard && <Navbar />}
      <ScrollToTop />
      <main>
        <AppRouter />
      </main>
      {!isDashboard && <Footer />}
      {!isDashboard && <WhatsAppButton />}
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div className="bg-jet-950 font-sans text-white overflow-x-hidden">
            <SiteLayout />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
