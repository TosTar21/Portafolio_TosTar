import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Lee el valor guardado si existe, si no usa false
    const stored = localStorage.getItem("dark-mode");
    return stored === "true";
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      localStorage.setItem("dark-mode", String(!prev)); // Guarda el nuevo valor
      return !prev;
    });
  };

  // (opcional) sincroniza localStorage si el usuario cambia el valor directamente
  useEffect(() => {
    const stored = localStorage.getItem("dark-mode");
    if (stored !== String(isDarkMode)) {
      localStorage.setItem("dark-mode", String(isDarkMode));
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={isDarkMode ? "bg-neutral-800 text-white" : "bg-neutral-100 text-black"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
