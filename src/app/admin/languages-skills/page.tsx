"use client";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import { Language } from "@/types/Language";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import Title from "@/components/Common/Title";

export interface Skill {
  _id?: string;
  name: string;
  iconUrl: string;
}

const ManageLanguagesPage = () => {
  const [currentTitle, setCurrentTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", iconUrl: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill>({
    name: "",
    iconUrl: "",
  });
  const [languages, setLanguages] = useState<Language[]>([]);

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/language/`);
      setLanguages(response.data);
    } catch (error) {
      console.error("Failed to fetch languages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleAddSkill = async () => {
    if (!currentTitle || !newSkill.name || !newSkill.iconUrl) {
      toast.error("All fields are required.");
      return;
    }

    try {
      if (isEditing && editingSkill) {
        const response = axios.put(`/api/language/editLanguage`, {
          title: currentTitle,
          skill: {
            name: newSkill.name,
            iconUrl: newSkill.iconUrl,
          },
        });
        toast.promise(response, {
          loading: "Updating Skill...",
          success: () => {
            fetchLanguages();
            return "Skill updated successfully.";
          },
          error: (error) => {
            console.log(error);
            return "Failed to update skill.";
          },
        });
      } else {
        const reponse = axios.post(`/api/language/addLanguage`, {
          title: currentTitle,
          skills: newSkill,
        });
        toast.promise(reponse, {
          loading: "Adding Skill...",
          success: "Skill added successfully.",
          error: "Failed to add skill.",
        });
      }
      setNewSkill({ name: "", iconUrl: "" });
      setIsEditing(false);
    } catch {
      toast.error("Failed to save skill.");
    }
  };

  const handleDeleteSkill = async (title: string, skillId: string) => {
    if (!confirm(`Do you want to delete ${skillId}`)) {
      return;
    }
    try {
      const response = axios.post(`/api/language/deleteLanguage`, {
        title,
        skillId,
      });
      toast.promise(response, {
        loading: "Deleting Skill...",
        success: "Skill deleted successfully.",
        error: "Failed to delete skill.",
      });
      fetchLanguages();
    } catch {
      toast.error("Failed to delete skill.");
    }
  };

  const handleEditSkill = (
    title: string,
    skill: { name: string; iconUrl: string }
  ) => {
    setCurrentTitle(title);
    setNewSkill({ name: skill.name, iconUrl: skill.iconUrl });
    setEditingSkill(skill);
    setIsEditing(true);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Title
        title="Languages & Skills Management"
        subTitle="Manage programming languages and skills."
      />
      <div className="px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 lg:gap-6 mb-8">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Select a Language Title <span className="text-error">*</span>
            </legend>
            <select
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              className="select select-primary w-full mb-4"
            >
              <option value="">Select a Language Title</option>
              {[
                "Frontend Finesse 🎨",
                "Backend Brilliance ⚙️",
                "Database Dominance 🗃️",
                "Language Loadout 💻",
                "Tool Trove 🧰",
                "AI/ML Arsenal 🤖",
                "Framework Forcefield 🚀",
                "App Crafting 🚀",
              ].map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Skill Name <span className="text-error">*</span>
            </legend>
            <input
              type="text"
              value={newSkill.name}
              placeholder="Enter skill name"
              onChange={(e) =>
                setNewSkill((prev) => ({ ...prev, name: e.target.value }))
              }
              className="input input-primary w-full"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Icon URL <span className="text-error">*</span>
            </legend>
            <input
              type="text"
              value={newSkill.iconUrl}
              placeholder="Enter icon URL"
              onChange={(e) =>
                setNewSkill((prev) => ({ ...prev, iconUrl: e.target.value }))
              }
              className="input input-primary w-full"
            />
          </fieldset>

          <div className="flex flex-row gap-4 w-full">
            <button
              className="btn btn-primary mx-auto w-full lg:mt-8.5"
              onClick={handleAddSkill}
            >
              {isEditing ? "Update Skill" : "Add Skill"}
            </button>
            {isEditing && (
              <button
                className="btn btn-error mx-auto w-full"
                onClick={() => {
                  setIsEditing(false);
                  setNewSkill({ name: "", iconUrl: "" });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {languages.map((lang) => (
            <div
              key={lang.title}
              className="bg-base-300 shadow-xl rounded-2xl text-base-content overflow-x-auto"
            >
              <div className="px-6 py-4 w-full overflow-x-auto ">
                <h2 className="text-center py-2 uppercase font-bold">
                  {lang.title}
                </h2>
                <table className="table table-zebra bg-base-100">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Skills</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lang.skills.map((skill, index) => (
                      <tr key={skill.name}>
                        <td>{index + 1}</td>
                        <td>{skill.name}</td>
                        <td className="space-x-2">
                          <div className="flex flex-row gap-2">
                            <button
                              className="btn btn-sm btn-info"
                              onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                handleEditSkill(lang.title, skill);
                              }}
                            >
                              Edit
                              <IconEdit />
                            </button>
                            <button
                              className="btn btn-sm btn-error"
                              onClick={() =>
                                handleDeleteSkill(lang.title, skill.name)
                              }
                            >
                              Delete <IconTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ManageLanguagesPage;
