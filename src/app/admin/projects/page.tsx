"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { ProjectData } from "@/types/Project";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { useCache } from "@/context/cacheContext";
import { technologies } from "@/helper/technologies";
import Title from "@/components/Common/Title";

const industries = [
  "E-commerce",
  "Healthcare",
  "Finance",
  "Education",
  "Entertainment",
  "Real Estate",
  "Travel",
  "Social Media",
  "Productivity",
  "Food & Beverage",
];

const ManageProjectsPage = () => {
  const { cache: user } = useCache();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [newProject, setNewProject] = useState<Partial<ProjectData>>({});
  const [imageFile, setImageFile] = useState<File[] | null>(null);
  const [bannerImageFile, setBannerImageFile] = useState<File | null>(null);

  const handleEditProject = (project: ProjectData) => {
    setNewProject(project);
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
      !newProject.title ||
      !newProject.desc ||
      !newProject.technologies ||
      !newProject.github ||
      !newProject.stack ||
      !imageFile ||
      imageFile.length === 0 ||
      !bannerImageFile ||
      !newProject.technologies.length ||
      !newProject.industry
    ) {
      toast.error(
        `Please fill all the required fields. Remaining fields are:${
          !newProject.title ? " Title," : ""
        }${!newProject.desc ? " Description," : ""}${
          !newProject.technologies?.length ? " Technologies," : ""
        }${!newProject.github ? " GitHub," : ""}${
          !newProject.stack ? " Stack," : ""
        }${!imageFile || imageFile.length === 0 ? " Images," : ""}${
          !bannerImageFile ? " Banner Image," : ""
        }${!newProject.industry ? " Industry," : ""}`
      );
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", newProject.name || "");
      formData.append("title", newProject.title);
      formData.append("slug", newProject.slug || "");
      formData.append("desc", newProject.desc);
      formData.append("industry", newProject.industry);
      formData.append("challenge", newProject.challenge || "");
      formData.append("solution", newProject.solution || "");
      formData.append("bannerImage", bannerImageFile);
      for (let i = 0; i < imageFile.length; i++) {
        formData.append("images", imageFile[i]);
      }
      formData.append("liveLink", newProject.liveLink || "");
      formData.append(
        "technologies",
        JSON.stringify(
          Object.entries(newProject.technologies).map(([stack, techList]) => ({
            stack: techList.stack,
            technologies: techList.technologies,
          }))
        )
      );
      formData.append("features", newProject.features?.join("\n") || "");
      formData.append("github", newProject.github);
      formData.append(
        "envVariables",
        newProject.envVariables?.join("\n") || ""
      );
      formData.append(
        "testimonialClientFeedback",
        newProject.testimonial?.clientFeedback || ""
      );
      formData.append(
        "testimonialClientName",
        newProject.testimonial?.clientName || ""
      );
      formData.append("stack", newProject.stack || "");
      const response = axios.post("/api/project/add-project", formData);
      toast.promise(response, {
        loading: "Adding Project...",
        success: "Project added successfully!",
        error: (err) => {
          return err.response?.data?.message || "Failed to add project.";
        },
      });
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Failed to save project.");
    }
  };

  const handleToggleApproval = async (projectId: string, newStatus: boolean) => {
  try {
    const response = axios.patch(`/api/project/updateStatus`, {
      projectId,
      approved: newStatus,
    });

    toast.promise(response, {
      loading: newStatus ? "Approving Project..." : "Disabling Project...",
      success: `Project ${newStatus ? "approved" : "disabled"} successfully!`,
      error: `Failed to ${newStatus ? "approve" : "disable"} project.`,
    });
  } catch (error) {
    console.error("Failed to update status", error);
  }
};

  if (!user) return <Loading />;

  return (
    <>
      <Title title="Projects Management" subTitle="Manage your projects." />
      <div className="px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6">
          {/* Project Name */}
          <fieldset className="fieldset col-span-3 md:col-span-1">
            <legend className="fieldset-legend">
              Project Name <span className="text-error">*</span>
            </legend>
            <input
              type="text"
              value={newProject.name}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter project name"
              className="input input-primary w-full"
            />
          </fieldset>
          {/* Project Title */}
          <fieldset className="fieldset col-span-3 md:col-span-1">
            <legend className="fieldset-legend">
              Project Title <span className="text-error">*</span>
            </legend>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev,
                  title: e.target.value,
                  slug: encodeURIComponent(
                    e.target.value.split(" ").join("-").toLowerCase()
                  ),
                }))
              }
              placeholder="Enter project title"
              className="input input-primary w-full"
            />
          </fieldset>
          {/* Project Slug */}
          <fieldset className="fieldset col-span-3 md:col-span-1">
            <legend className="fieldset-legend">
              Project Slug <span className="text-error">*</span>
            </legend>
            <input
              type="text"
              value={newProject.slug}
              readOnly
              placeholder="Enter project slug"
              className="input input-primary w-full"
            />
          </fieldset>
          {/* Project Description */}
          <fieldset className="fieldset col-span-3">
            <legend className="fieldset-legend">
              Project Description <span className="text-error">*</span>
            </legend>
            <textarea
              value={newProject.desc}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, desc: e.target.value }))
              }
              placeholder="Enter project description"
              className="textarea textarea-primary w-full"
            />
          </fieldset>
          {/* Project Industry */}
          <fieldset className="fieldset col-span-3 md:col-span-1">
            <legend className="fieldset-legend">
              Project Industry <span className="text-error">*</span>
            </legend>
            <select
              className="select select-primary w-full"
              value={newProject.industry}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, industry: e.target.value }))
              }
            >
              <option value="">Select Industry</option>
              {industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
          </fieldset>
          {/* Project Banner Image */}
          <fieldset className="fieldset col-span-3 md:col-span-1">
            <legend className="fieldset-legend">
              Project Banner Image <span className="text-error">*</span>
            </legend>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-primary w-full"
              onChange={(e) =>
                setBannerImageFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </fieldset>
          {/* Project Images */}
          <fieldset className="fieldset col-span-3 md:col-span-1">
            <legend className="fieldset-legend">
              Project Images <span className="text-error">*</span>
            </legend>
            <input
              type="file"
              accept="image/*"
              multiple
              className="file-input file-input-primary w-full"
              onChange={(e) =>
                setImageFile(e.target.files ? Array.from(e.target.files) : null)
              }
            />
          </fieldset>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-3">
            {/* Project Challenge */}
            <fieldset className="fieldset col-span-3 md:col-span-1">
              <legend className="fieldset-legend">
                Project Challenge <span className="text-error">*</span>
              </legend>
              <textarea
                value={newProject.challenge}
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev,
                    challenge: e.target.value,
                  }))
                }
                placeholder="Enter project challenge"
                className="textarea textarea-primary w-full"
              />
            </fieldset>
            {/* Project Solution */}
            <fieldset className="fieldset col-span-3 md:col-span-1">
              <legend className="fieldset-legend">
                Project Solution <span className="text-error">*</span>
              </legend>
              <textarea
                value={newProject.solution}
                onChange={(e) =>
                  setNewProject((prev) => ({
                    ...prev,
                    solution: e.target.value,
                  }))
                }
                placeholder="Enter project solution"
                className="textarea textarea-primary w-full"
              />
            </fieldset>
          </div>
          {/* Is Project Live */}
          <fieldset className="fieldset col-span-3 md:col-span-1">
            <legend className="fieldset-legend">
              Is the project live? <span className="text-error">*</span>
            </legend>
            <input
              type="text"
              value={newProject.liveLink}
              placeholder="Is the project live?"
              className="input input-primary w-full"
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, liveLink: e.target.value }))
              }
            />
          </fieldset>
          {/* Github Repo */}
          <fieldset className="fieldset col-span-3 md:col-span-1">
            <legend className="fieldset-legend">
              Github Repository <span className="text-error">*</span>
            </legend>
            <input
              type="text"
              value={newProject.github}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, github: e.target.value }))
              }
              placeholder="Enter Github repository link"
              className="input input-primary w-full"
            />
          </fieldset>
          {/* Stack Type */}
          <fieldset className="fieldset col-span-3 md:col-span-1">
            <legend className="fieldset-legend">
              Tech Stack <span className="text-error">*</span>
            </legend>
            <select
              value={newProject.stack}
              onChange={(e) =>
                setNewProject((prev) => ({ ...prev, stack: e.target.value }))
              }
              className="select select-primary w-full"
            >
              <option value="">Choose a stack</option>
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
                "Blockchain Builders ⛓️",
              ].map((stackOption) => (
                <option key={stackOption} value={stackOption}>
                  {stackOption}
                </option>
              ))}
            </select>
          </fieldset>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Project Features */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Project Features <span className="text-error">*</span>
            </legend>
            <textarea
              value={newProject.features?.join("\n")}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev,
                  features: e.target.value
                    .split("\n")
                    .map((f) => f.replace("-", ":").trim()),
                }))
              }
              placeholder="Enter project features"
              className="textarea textarea-primary w-full"
            />
          </fieldset>
          {/* Environment Variables */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Environment Variables</legend>
            <textarea
              value={newProject.envVariables?.join("\n")}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev,
                  envVariables: e.target.value
                    .toUpperCase()
                    .replace(" ", "_")
                    .split("\n"),
                }))
              }
              placeholder="Enter environment variables"
              className="textarea textarea-primary w-full"
            />
          </fieldset>
          {/* Client Testimonial */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Client Testimonial</legend>
            <textarea
              value={newProject.testimonial?.clientFeedback}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev,
                  testimonial: {
                    clientFeedback: e.target.value,
                    clientName: prev.testimonial?.clientName ?? "",
                  },
                }))
              }
              placeholder="Enter client testimonial"
              className="textarea textarea-primary w-full"
            />
          </fieldset>
          {/* Client Name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Client Name</legend>
            <textarea
              value={newProject.testimonial?.clientName}
              onChange={(e) =>
                setNewProject((prev) => ({
                  ...prev,
                  testimonial: {
                    clientName: e.target.value,
                    clientFeedback: prev.testimonial?.clientFeedback ?? "",
                  },
                }))
              }
              placeholder="Enter client name"
              className="textarea textarea-primary w-full"
            />
          </fieldset>
        </div>
        {/* Technologies */}
        <fieldset className="fieldset mt-3">
          <legend className="fieldset-legend text-lg">
            Technologies <span className="text-error">*</span>
          </legend>
          {newProject.technologies?.length === 0 ? (
            <p>No technologies selected.</p>
          ) : (
            <div className="mb-4 text-base py-4 bg-primary/10 rounded-lg px-3">
              <strong>Selected Technologies:</strong>{" "}
              {Object.entries(technologies)
                .flatMap(([stack, techList]) =>
                  techList.filter((tech) =>
                    newProject.technologies?.some(
                      (t) => t.stack === stack && t.technologies.includes(tech)
                    )
                  )
                )
                .join(", ")}
            </div>
          )}
          <div className="space-y-4">
            {Object.entries(technologies).map(([stack, techList]) => (
              <div key={stack}>
                <h3 className="font-semibold text-base capitalize mb-2">
                  {stack.replace(/([A-Z])/g, " $1")}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {techList.map((tech) => (
                    <button
                      key={tech}
                      type="button"
                      className={`btn btn-sm ${
                        newProject.technologies?.some(
                          (t) =>
                            t.stack === stack && t.technologies.includes(tech)
                        )
                          ? "btn-primary"
                          : "btn-outline"
                      }`}
                      onClick={() => {
                        const existingTech = newProject.technologies || [];
                        const stackIndex = existingTech.findIndex(
                          (item) => item.stack === stack
                        );

                        let updatedTechnologies = [...existingTech];

                        if (stackIndex !== -1) {
                          const current = updatedTechnologies[stackIndex];
                          if (current.technologies.includes(tech)) {
                            current.technologies = current.technologies.filter(
                              (t) => t !== tech
                            );
                          } else {
                            current.technologies.push(tech);
                          }
                          if (current.technologies.length === 0)
                            updatedTechnologies.splice(stackIndex, 1);
                          else updatedTechnologies[stackIndex] = current;
                        } else {
                          updatedTechnologies.push({
                            stack,
                            technologies: [tech],
                          });
                        }
                        setNewProject((prev) => ({
                          ...(prev || {}),
                          technologies: updatedTechnologies,
                        }));
                      }}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </fieldset>
        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            className="btn btn-primary w-full"
            onClick={handleAddUpdateProject}
          >
            {newProject._id ? "Update Project" : "Add Project"}
          </button>
          <button
            className="btn btn-error"
            onClick={() => {
              window.location.reload();
            }}
          >
            Cancel
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 gap-6">
          {user.projects.map((project) => (
            <div
              key={project._id}
              className="card shadow-xl bg-base-300 overflow-hidden border border-base-100"
            >
              {project.bannerImage && (
                <figure className="relative h-48 w-full">
                  <Image
                    src={`data:${
                      project.bannerImage.contentType
                    };base64,${Buffer.from(project.bannerImage.data).toString(
                      "base64"
                    )}`}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </figure>
              )}

              <div className="card-body p-5">
                <div className="flex justify-between items-start">
                  <h3 className="card-title text-lg">
                    {project.name}{" "}
                    <span className="text-opacity-50 text-sm">
                      | {project.title}
                    </span>
                  </h3>
                  <div
                    className={`badge ${
                      project.approved ? "badge-success" : "badge-ghost"
                    } badge-sm`}
                  >
                    {project.approved ? "Live" : "Pending"}
                  </div>
                </div>

                <p className="text-sm line-clamp-2">{project.desc}</p>

                <div className="text-xs text-base-content/70 mt-2">
                  <span className="font-bold">Stack:</span>{" "}
                  {project.technologies
                    .flatMap((techObj) => techObj.technologies)
                    .join(", ")}
                </div>

                <div className="card-actions justify-end mt-4 pt-4 border-t border-base-100">
                  <button
                    className={`btn btn-sm ${
                      project.approved ? "btn-outline btn-info" : "btn-success"
                    }`}
                    onClick={() =>
                      handleToggleApproval(project._id!, !project.approved)
                    }
                  >
                    {project.approved ? "Disable" : "Approve"}
                  </button>

                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEditProject(project)}
                  >
                    <IconEdit size={16} />
                  </button>

                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDeleteProject(project._id!)}
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageProjectsPage;
