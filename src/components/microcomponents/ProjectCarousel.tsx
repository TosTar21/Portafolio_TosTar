import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useLanguage } from "../../hooks/useLanguage";
import { projectData } from "../../data/projects";

const ProjectsCarousel = () => {
  const { language } = useLanguage();
  const projects = projectData[language] || [];
  const [activeIndex, setActiveIndex] = useState(0);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (!projects.length) return null; // Si no hay proyectos, no renderiza nada

  return (
    // El contenedor se amplió para dejar espacio a las flechas fuera de la tarjeta.
    <div className="relative w-[400px] h-[450px] flex items-center justify-center overflow-visible">
      
      {/* Flecha Izquierda, posicionada fuera del contenedor de la tarjeta */}
      <button
        onClick={prevProject}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-2xl text-black p-2 bg-white rounded-full shadow-md hover:bg-gray-100 cursor-pointer transition-colors"
      >
        <FaArrowLeft />
      </button>

      {/* Contenedor de la tarjeta animada */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ProjectCard project={projects[activeIndex]} />
        </motion.div>
      </AnimatePresence>

      {/* Flecha Derecha, posicionada fuera del contenedor de la tarjeta */}
      <button
        onClick={nextProject}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-2xl text-black p-2 bg-white rounded-full shadow-md hover:bg-gray-100 cursor-pointer transition-colors"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ProjectsCarousel;
