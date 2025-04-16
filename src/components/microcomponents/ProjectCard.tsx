import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { SiReact, SiVite, SiTailwindcss, SiSharp, SiMysql } from "react-icons/si";
import { useTheme } from "../../hooks/useTheme";

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

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { isDarkMode } = useTheme();

  return (
    // Se define el tamaño base para móviles y se aumentan en pantallas grandes (lg)
    <div className="relative w-[265px] h-[420px] lg:w-[360px] lg:h-[480px]">
      {/* Tarjeta principal con efecto hover */}
      <div
        className={`relative w-full h-full border-2 rounded-lg p-6 flex flex-col shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105
          ${isDarkMode ? "bg-[#262626] border-white text-white" : "bg-white border-black text-black"}
        `}
      >
        {/* Borde "dibujado a mano" */}
        <div
          className={`absolute inset-0 border-[3px] rounded-lg transform rotate-1
            ${isDarkMode ? "border-white" : "border-black"}
          `}
        ></div>

        {/* Número de proyecto + línea */}
        <div className="relative z-10 text-sm font-bold">{project.number}</div>
        <div
          className={`relative z-10 w-full h-[2px] my-2
            ${isDarkMode ? "bg-white" : "bg-black"}
          `}
        ></div>

        {/* Título */}
        <h3 className="relative z-10 text-lg font-bold">{project.title}</h3>

        {/* Imagen del proyecto */}
        <div className="relative z-10 w-full h-44 overflow-hidden rounded-lg mt-2">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Descripción */}
        <p className="relative z-10 text-sm mt-2">{project.description}</p>

        {/* Badges de tecnologías */}
        <div className="relative z-10 flex gap-2 mt-2 flex-wrap">
          {project.badges.map((tech, index) => {
            let IconComponent;
            switch (tech) {
              case "React":
                IconComponent = SiReact;
                break;
              case "Vite":
                IconComponent = SiVite;
                break;
              case "TailwindCSS":
                IconComponent = SiTailwindcss;
                break;
                case ".NET":
                  IconComponent = SiSharp;
                  break
                  case "MySQL":
                    IconComponent = SiMysql;
                break;
              default:
                IconComponent = null;
            }
            return (
              <span
                key={index}
                className={`border px-3 py-1 rounded-md text-sm font-semibold shadow-md flex items-center gap-1
                  ${isDarkMode ? "border-white bg-[#262626] text-white" : "border-black bg-white text-black"}
                `}
              >
                {IconComponent && <IconComponent size={16} />}
                {tech}
              </span>
            );
          })}
        </div>

        {/* Enlaces de GitHub y Sitio web */}
        <div className="relative z-10 mt-auto flex justify-center gap-4 pt-2">
          {/* Enlace Live Demo */}
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative group text-3xl transition-all duration-300 ${
              isDarkMode ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
            }`}
          >
            <FaExternalLinkAlt />
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </a>

          {/* Enlace GitHub */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative group text-3xl transition-all duration-300 ${
              isDarkMode ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
            }`}
          >
            <FaGithub />
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
