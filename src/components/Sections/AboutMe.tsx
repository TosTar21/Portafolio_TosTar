import { SiCss3, SiFigma, SiHtml5, SiJavascript, SiReact, SiTailwindcss, SiTypescript } from "react-icons/si";
import { aboutData } from "../../data/about";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";
import { motion } from "framer-motion";

const AboutMe = () => {
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
      className={`
        min-h-screen w-full flex flex-col items-center
        pt-12 md:pt-36 px-6 md:px-12 transition-all duration-500
        ${isDarkMode ? "bg-neutral-800 text-white" : "bg-neutral-100 text-black"}
      `}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Sección Superior: Imagen y Datos Básicos */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
        {/* Columna de la imagen */}
        <div className="relative flex justify-center md:justify-end">
        <img
  src={about.image}
  alt={about.name}
  className="
    rounded-xl
    w-auto       /* El ancho se ajusta automáticamente a su contenido */
    h-auto       /* La altura se ajusta automáticamente a su contenido */
    max-w-[200px]  /* Máximo de 200px en pantallas pequeñas */
    md:max-w-[280px] /* Máximo de 280px en pantallas medianas en adelante */
"
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
              const tech = techData[skill] || { icon: SiReact, link: "https://reactjs.org" };
              const IconComponent = tech.icon;
              return (
                <a
                  key={i}
                  href={tech.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    inline-flex items-center gap-1 border px-3 py-1 rounded-md text-sm font-medium
                    transition-colors hover:bg-opacity-90
                    ${isDarkMode ? "border-white bg-[#262626] text-white" : "border-black bg-white text-black"}
                  `}
                >
                  {IconComponent && <IconComponent size={20} />}
                  <span>{skill}</span>
                </a>
              );
            })}
          </div>

          {/* Idiomas debajo de las skills */}
          <h4 className="text-lg md:text-xl font-bold mt-4">{about.languagesTitle}</h4>
          <p className="text-base md:text-lg leading-relaxed">
            {about.languagesDescription}
          </p>
        </div>
      </div>

      {/* Sección Inferior: Experiencia y Educación */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mt-12">
        {/* Experiencia Laboral */}
        <div className="space-y-4">
          <h4 className="text-lg md:text-xl font-bold">{about.workExperienceTitle}</h4>
          <p className="text-base md:text-lg leading-relaxed">
            {about.workExperienceDescription}
          </p>
        </div>

        {/* Educación */}
        <div className="space-y-4">
          <h4 className="text-lg md:text-xl font-bold">{about.educationTitle}</h4>
          <p className="text-base md:text-lg leading-relaxed">
            {about.educationDescription }
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutMe;
