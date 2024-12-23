import SectionTitle from "../Common/SectionTitle";
import { ProjectInfo } from "../User";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  return (
    <div className="px-16 py-10 bg-base-100 font-mono md-mx:px-6" id="Projects">
      <SectionTitle
        title="Masterstrokes 🎨"
        paragraph="Dive into my repertoire of ingenious creations and digital craftsmanship."
      />

      <div className="flex flex-wrap justify-around md-mx:justify-between sm-mx:justify-center gap-4 md-mx:gap-2">
        {ProjectInfo.map((project: any, index: number) => (
          <ProjectCard
            key={index}
            title={project.title}
            desc={project.desc}
            image={project.image}
            live={project.live}
            link={project.link}
            github={project.github}
            technologies={project.technologies}
          />
        ))}
      </div>
    </div>
  );
};
export default Projects;
