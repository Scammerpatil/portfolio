import { IconX } from "@tabler/icons-react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddTestimonial() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    linkedIn: "",
    content: "",
    designation: "",
    star: "",
    currentEmployer: "",
    currentPosition: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("linkedIn", formData.linkedIn);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("designation", formData.designation);
      formDataToSend.append("star", formData.star);
      formDataToSend.append("currentEmployer", formData.currentEmployer);
      formDataToSend.append("currentPosition", formData.currentPosition);
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const response = axios.post("/api/review/add-review", formDataToSend);
      toast.promise(response, {
        loading: "Submitting your review... 📝",
        success: () => {
          window.location.reload();
          (document.getElementById("newReview") as HTMLDialogElement).close();
          return "Success! 🎉 Your review is submitted.";
        },
        error: "Oops! 😬 Something went wrong, please try again.",
      });
    } catch {
      toast.error("Something went wrong 😞 Please try again!");
    }
  };

  return (
    <dialog id="newReview" className="modal">
      <div className="modal-box w-11/12 max-w-5xl text-sm md:text-base my-10 py-10 lg:py-0 lg:my-0">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-base-content"
          onClick={() =>
            (document.getElementById("newReview") as HTMLDialogElement).close()
          }
        >
          <IconX size={24} />
        </button>
        <h3 className="font-bold text-center text-2xl text-base-content uppercase">
          ✨ Submit Your Testimonial ✨
        </h3>
        <p className="py-4 text-center text-base-content">
          Share your awesome feedback! 😊
        </p>
        <div className="p-4 border rounded-lg bg-base-200 max-w-4xl mx-auto">
          <fieldset className="fieldset">
            <legend className="fieldset-legend">What’s your name? 🤔</legend>
            <input
              type="text"
              className="input input-primary w-full"
              placeholder="Enter your name here... 😎"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Your email address? 📧</legend>
            <input
              type="email"
              className="input input-primary w-full"
              placeholder="Enter your email here... 📨"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Where do you work? 🏢</legend>
            <input
              type="text"
              placeholder="Enter your current employer... 💼"
              className="input input-primary w-full"
              name="currentEmployer"
              value={formData.currentEmployer}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              What’s your role there? 💼
            </legend>
            <input
              type="text"
              className="input input-primary w-full"
              placeholder="Enter your current position... 🧑‍💼"
              name="currentPosition"
              value={formData.currentPosition}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Your LinkedIn? 🔗</legend>
            <input
              type="url"
              className="input input-primary w-full"
              placeholder="Enter your LinkedIn username... 🌐"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              What’s your designation? 😎
            </legend>
            <select
              className="select select-primary w-full px-2"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            >
              <option value="" defaultChecked>
                Select Designation
              </option>
              <option value="friend">Friend 🤗</option>
              <option value="colleague">Colleague 👩‍💻</option>
              <option value="client">Client 💼</option>
              <option value="manager">Manager 👨‍💼</option>
              <option value="other">Other 🤷‍♂️</option>
            </select>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">
              Tell us about your experience! 🗣️
            </legend>
            <textarea
              className="textarea textarea-primary w-full"
              placeholder="Share your thoughts here... 💭"
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Rate your experience ⭐</legend>
            <input
              type="number"
              className="input input-primary w-full"
              min={1}
              max={5}
              placeholder="How many stars? 🌟"
              name="star"
              value={formData.star}
              onChange={handleChange}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Share a photo! 📸</legend>
            <input
              type="file"
              className="file-input file-input-primary w-full"
              placeholder="Upload your photo here... 🤳"
              name="image"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                }
              }}
            />
          </fieldset>
        </div>
        <form method="dialog" className="flex justify-around gap-6 mt-4">
          <button className="btn btn-primary w-1/2" onClick={handleSubmit}>
            Submit 🥳
          </button>
          <button className="btn btn-error w-1/2">Close 🦸‍♂️</button>
        </form>
      </div>
    </dialog>
  );
}
