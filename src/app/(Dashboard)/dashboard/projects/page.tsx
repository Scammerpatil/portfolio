"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SectionTitle from "@/app/(Dashboard)/components/SectionTitle";
import Loading from "@/components/Loading";
import { useUser } from "@/context/userContext";
import { ProjectData } from "@/types/Project";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Image from "next/image";

const ManageProjectsPage = () => {
  const user = useUser().user;
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [newProject, setNewProject] = useState<ProjectData>({
    title: "",
    desc: "",
    live: false,
    technologies: [],
    github: "",
    stack: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const availableTechnologies = [
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "JavaScript",
    "TypeScript",
    "Python",
    "Django",
    "Flask",
    "Angular",
    "Vue.js",
    "Ruby on Rails",
    "PHP",
    "Laravel",
  ];

  const handleAddTechnology = (tech: string) => {
    setNewProject((prev) => ({
      ...prev,
      technologies: [...new Set([...prev.technologies, tech])],
    }));
  };

  const handleRemoveTechnology = (tech: string) => {
    setNewProject((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const handleEditProject = (project: ProjectData) => {
    setNewProject({
      title: project.title,
      desc: project.desc,
      live: project.live,
      technologies: project.technologies,
      github: project.github,
      stack: project.stack,
      image: project.image,
    });
    setIsEditing(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const response = axios.post(`/api/project/deleteProject`, {
        projectId,
      });
      toast.promise(response, {
        loading: "Deleting Project...",
        success: "Project deleted successfully!",
        error: "Failed to delete project.",
      });
      setProjects(projects.filter((proj) => proj._id !== projectId));
    } catch {
      toast.error("Failed to delete project.");
    }
  };

  const handleAddUpdateProject = async () => {
    if (
      newProject.technologies.length === 0 ||
      !newProject.title ||
      !newProject.desc ||
      !newProject.github ||
      !newProject.stack ||
      !imageFile
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", newProject.title);
      formData.append("desc", newProject.desc);
      formData.append("live", String(newProject.live));
      formData.append("technologies", newProject.technologies.join(","));
      formData.append("github", newProject.github);
      formData.append("stack", newProject.stack);
      formData.append("image", imageFile);
      const response = axios.post("/api/project/addProject", formData);
      toast.promise(response, {
        loading: "Adding Project...",
        success: "Project added successfully!",
        error: "Failed to add project.",
      });
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project.");
    }
  };

  if (!user) return <Loading />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <SectionTitle
        title="Manage Projects"
        paragraph="Add, update, or delete projects."
      />

      {/* Project Title */}
      <label className="form-control w-full mt-6">
        <span className="label-text">Project Title</span>
        <input
          type="text"
          value={newProject.title}
          onChange={(e) =>
            setNewProject((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Enter project title"
          className="input input-bordered w-full"
        />
      </label>

      {/* Project Description */}
      <label className="form-control w-full mt-6">
        <span className="label-text">Project Description</span>
        <textarea
          value={newProject.desc}
          onChange={(e) =>
            setNewProject((prev) => ({ ...prev, desc: e.target.value }))
          }
          placeholder="Enter project description"
          className="textarea textarea-bordered w-full"
        ></textarea>
      </label>

      {/* Project Image */}
      <label className="form-control w-full mt-6">
        <span className="label-text">Project Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="file-input file-input-bordered w-full"
        />
      </label>

      {/* Live URL */}
      <label className="form-control w-full mt-6">
        <span className="label-text">Live URL</span>
        <input
          type="url"
          value={newProject.link}
          onChange={(e) =>
            setNewProject((prev) => ({ ...prev, link: e.target.value }))
          }
          placeholder="Enter live URL"
          className="input input-bordered w-full"
        />
      </label>

      {/* GitHub URL */}
      <label className="form-control w-full mt-6">
        <span className="label-text">GitHub URL</span>
        <input
          type="url"
          value={newProject.github}
          onChange={(e) =>
            setNewProject((prev) => ({ ...prev, github: e.target.value }))
          }
          placeholder="Enter GitHub URL"
          className="input input-bordered w-full"
        />
      </label>

      {/* Technologies */}
      <div className="form-control w-full mt-6">
        <span className="label-text">Technologies</span>
        <div className="flex flex-wrap gap-2 mb-2">
          {availableTechnologies.map((tech) => (
            <button
              key={tech}
              className={`btn btn-sm ${
                newProject.technologies.includes(tech)
                  ? "btn-primary"
                  : "btn-outline"
              }`}
              onClick={() =>
                newProject.technologies.includes(tech)
                  ? handleRemoveTechnology(tech)
                  : handleAddTechnology(tech)
              }
            >
              {tech}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={newProject.technologies.join(",")}
          readOnly
          className="input input-bordered w-full cursor-not-allowed"
        />
      </div>

      {/* Live */}
      <label className="form-control w-full mt-6">
        <span className="label-text">Is the project live?</span>
        <input
          type="checkbox"
          checked={newProject.live}
          onChange={(e) =>
            setNewProject((prev) => ({ ...prev, live: e.target.checked }))
          }
          className="checkbox checkbox-primary"
        />
      </label>

      {/* Stack Dropdown */}
      <label className="form-control w-full">
        <span className="label-text">Select Stack</span>
        <select
          value={newProject.stack}
          onChange={(e) =>
            setNewProject((prev) => ({ ...prev, stack: e.target.value }))
          }
          className="select select-bordered w-full"
        >
          <option value="" disabled>
            Choose a stack
          </option>
          {[
            "MERN Magic ✨",
            "MEAN Machine 💻",
            "Spring-Run 🏃",
            "Next Level 🆙",
            "Flask Forge 🔥",
            "Brainy Bots 🤖",
            "Extension X 🚀",
            "Java Jolt ⚡",
            "PHP Power ⚙️",
          ].map((stackOption) => (
            <option key={stackOption} value={stackOption}>
              {stackOption}
            </option>
          ))}
        </select>
      </label>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="btn btn-primary" onClick={handleAddUpdateProject}>
          {isEditing ? "Update Project" : "Add Project"}
        </button>
        {isEditing && (
          <button
            className="btn btn-error"
            onClick={() => {
              setIsEditing(false);
              setNewProject({
                title: "",
                desc: "",
                live: false,
                technologies: [],
                github: "",
                stack: "",
                image: "",
              });
              setImageFile(null);
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Displaying Projects */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Projects Showcase</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {user.projects.map((project) => (
            <div
              key={project._id}
              className="card shadow-lg compact bg-base-100"
            >
              {project.image && (
                <Image
                  src={project.image.toString()}
                  alt={project.title}
                  height={192}
                  width={384}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="card-body">
                <h3 className="card-title">{project.title}</h3>
                <p>{project.desc}</p>
                <p className="text-sm text-base-content mt-2">
                  Technologies: {project.technologies.join(", ")}
                </p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEditProject(project)}
                  >
                    Edit <IconEdit />
                  </button>
                  <button
                    className="btn btn-error"
                    onClick={() => handleDeleteProject(project._id!)}
                  >
                    Delete <IconTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProjectsPage;
