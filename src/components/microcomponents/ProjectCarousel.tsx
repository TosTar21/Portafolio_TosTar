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

  const nextProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (!projects.length) return null;

  return (
    <div className="relative w-[360px] h-[410px] flex items-center justify-center overflow-visible">
      
      {/* Flecha Izquierda */}
      <button
        type="button"
        onClick={prevProject}
        // Prevenir que el botón se enfoque al presionarlo para evitar scroll
        onMouseDown={(e) => e.preventDefault()}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-lg text-black p-2 bg-white rounded-full shadow-md hover:bg-gray-100 cursor-pointer transition-colors"
      >
        <FaArrowLeft />
      </button>

      {/* Tarjeta animada */}
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

      {/* Flecha Derecha */}
      <button
        type="button"
        onClick={nextProject}
        onMouseDown={(e) => e.preventDefault()}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-lg text-black p-2 bg-white rounded-full shadow-md hover:bg-gray-100 cursor-pointer transition-colors"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default ProjectsCarousel;
