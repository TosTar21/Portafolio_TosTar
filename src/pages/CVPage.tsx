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

  return (
    <div className="min-h-screen w-full transition-all duration-500 px-6 md:px-12">
      <section className="pt-24 pb-16 flex flex-col items-center gap-6">
        {/* Visor PDF con fallback */}
        <object
          data="/Resume_Oscar.pdf#view=FitH"
          type="application/pdf"
          className="w-full h-[calc(100vh-8rem)]"
        >
          <embed src="/Resume_Oscar.pdf" type="application/pdf" />
          <p className="text-center mt-4">
            {t.fallback}
            <a
            href="/Resume_Oscar.pdf"
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
            link.href = "/Resume_Oscar.pdf";
            link.download = "Resume_Oscar.pdf";
            link.click();
          }}
          className={`inline-flex items-center gap-2 border px-5 py-2 rounded-lg text-base hover:cursor-pointer font-semibold shadow-md transition-transform duration-200 hover:scale-105 ${
            isDarkMode ? "border-white bg-[#262626] text-white hover:bg-neutral-700" : "border-black bg-white text-black hover:bg-gray-100"
          }`}
        >
          {t.download}
        </button>
      </section>
    </div>
  );
};

export default CVPage;
