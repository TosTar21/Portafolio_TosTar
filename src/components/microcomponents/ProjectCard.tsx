// src/components/ProjectCard/ProjectCard.tsx
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
  const { badgeDocs }: { badgeDocs: Record<string, string> } = projectData; // mapea nombre de tech → URL de docs

  return (
    <div className="relative w-[265px] h-[420px] lg:w-[360px] lg:h-[480px]">
      <div
        className={`
          relative w-full h-full border-2 rounded-lg p-6 flex flex-col shadow-lg overflow-hidden
          transform transition-transform duration-300 hover:scale-105
          ${isDarkMode ? "bg-[#262626] border-white text-white" : "bg-white border-black text-black"}
        `}
      >
        {/* “Borde dibujado” */}
        <div
          className={`
            absolute inset-0 border-[3px] rounded-lg transform rotate-1
            ${isDarkMode ? "border-white" : "border-black"}
          `}
        />

        {/* Número + línea */}
        <div className="relative z-10 text-sm font-bold">{project.number}</div>
        <div
          className={`
            relative z-10 w-full h-[2px] my-2
            ${isDarkMode ? "bg-white" : "bg-black"}
          `}
        />

        {/* Título */}
        <h3 className="relative z-10 text-lg font-bold">{project.title}</h3>

        {/* Imagen */}
        <div className="relative z-10 w-full h-44 overflow-hidden rounded-lg mt-2">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Descripción */}
        <p className="relative z-10 text-sm mt-2">{project.description}</p>

        {/* Badges enlazadas a la docs oficial */}
        <div className="relative z-10 flex flex-wrap gap-2 mt-2">
          {project.badges.map((tech) => {
            const Icon = iconsMap[tech];
            const href = badgeDocs[tech];

            return (
              <a
                key={tech}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center gap-1 border px-3 py-1 rounded-md text-sm font-semibold shadow-md
                  transition-transform duration-200 hover:scale-105
                  ${isDarkMode
                    ? "border-white bg-[#262626] text-white hover:bg-neutral-700"
                    : "border-black bg-white text-black hover:bg-gray-100"}
                `}
              >
                {Icon && <Icon size={16} />}
                {tech}
              </a>
            );
          })}
        </div>

        {/* Enlaces externos */}
        <div className="relative z-10 mt-auto flex justify-center gap-4 pt-2">
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              relative group text-3xl transition-all duration-300
              ${isDarkMode ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"}
            `}
          >
            <FaExternalLinkAlt />
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full" />
          </a>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              relative group text-3xl transition-all duration-300
              ${isDarkMode ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"}
            `}
          >
            <FaGithub />
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
