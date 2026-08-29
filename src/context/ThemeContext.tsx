import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface ThemeContextType {
  isLight: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLight, setIsLight] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "light";
    }
    return false;
  });
  const transitionTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    document.documentElement.classList.toggle("light", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }, [isLight]);

  const toggleTheme = () => {
    window.clearTimeout(transitionTimer.current);
    document.documentElement.classList.add("theme-transitioning");
    const nextIsLight = !isLight;
    document.documentElement.classList.toggle("light", nextIsLight);
    setIsLight(nextIsLight);
    transitionTimer.current = window.setTimeout(() => {
      document.documentElement.classList.remove("theme-transitioning");
    }, 600);
  };

  return (
    <ThemeContext.Provider value={{ isLight, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
