// src/pages/CVPage.tsx
import React from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";

const CVPage: React.FC = () => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();          // ← hook de tema

  // Traducciones
  const t = {
    en: {
      download: "Download resume",
      fallback: "Your browser can’t display PDFs. ",
      open: "Open it in a new tab",
    },
    es: {
      download: "Descargar currículum",
      fallback: "Tu navegador no puede mostrar PDFs. ",
      open: "Ábrelo en una pestaña nueva",
    },
  }[language];

  // Clases dinámicas según tema
  const borderColor = isDarkMode ? "border-white" : "border-black";
  const textOnHover = isDarkMode ? "text-white" : "text-black";
  const bgOnHover   = "hover:bg-transparent cursor-pointer";

  const btnClasses = [
    "px-5 py-2 rounded-md border-2 font-semibold shadow",
    "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50",
    borderColor,
    bgOnHover,
    textOnHover,
  ].join(" ");

  return (
    <section className="min-h-screen pt-24 pb-16 flex flex-col items-center gap-6">
      {/* Visor PDF con fallback */}
      <object
        data="/Oscar Zuñiga_Cv.pdf#view=FitH"
        type="application/pdf"
        className="w-full h-[calc(100vh-8rem)]"
      >
        <embed src="/Oscar Zuñiga_Cv.pdf" type="application/pdf" />
        <p className="text-center mt-4">
          {t.fallback}
          <a
            href="/Oscar Zuñiga_Cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            {t.open}
          </a>
          .
        </p>
      </object>

      {/* Botón de descarga */}
      <button
        onClick={() => {
          const link = document.createElement("a");
          link.href = "/Oscar Zuñiga_Cv.pdf";
          link.download = "Oscar Zuñiga_Cv.pdf";
          link.click();
        }}
        className={btnClasses}
      >
        {t.download}
      </button>
    </section>
  );
};

export default CVPage;
