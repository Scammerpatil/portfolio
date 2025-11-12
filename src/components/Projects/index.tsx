"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectData } from "@/types/Project";
import ProjectCard from "./ProjectCard";
import SectionTitle from "../Common/SectionTitle";

const Projects = ({ projects }: { projects: ProjectData[] }) => {
  const stacks = Array.from(new Set(projects.map((project) => project.stack)));

  // Track active tab
  const [activeStack, setActiveStack] = useState(stacks[0]);

  const filteredProjects = projects.filter((p) => p.stack === activeStack);

  return (
    <section
      id="projects"
      className="px-6 md:px-24 py-16 bg-base-200 roboto-condensed"
    >
      <SectionTitle
        title="Masterstrokes 🎨"
        paragraph="Dive into my repertoire of ingenious creations and digital craftsmanship."
      />

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mt-10">
        {stacks.map((stack) => (
          <button
            key={stack}
            onClick={() => setActiveStack(stack)}
            className={`btn btn-sm md:btn-md lg:btn-lg rounded-full transition-all duration-300 ${
              activeStack === stack
                ? "btn-primary text-primary-content shadow-lg scale-105"
                : "btn-outline"
            }`}
          >
            {stack}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStack}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProjectCard props={project} />
                </motion.div>
              ))
            ) : (
              <p className="text-center text-lg opacity-60 col-span-full py-10">
                No projects available under this stack yet 🚧
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
