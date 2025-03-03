import { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useLanguage } from "../../hooks/useLanguage";
import { projectData } from "../../data/projects";

const ProjectCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { language } = useLanguage();
  const project = projectData[language];

  return (
    <div className="relative w-[350px] h-[450px] perspective-1000">
      {/* Contenedor animado para el efecto de pasar página */}
      <motion.div
        className="relative w-full h-full rounded-lg shadow-lg"
        initial={false}
        animate={{ rotateY: isFlipped ? -180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Cara frontal (Página de portada) */}
        <div className="absolute w-full h-full bg-white border-2 border-black rounded-lg p-6 flex flex-col shadow-lg overflow-hidden backface-hidden">
          {/* Borde irregular "dibujado" */}
          <div className="absolute inset-0 border-[3px] border-black rounded-lg transform rotate-1"></div>
   {/* Número del Proyecto con línea debajo */}
   <div className="relative z-10 text-sm font-bold">{project.number}</div>
          <div className="relative z-10 w-full h-[2px] bg-black my-2"></div>

          {/* Título */}
          <h3 className="relative z-10 text-lg font-bold">{project.title}</h3>

          {/* Imagen del proyecto */}
          <div className="relative z-10 w-full h-40 overflow-hidden rounded-lg">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          {/* Descripción */}
          <p className="relative z-10 text-sm mt-3">{project.description}</p>

          {/* Badges de tecnologías */}
          <div className="relative z-10 flex gap-2 mt-3">
            {project.badges.map((tech, index) => (
              <span
                key={index}
                className="border border-black px-3 py-1 rounded-md text-sm font-semibold bg-white shadow-md"
              >
                {tech}
              </span>
            ))}
          </div>


          {/* Flecha para girar la página */}
          <button
            onClick={() => setIsFlipped(true)}
            className="absolute top-3 right-3 text-black hover:text-gray-700 transition-all duration-300"
          >
            <FaArrowRight size={20} />
          </button>
        </div>

        {/* Cara trasera (Detalles con enlaces) */}
        <div
          className="absolute w-full h-full bg-gray-100 border-2 border-black rounded-lg p-6 flex flex-col items-center justify-center shadow-lg backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* Borde irregular "dibujado" */}
          <div className="absolute inset-0 border-[3px] border-black rounded-lg transform rotate-1"></div>

          {/* Enlaces */}
          <div className="flex justify-center flex-col gap-6 mt-6">
            <span>
                <strong>{project.title}</strong>
            </span>
            <div className="flex justify-center gap-4">
            <a
              href="https://example.com" // Aquí puedes colocar el enlace real
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-black hover:text-gray-700 transition-all duration-300"
              >
              <FaExternalLinkAlt />
            </a>
            <a
              href="https://github.com/example" // Aquí puedes colocar el enlace real
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-black hover:text-gray-700 transition-all duration-300"
              >
              <FaGithub />
            </a>
                </div>
          </div>

          {/* Flecha para regresar a la portada */}
          <button
            onClick={() => setIsFlipped(false)}
            className="absolute top-3 right-3 text-black hover:text-gray-700 transition-all duration-300"
          >
            <FaArrowLeft size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
