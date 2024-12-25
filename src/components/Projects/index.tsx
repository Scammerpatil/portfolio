import { ProjectData } from "@/types/Project";
import SectionTitle from "../Common/SectionTitle";
import { ProjectInfo } from "../User";
import ProjectCard from "./ProjectCard";
import { useState } from "react";

const Projects = ({ projects }: { projects: ProjectData[] }) => {
  // Extract unique stacks from the projects
  const stacks = Array.from(
    new Set(projects.map((project: any) => project.stack))
  );
  console.log(stacks);
  const [activeTab, setActiveTab] = useState(stacks[0]);

  return (
    <div className="px-6 py-10 bg-base-100 font-mono md:px-20" id="Projects">
      <SectionTitle
        title="Masterstrokes 🎨"
        paragraph="Dive into my repertoire of ingenious creations and digital craftsmanship."
      />

      {/* Tabs for project stacks */}
      <div role="tablist" className="tabs tabs-bordered">
        {stacks.map((stack) => (
          <button
            key={stack}
            role="tab"
            aria-selected={activeTab === stack}
            className={`tab text-base-content text-base md:text-xl ${
              activeTab === stack ? "tab-active text-primary" : ""
            }`}
            onClick={() => setActiveTab(stack)}
          >
            {stack}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex flex-wrap justify-around md:justify-between sm:justify-center gap-4 md:gap-2 mt-6">
        {projects
          .filter((project: any) => project.stack === activeTab)
          .map((project: any, index: number) => (
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
