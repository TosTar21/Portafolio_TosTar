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
  SiNodedotjs,
  SiPostgresql,
  SiPhp,
  SiMysql,
  SiSharp,
  SiVite,
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
    "Tailwind CSS": { icon: SiTailwindcss, link: "https://tailwindcss.com" },
    TailwindCSS: { icon: SiTailwindcss, link: "https://tailwindcss.com" },
    "React Query": { icon: SiReact, link: "https://tanstack.com/query/v4" },
    Firebase: { icon: SiFirebase, link: "https://firebase.google.com" },
    Supabase: { icon: SiSupabase, link: "https://supabase.com" },
    Git: { icon: SiGit, link: "https://git-scm.com" },
    GitHub: { icon: SiGit, link: "https://github.com" },
    "React Hook Form": { icon: SiReact, link: "https://react-hook-form.com" },
    Figma: { icon: SiFigma, link: "https://www.figma.com" },
    "Node.js": { icon: SiNodedotjs, link: "https://nodejs.org" },
    PostgreSQL: { icon: SiPostgresql, link: "https://www.postgresql.org" },
    PHP: { icon: SiPhp, link: "https://www.php.net" },
    MySQL: { icon: SiMysql, link: "https://www.mysql.com" },
    "C#": { icon: SiSharp, link: "https://learn.microsoft.com/en-us/dotnet/csharp/" },
    Vite: { icon: SiVite, link: "https://vitejs.dev" },
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

  {/* Experiencia Laboral */}
  <div className="max-w-5xl w-full mx-auto mt-16">
    <h3 className="text-lg md:text-xl font-bold mb-10 border-b-2 border-primary pb-2">
      {about.workExperienceTitle}
    </h3>
    <div className="space-y-10">
      {about.workExperience.map((job, index) => (
        <div
          key={index}
          className={`
            relative pl-16 p-6 rounded-lg border-2 shadow-lg
            transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
            ${isDarkMode ? "bg-neutral-700/50 border-neutral-600 hover:bg-neutral-700/70" : "bg-white border-neutral-300 hover:border-primary"}
          `}
        >
          {/* Icon */}
          <div
            className={`
              absolute left-[-20px] top-6 w-10 h-10 rounded-full
              flex items-center justify-center
              ${isDarkMode ? "bg-neutral-700" : "bg-neutral-200"}
              border-2 ${isDarkMode ? "border-neutral-600" : "border-neutral-300"}
            `}
          >
            <svg
              className={isDarkMode ? "text-white" : "text-black"}
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h4 className="text-lg md:text-xl font-bold">{job.company}</h4>
              <span className={`text-sm font-semibold ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
                {job.year}
              </span>
            </div>
            <p className={`text-base font-semibold ${isDarkMode ? "text-primary" : "text-primary"}`}>
              {job.position}
            </p>
            <p className={`text-base leading-relaxed ${isDarkMode ? "text-neutral-300" : "text-neutral-700"}`}>
              {job.description}
            </p>

            {/* Technologies */}
            <div className="mt-4">
              <p className="font-semibold mb-3">{about.technologiesLabel}</p>
              <div className="flex flex-wrap gap-2">
                {job.technologies.map((tech, i) => {
                  const techInfo = techData[tech] || { icon: SiReact, link: "#" };
                  const TechIcon = techInfo.icon;
                  return (
                    <span
                      key={i}
                      className={`
                        inline-flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-semibold shadow-md
                        transition-transform duration-200 hover:scale-110
                        ${isDarkMode ? "border-white bg-[#262626] text-white hover:bg-neutral-600" : "border-black bg-white text-black hover:bg-gray-100"}
                      `}
                    >
                      {TechIcon && <TechIcon size={18} />}
                      {tech}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Educación */}
  <div className="max-w-5xl w-full mx-auto mt-16 mb-12">
    <h3 className="text-lg md:text-xl font-bold mb-10 border-b-2 border-primary pb-2">
      {about.educationTitle}
    </h3>
    <div className="space-y-10">
      {about.education.map((edu, index) => (
        <div
          key={index}
          className={`
            relative pl-16 p-6 rounded-lg border-2 shadow-lg
            transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
            ${isDarkMode ? "bg-neutral-700/50 border-neutral-600 hover:bg-neutral-700/70" : "bg-white border-neutral-300 hover:border-primary"}
          `}
        >
          {/* Icon */}
          <div
            className={`
              absolute left-[-20px] top-6 w-10 h-10 rounded-full
              flex items-center justify-center
              ${isDarkMode ? "bg-neutral-700" : "bg-neutral-200"}
              border-2 ${isDarkMode ? "border-neutral-600" : "border-neutral-300"}
            `}
          >
            <svg
              className={isDarkMode ? "text-white" : "text-black"}
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h4 className="text-lg md:text-xl font-bold">{edu.institution}</h4>
              <span className={`text-sm font-semibold ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
                {edu.year}
              </span>
            </div>
            <p className={`text-base font-semibold ${isDarkMode ? "text-primary" : "text-primary"}`}>
              {edu.degree}
            </p>
            <p className={`text-base leading-relaxed ${isDarkMode ? "text-neutral-300" : "text-neutral-700"}`}>
              {edu.description}
            </p>

          </div>
        </div>
      ))}
    </div>
  </div>
</motion.section>
  );
};

export default AboutMe;
