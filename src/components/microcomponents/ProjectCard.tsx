import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
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
    <div className="relative w-[350px] h-[450px]">
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
        <div className="relative z-10 w-full h-40 overflow-hidden rounded-lg mt-2">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>

        {/* Descripción */}
        <p className="relative z-10 text-sm mt-3">{project.description}</p>

        {/* Badges de tecnologías */}
        <div className="relative z-10 flex gap-2 mt-3 flex-wrap">
          {project.badges.map((tech, index) => (
            <span
              key={index}
              className={`border px-3 py-1 rounded-md text-sm font-semibold shadow-md
                ${isDarkMode ? "border-white bg-[#262626] text-white" : "border-black bg-white text-black"}
              `}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Enlaces de GitHub y Sitio web, ubicados al final */}
        <div className="relative z-10 mt-auto flex justify-center gap-4 pt-4">
          {/* Enlace Live Demo */}
          <a
            href={project.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative group text-2xl transition-all duration-300 ${
              isDarkMode ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
            }`}
          >
            <FaExternalLinkAlt />
            {/* Línea que se expande debajo (similar al Navbar) */}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </a>

          {/* Enlace GitHub */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative group text-2xl transition-all duration-300 ${
              isDarkMode ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
            }`}
          >
            <FaGithub />
            {/* Línea que se expande debajo */}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
