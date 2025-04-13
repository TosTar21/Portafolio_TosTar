
import ProjectCard from "./ProjectCard";
import { useLanguage } from "../../hooks/useLanguage";
import { projectData } from "../../data/projects";
import ProjectsCarousel from "./ProjectCarousel";

const ProjectsList = () => {
  const { language } = useLanguage();
  const projects = projectData[language] || [];

  return (
    <>
      {/* Carrusel en pantallas < md */}
      <div className="md:hidden">
        <ProjectsCarousel />
      </div>

      {/* Grid en pantallas >= md */}
      <div className="hidden md:grid grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export default ProjectsList;
