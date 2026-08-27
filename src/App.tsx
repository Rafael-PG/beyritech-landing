import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import AppRouter from "./AppRouter";

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div className="bg-jet-950 font-sans text-white overflow-x-hidden">
            <Navbar />
            <main>
              <AppRouter />
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
