// src/pages/About.tsx
import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";
import { aboutData } from "../data/about";

// Importamos íconos de Simple Icons
import { SiHtml5, SiCss3, SiJavascript, SiReact, SiTypescript, SiTailwindcss, SiFigma } from "react-icons/si";

const About = () => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const about = aboutData[language];

  // Mapeo de cada skill a su ícono y URL oficial
  const techData: { [key: string]: { icon: React.ComponentType<{ size?: number }>, link: string } } = {
    HTML: { icon: SiHtml5, link: "https://www.w3schools.com/html/" },
    CSS: { icon: SiCss3, link: "https://www.w3schools.com/Css/" },
    JavaScript: { icon: SiJavascript, link: "https://www.w3schools.com/Js/" },
    React: { icon: SiReact, link: "https://reactjs.org" },
    TypeScript: { icon: SiTypescript, link: "https://www.typescriptlang.org" },
    TailwindCSS: { icon: SiTailwindcss, link: "https://tailwindcss.com" },
    "React Query": { icon: SiReact, link: "https://tanstack.com/query/v4" },
    "React Hook Form": { icon: SiReact, link: "https://react-hook-form.com" },
    Figma: { icon: SiFigma, link: "https://www.figma.com" },
  };

  return (
    <motion.section
      className={`min-h-screen w-full flex flex-col items-center justify-center pt- md:pt-36 px-6 md:px-12 transition-all duration-500 ${
        isDarkMode ? "bg-neutral-800 text-white" : "bg-neutral-100 text-black"
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Contenedor principal con Grid para que la imagen y el texto se estiren al mismo alto */}
      <div
        className="
          max-w-7xl mx-auto
          py-62 md:py-20
          px-6 md:px-12
          grid grid-cols-1 md:grid-cols-2
          items-stretch gap-10 md:gap-20
        "
      >
        {/* Columna de la imagen */}
        <div className="relative flex justify-center md:justify-end">
          <img
            src={about.image}
            alt={about.name}
            className="rounded-xl object-cover w-[200px] h-auto md:w-[280px] md:h-full"
          />
        </div>

        {/* Columna de texto */}
        <div className="flex flex-col space-y-4 justify-center">
          <h2 className="text-3xl md:text-4xl font-bold">{about.name}</h2>
          <h3 className="text-xl md:text-2xl font-semibold">{about.title}</h3>
          <p className="text-base md:text-lg leading-relaxed">{about.description}</p>

          {/* Skills */}
          <h4 className="text-lg md:text-xl font-bold mt-4">{about.skillsTitle}</h4>
          <div className="flex flex-wrap gap-2">
            {about.skills.map((skill, i) => {
              // Si no se encuentra el skill en el mapeo, se usa un fallback con el icono de React
              const tech = techData[skill] || { icon: SiReact, link: "https://reactjs.org" };
              const IconComponent = tech.icon;
              return (
                <a
                  key={i}
                  href={tech.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 border px-3 py-1 rounded-md text-sm font-medium transition-colors hover:bg-opacity-90 ${
                    isDarkMode
                      ? "border-white bg-[#262626] text-white"
                      : "border-black bg-white text-black"
                  }`}
                >
                  {IconComponent && <IconComponent size={20} />}
                  <span>{skill}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
