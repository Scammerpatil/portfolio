"use client";
import Title from "@/components/Common/Title";
import { Experience } from "@/types/Experience";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({});

  const fetchExperiences = async () => {
    try {
      const response = await axios.get("/api/experience/");
      setExperiences(response.data);
    } catch (error) {
      console.error("Failed to fetch experience:", error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);
  const handleSubmit = async () => {
    try {
      if (
        !newExperience.role ||
        !newExperience.company ||
        !newExperience.startDate ||
        !newExperience.desc ||
        !file ||
        !newExperience.skills
      ) {
        toast.error("Please fill all the required fields");
        return;
      }
      const formData = new FormData();
      formData.append("role", newExperience.role);
      formData.append("company", newExperience.company);
      formData.append("companyURL", newExperience.companyURL || "");
      formData.append(
        "startDate",
        newExperience.startDate as unknown as string
      );
      if (newExperience.endDate) {
        formData.append("endDate", newExperience.endDate as unknown as string);
      }
      formData.append("desc", newExperience.desc);
      formData.append("skills", newExperience.skills.join(","));
      formData.append("image", file);
      const res = axios.post("/api/experience/add-experience", formData);
      toast.promise(res, {
        loading: "Adding experience...",
        success: "Experience added successfully!",
        error: (err) =>
          err.response?.data?.message || "Failed to add experience",
      });
      setNewExperience({});
      setFile(null);
      fetchExperiences();
    } catch (error) {
      toast.error("Failed to add experience");
      console.error("Failed to add experience:", error);
    }
  };
  const handleEdit = async (exp: Experience) => {
    setNewExperience(exp);
  };
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    try {
      const res = axios.delete(`/api/experience/delete-experience?id=${id}`);
      toast.promise(res, {
        loading: "Deleting experience...",
        success: "Experience deleted successfully!",
        error: "Failed to delete experience",
      });
      fetchExperiences();
    } catch (error) {
      console.error("Failed to delete experience:", error);
      toast.error("Failed to delete experience");
    }
  };
  return (
    <>
      <Title
        title="Experience Management"
        subTitle="Manage your experiences."
      />
      {/* Add New Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10 py-4">
        <fieldset className="fieldset col-span-3 md:col-span-1">
          <legend className="legend">
            Role <span className="text-error">*</span>
          </legend>
          <input
            type="text"
            name="role"
            placeholder="e.g., Frontend Developer"
            className="input input-primary w-full"
            value={newExperience.role}
            onChange={(e) =>
              setNewExperience({ ...newExperience, role: e.target.value })
            }
          />
        </fieldset>
        <fieldset className="fieldset col-span-3 md:col-span-1">
          <legend className="legend">
            Company <span className="text-error">*</span>
          </legend>
          <input
            type="text"
            name="company"
            placeholder="Infosys"
            className="input input-primary w-full"
            value={newExperience.company}
            onChange={(e) =>
              setNewExperience({ ...newExperience, company: e.target.value })
            }
          />
        </fieldset>
        <fieldset className="fieldset col-span-3 md:col-span-1">
          <legend className="legend">
            Company Official Website URL <span className="text-error">*</span>
          </legend>
          <input
            type="text"
            name="companyURL"
            placeholder="https://www.infosys.com"
            className="input input-primary w-full"
            value={newExperience.companyURL}
            onChange={(e) =>
              setNewExperience({ ...newExperience, companyURL: e.target.value })
            }
          />
        </fieldset>
        <fieldset className="fieldset col-span-3 md:col-span-1">
          <legend className="legend">
            Start Date <span className="text-error">*</span>
          </legend>
          <input
            type="date"
            name="startDate"
            placeholder="e.g., 2022-01-01"
            className="input input-primary w-full"
            value={new Date(newExperience.startDate || new Date())
              .toISOString()
              .slice(0, 10)}
            onChange={(e) =>
              setNewExperience({
                ...newExperience,
                startDate: new Date(e.target.value),
              })
            }
          />
        </fieldset>
        <fieldset className="fieldset col-span-3 md:col-span-1">
          <legend className="legend">End Date</legend>
          <input
            type="date"
            name="endDate"
            className="input input-primary w-full"
            value={new Date(newExperience.endDate || new Date())
              .toISOString()
              .slice(0, 10)}
            onChange={(e) =>
              setNewExperience({
                ...newExperience,
                endDate: new Date(e.target.value),
              })
            }
          />
        </fieldset>
        {/* Image */}
        <fieldset className="fieldset col-span-3 md:col-span-1">
          <legend className="legend">
            Image <span className="text-error">*</span>
          </legend>
          <input
            type="file"
            name="image"
            className="file-input file-input-primary w-full"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </fieldset>
        <fieldset className="fieldset col-span-3">
          <legend className="legend">
            Description <span className="text-error">*</span>
          </legend>
          <textarea
            name="desc"
            placeholder="Describe your role and responsibilities..."
            className="textarea textarea-primary w-full"
            value={newExperience.desc}
            onChange={(e) =>
              setNewExperience({ ...newExperience, desc: e.target.value })
            }
          />
        </fieldset>
        <fieldset className="fieldset col-span-3">
          <legend className="legend">
            Skills (comma separated) <span className="text-error">*</span>
          </legend>
          <input
            type="text"
            placeholder="C, C++, Java, Python ...."
            name="skills"
            className="input input-primary w-full"
            value={newExperience?.skills?.join(", ")}
            onChange={(e) =>
              setNewExperience({
                ...newExperience,
                skills: e.target.value.split(", "),
              })
            }
          />
        </fieldset>
        <button
          className="btn btn-primary col-span-3 w-full"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 px-10">
        {experiences.map((exp) => (
          <div
            key={exp._id}
            className="card bg-base-200 border border-primary shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <figure className="p-4 bg-base-300">
              <img
                src={`data:${exp.image.contentType};base64,${Buffer.from(
                  exp.image.data
                ).toString("base64")}`}
                alt={exp.company}
                className="rounded-xl w-28 h-28 object-cover"
              />
            </figure>
            <div className="card-body">
              <div className="card-title justify-between w-full">
                <div className="space-y-1">
                  <h2 className="card-title">{exp.role}</h2>
                  <a
                    href={exp.companyURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    {exp.company}
                  </a>
                </div>

                <p className="text-sm text-base-content/60">
                  {new Date(exp.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}{" "}
                  -{" "}
                  {exp.endDate
                    ? new Date(exp.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })
                    : "Present"}
                </p>
              </div>

              <p className="text-base-content/90 text-sm mt-2">{exp.desc}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {exp.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="badge badge-primary badge-outline px-3 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-warning"
                  onClick={() => handleEdit(exp)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(exp._id!)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
