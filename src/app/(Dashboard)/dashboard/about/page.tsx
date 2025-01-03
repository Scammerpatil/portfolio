"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useUser } from "@/context/userContext";
import { User } from "@/types/User";
import SectionTitle from "@/app/(Dashboard)/components/SectionTitle";
import axios from "axios";
import toast from "react-hot-toast";

const AboutPage = () => {
  const user = useUser().user;
  const [newUser, setNewUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) setNewUser(user);
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = () => {
    const response = axios.put("/api/User/editUser", { user: newUser });
    toast.promise(response, {
      loading: "Saving Edited User...",
      success: "User Saved Successfully",
      error: "Something went wrong",
    });
  };

  if (!user) return <Loading />;

  return (
    <div className="mx-auto p-6 max-w-4xl">
      <SectionTitle title="About Me" paragraph="Get to know me better!" />

      <div className="space-y-6">
        <label className="form-control">
          <div className="label">
            <span className="text-base">Name</span>
          </div>
          <input
            type="text"
            name="name"
            value={newUser?.name || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`input w-full ${
              isEditing ? "input-bordered" : "bg-base-200 text-base-content"
            }`}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="text-base">Email</span>
          </div>
          <input
            type="email"
            name="email"
            value={newUser?.email || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`input w-full ${
              isEditing ? "input-bordered" : "bg-base-200 text-base-content"
            }`}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="text-base">Bio</span>
          </div>
          <textarea
            name="bio"
            value={newUser?.bio || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`textarea w-full ${
              isEditing ? "textarea-bordered" : "bg-base-200 text-base-content"
            }`}
            rows={4}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="text-base">Phone</span>
          </div>
          <input
            type="text"
            name="phone"
            value={newUser?.phone || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            className={`textarea w-full ${
              isEditing ? "input-bordered" : "bg-base-200 text-base-content"
            }`}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="text-base">Stack</span>
          </div>
          <textarea
            name="stack"
            value={newUser?.stack?.join(", ") || ""}
            rows={3}
            onChange={(e) =>
              setNewUser((prev) =>
                prev ? { ...prev, stack: e.target.value.split(", ") } : null
              )
            }
            disabled={!isEditing}
            className={`textarea w-full ${
              isEditing ? "textarea-bordered" : "bg-base-200 text-base-content"
            }`}
          />
        </label>
      </div>

      <div className="mt-8 flex justify-between">
        {!isEditing ? (
          <button
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <button className={`btn btn-success`} onClick={handleSave}>
            {"Save Changes"}
          </button>
        )}
        {isEditing && (
          <button
            className="btn btn-error"
            onClick={() => {
              setNewUser(user);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
