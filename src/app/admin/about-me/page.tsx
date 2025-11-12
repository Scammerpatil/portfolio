"use client";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { User } from "@/types/User";
import axios from "axios";
import toast from "react-hot-toast";
import { useCache } from "@/context/cacheContext";
import Title from "@/components/Common/Title";

const AboutPage = () => {
  const { cache: user } = useCache();
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
    const response = axios.put("/api/user/edit-user", { user: newUser });
    toast.promise(response, {
      loading: "Saving Edited User...",
      success: "User Saved Successfully",
      error: "Something went wrong",
    });
  };

  if (!user) return <Loading />;

  return (
    <>
      <Title
        title="About Me Management"
        subTitle="Manage your about me details."
      />
      <div className="mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base capitalize">
              My Name <span className="text-error">*</span>
            </legend>
            <input
              type="text"
              className="input input-primary w-full"
              name="name"
              value={newUser?.name || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base capitalize">
              My Email <span className="text-error">*</span>
            </legend>
            <input
              type="text"
              className="input input-primary w-full"
              name="email"
              value={newUser?.email || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base capitalize">
              My Phone Number <span className="text-error">*</span>
            </legend>
            <input
              type="tel"
              className="input input-primary w-full"
              name="phone"
              value={newUser?.phone || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </fieldset>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base capitalize">
              My Bio <span className="text-error">*</span>
            </legend>
            <textarea
              className="textarea textarea-primary w-full"
              name="bio"
              value={newUser?.bio || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base capitalize">
              My Tech Stack <span className="text-error">*</span>
            </legend>
            <textarea
              className="textarea textarea-primary w-full"
              name="stack"
              value={newUser?.stack?.join(", ") || ""}
              onChange={(e) =>
                setNewUser((prev) =>
                  prev ? { ...prev, stack: e.target.value.split(", ") } : null
                )
              }
              disabled={!isEditing}
            />
          </fieldset>
        </div>

        <div className="mt-8">
          {!isEditing ? (
            <button
              className="btn btn-primary mx-auto w-full"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div className="space-y-4">
              <button className="btn btn-success w-full" onClick={handleSave}>
                Save Changes
              </button>
              <button
                className="btn btn-error w-full"
                onClick={() => {
                  setNewUser(user);
                  setIsEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AboutPage;
