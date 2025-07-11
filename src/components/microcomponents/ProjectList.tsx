import ProjectCard from "./ProjectCard";
import { useLanguage } from "../../hooks/useLanguage";
import { projectData } from "../../data/projects";
import { motion } from "framer-motion";

const ProjectsList = () => {
  const { language } = useLanguage();
  const projects = projectData[language] || [];

  return (
    <div className="flex flex-col items-center gap-20 w-full py-8">
      {projects.map((project, idx) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
          className="w-full flex justify-center"
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectsList;