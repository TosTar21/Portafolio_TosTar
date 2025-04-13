import { motion } from "framer-motion";
import ProjectsList from "../microcomponents/ProjectList";
import { useLanguage } from "../../hooks/useLanguage";
import { useTheme } from "../../hooks/useTheme";

const Project = () => {
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();

  return (
    <motion.section
      className={`min-h-screen w-full flex flex-col items-center justify-center py-10 md:py-20 gap-10 md:gap-20 transition-all duration-700 ${
        isDarkMode ? "bg-neutral-800 text-white" : "bg-neutral-100 text-black"
      }`}
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        {language === "en" ? "Projects" : "Proyectos"}
      </motion.h1>
      <ProjectsList />
    </motion.section>
  );
};

export default Project;
