import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import {
  SiReact,
  SiVite,
  SiTailwindcss,
  SiSharp,
  SiMysql,
} from "react-icons/si";
import { useTheme } from "../../hooks/useTheme";
import { projectData } from "../../data/projects";

interface Project {
  id: number;
  number: string;
  title: string;
  description: string;
  image: string;
  badges: string[];
  github: string;
  liveDemo: string;
}

interface ProjectCardProps {
  project: Project;
}

const iconsMap: Record<string, React.ComponentType<{ size?: number }>> = {
  React: SiReact,
  Vite: SiVite,
  TailwindCSS: SiTailwindcss,
  ".NET": SiSharp,
  MySQL: SiMysql,
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { isDarkMode } = useTheme();
  const { badgeDocs }: { badgeDocs: Record<string, string> } = projectData;

  return (
    <div className="relative w-[90vw] max-w-[1100px] md:w-[85vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl shadow-xl overflow-hidden border-2 transition-transform duration-300 hover:scale-105
      ${isDarkMode ? 'bg-[#1e1e1e] border-neutral-700 text-white' : 'bg-white border-neutral-300 text-black'}
    ">
      {/* Imagen superior ocupando todo el ancho */}
      <div className="w-full h-[300px] md:h-[300px] lg:h-[350px] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido debajo de la imagen */}
      <div className="p-6 md:p-10 lg:p-12 flex flex-col gap-4">
        {/* Número + línea */}
        <div>
          <p className="text-sm font-semibold tracking-wide opacity-80">
            {project.number} | {project.title}
          </p>
          <div className={`h-[3px] w-20 my-2 ${isDarkMode ? "bg-white/50" : "bg-black/50"}`} />
        </div>

        {/* Título */}
        <h3 className="text-3xl font-bold">
          {project.title}
        </h3>

        {/* Descripción */}
        <p className="text-base md:text-lg opacity-90">
          {project.description}
        </p>

        {/* Badges enlazadas */}
        <div className="flex flex-wrap gap-3 mt-2">
          {project.badges.map((tech) => {
            const Icon = iconsMap[tech];
            const href = badgeDocs[tech];
            return (
              <a
                key={tech}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-medium shadow-sm
                  transition-transform duration-200 hover:scale-105
                  ${isDarkMode
                    ? "border-neutral-600 bg-[#2c2c2c] text-white hover:bg-[#3a3a3a]"
                    : "border-neutral-400 bg-gray-50 text-black hover:bg-gray-100"}
                `}
              >
                {Icon && <Icon size={18} />}
                {tech}
              </a>
            );
          })}
        </div>
{/* Enlaces externos */}
<div className="flex gap-5 mt-4">
  {/* Demo */}
  {project.liveDemo && (
    <a
      href={project.liveDemo}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative group text-2xl transition-colors duration-300
        ${isDarkMode ? "text-white hover:text-gray-400" : "text-black hover:text-gray-700"}
      `}
    >
      <FaExternalLinkAlt />
      {/* Línea debajo */}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] w-0 group-hover:w-full transition-all duration-300
          ${isDarkMode ? "bg-white" : "bg-black"}
        `}
      />
      {/* Sombra naranja */}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-8 rounded-full blur-md bg-orange-400 opacity-0 group-hover:opacity-60 transition-opacity duration-200 pointer-events-none z-[-1]" />
    </a>
  )}
  {/* GitHub solo si existe */}
  {project.github && (
    <a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative group text-2xl transition-colors duration-300
        ${isDarkMode ? "text-white hover:text-gray-400" : "text-black hover:text-gray-700"}
      `}
    >
      <FaGithub />
      {/* Línea debajo */}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] w-0 group-hover:w-full transition-all duration-300
          ${isDarkMode ? "bg-white" : "bg-black"}
        `}
      />
      {/* Sombra naranja */}
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-8 rounded-full blur-md bg-orange-400 opacity-0 group-hover:opacity-60 transition-opacity duration-200 pointer-events-none z-[-1]" />
    </a>
  )}
</div>
      </div>
    </div>
  );
};

export default ProjectCard;
