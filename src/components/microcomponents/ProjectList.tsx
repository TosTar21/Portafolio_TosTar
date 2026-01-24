import ProjectCard from "./ProjectCard";
import { useLanguage } from "../../hooks/useLanguage";
import { projectData } from "../../data/projects";
import { motion } from "framer-motion";

const ProjectsList = () => {
  const { language } = useLanguage();
  const projects = projectData[language] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10 w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8">
      {projects.map((project, idx) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: idx * 0.1, ease: "easeOut" }}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsList;