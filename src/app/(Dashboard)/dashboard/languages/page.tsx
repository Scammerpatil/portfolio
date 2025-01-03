"use client";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import SectionTitle from "@/app/(Dashboard)/components/SectionTitle";
import { useUser } from "@/context/userContext";
import Loading from "@/components/Loading";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export interface Skill {
  _id?: string;
  name: string;
  iconUrl: string;
}

const ManageLanguagesPage = () => {
  const user = useUser().user;
  const [currentTitle, setCurrentTitle] = useState("");
  const [newSkill, setNewSkill] = useState({ name: "", iconUrl: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill>({
    name: "",
    iconUrl: "",
  });
  if (!user) return <Loading />;

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
          success: "Skill updated successfully.",
          error: "Failed to update skill.",
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

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <SectionTitle
        title="Manage Skills"
        paragraph="Add, edit, or delete skills."
      />

      <div className="mb-6">
        <select
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          className="select select-bordered w-full mb-4"
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

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Skill Name</span>
          </label>
          <input
            type="text"
            value={newSkill.name}
            onChange={(e) =>
              setNewSkill((prev) => ({ ...prev, name: e.target.value }))
            }
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Icon URL</span>
          </label>
          <input
            type="text"
            value={newSkill.iconUrl}
            onChange={(e) =>
              setNewSkill((prev) => ({ ...prev, iconUrl: e.target.value }))
            }
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex gap-4">
          <button className="btn btn-primary" onClick={handleAddSkill}>
            {isEditing ? "Update Skill" : "Add Skill"}
          </button>
          {isEditing && (
            <button
              className="btn btn-error"
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
        {user.languages.map((lang) => (
          <div key={lang.title} className="card bg-primary shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-center py-2 text-primary-content">
                {lang.title}
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {lang.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center justify-between text-primary-content"
                  >
                    <span>{skill.name}</span>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => handleEditSkill(lang.title, skill)}
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
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageLanguagesPage;
