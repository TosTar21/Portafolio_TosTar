import React from "react";
import {
  SiCss3,
  SiFigma,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { aboutData } from "../../data/about";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";
import { motion } from "framer-motion";

const AboutMe = () => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const about = aboutData[language];

  const techData: { [key: string]: { icon: React.ComponentType<{ size?: number }>, link: string } } = {
    HTML: { icon: SiHtml5, link: "https://www.w3schools.com/html/" },
    CSS: { icon: SiCss3, link: "https://www.w3schools.com/Css/" },
    JavaScript: { icon: SiJavascript, link: "https://www.w3schools.com/Js/" },
    React: { icon: SiReact, link: "https://reactjs.org" },
    TypeScript: { icon: SiTypescript, link: "https://www.typescriptlang.org" },
    TailwindCSS: { icon: SiTailwindcss, link: "https://tailwindcss.com" },
    "React Query": { icon: SiReact, link: "https://tanstack.com/query/v4" },
    Firebase: { icon: SiFirebase, link: "https://firebase.google.com" },
    Supabase: { icon: SiSupabase, link: "https://supabase.com" },
    Git: { icon: SiGit, link: "https://git-scm.com" },
    GitHub: { icon: SiGit, link: "https://github.com" },
    "React Hook Form": { icon: SiReact, link: "https://react-hook-form.com" },
    Figma: { icon: SiFigma, link: "https://www.figma.com" },
  };

  return (
<motion.section
  className={`
    min-h-screen w-full flex flex-col items-center justify-center
    pt-12 md:pt-20 px-6 md:px-12 transition-all duration-500
    ${isDarkMode ? "bg-neutral-800 text-white" : "bg-neutral-100 text-black"}
  `}
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
>
  <div className="max-w-5xl w-full mx-auto flex flex-col items-center gap-16">
    {/* Fila 1: Imagen */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">

    <div
      className={`
        flex-shrink-0 transition-transform duration-300
        hover:scale-105 hover:shadow-2xl
        `}
        >
      <img
        src={about.image}
        alt={about.name}
        className={`
          w-60 h-70 md:w-72 md:h-82 rounded-xl
          object-cover object-[top]
          border-2 shadow-lg
          ${isDarkMode ? "border-neutral-600" : "border-neutral-300"}
          transition-transform duration-300
          `}
          />
    </div>

    {/* Fila 2: Texto */}
    <div className="flex flex-col space-y-4 text-center items-center w-full px-2 md:px-16">
      <h2 className="text-3xl md:text-4xl font-bold">{about.name}</h2>
      <h3 className="text-xl md:text-2xl font-semibold text-primary">{about.title}</h3>
      <p className="text-base md:text-lg leading-relaxed opacity-90 max-w-2xl mx-auto">
        {about.description}
      </p>
    </div>
          </div>

    {/* Fila 3: Skills y Languages */}
    <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-center">
      {/* Skills */}
      <div className="flex-1 flex flex-col items-center">
        <h4 className="text-lg md:text-xl font-bold">{about.skillsTitle}</h4>
       <div className="flex flex-wrap gap-3 mt-4 justify-center">
  {about.skills.map((skill, i) => {
    const tech = techData[skill] || { icon: SiReact, link: "https://reactjs.org" };
    const IconComponent = tech.icon;
    return (
      <a
        key={i}
        href={tech.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 border px-5 py-2 rounded-lg text-base font-semibold shadow-md
          transition-transform duration-200 hover:scale-110
          ${isDarkMode ? "border-white bg-[#262626] text-white hover:bg-neutral-700" : "border-black bg-white text-black hover:bg-gray-100"}
        `}
      >
        {IconComponent && <IconComponent size={22} />}
        {skill}
      </a>
    );
  })}
</div>
      </div>
{/* Languages */}
<div className="flex-1 flex flex-col items-center">
  <h4 className="text-lg md:text-xl font-bold">{about.languagesTitle}</h4>
  <div className="flex flex-wrap gap-4 mt-4 justify-center">
    {about.languagesDescription.filter(Boolean).map((lang, i) => (
      <span
        key={i}
        className={`inline-flex items-center gap-2 border px-5 py-2 rounded-lg text-base font-semibold shadow-md
          transition-transform duration-200 hover:scale-110
          ${isDarkMode ? "border-white bg-[#262626] text-white hover:bg-neutral-700" : "border-black bg-white text-black hover:bg-gray-100"}
        `}
      >
        {lang.trim()}
      </span>
    ))}
  </div>
</div>

    </div>
  </div>

  {/* Experiencia y Educación */}
  <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mt-12">
    <div className="space-y-4">
      <h4 className="text-lg md:text-xl font-bold">{about.workExperienceTitle}</h4>
      <p className="text-base md:text-lg leading-relaxed opacity-90">
        {about.workExperienceDescription}
      </p>
    </div>
    <div className="space-y-4">
      <h4 className="text-lg md:text-xl font-bold">{about.educationTitle}</h4>
      <p className="text-base md:text-lg leading-relaxed opacity-90">
        {about.educationDescription}
      </p>
    </div>
  </div>
</motion.section>
  );
};

export default AboutMe;
