"use client";

import Navbar from "@/components/Navbar";
import {
  IconFlame,
  IconMessage,
  IconTrophy,
  IconWorld,
} from "@tabler/icons-react";
import CountUp from "react-countup";
import { useState } from "react";
import { ServiceRequest } from "@/types/ServiceRequest";
import toast from "react-hot-toast";
import axios from "axios";
import SectionTitle from "@/components/Common/SectionTitle";

const Title = ({ title }: { title: string }) => {
  return (
    <h1 className="border-b py-2 text-lg lg:text-xl text-center rounded-t-4xl bg-primary/10 font-extrabold">
      <span className="font-bold">{title}</span>
    </h1>
  );
};

export default function Services() {
  const [form, setForm] = useState<ServiceRequest>({
    fullName: "",
    email: "",
    contactNumber: "",
    preferredCommunication: "" as "Email" | "Phone" | "WhatsApp" | "Other",
    projectTitle: "",
    projectDescription: "",
    projectPurpose: "",
    deadline: "",
    preferredTechnologies: [],
    expectedFeatures: "",
    educationalField: "",
    guidelines: "",
    projectComplexity: "Basic" as "Basic" | "Intermediate" | "Advanced",
    designPreferences: "",
    referenceProject: "",
    budget: "",
    paymentMethod: "UPI" as "UPI" | "Bank Transfer" | "PayPal" | "Other",
    additionalInfo: "",
    termsAccepted: false,
    activelyInvolved: false,
    regularUpdates: false,
    portfolioAuthorization: true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      if (
        !form.fullName ||
        !form.email ||
        !form.projectTitle ||
        !form.projectDescription ||
        !form.termsAccepted
      ) {
        toast.error("Please fill in all required fields.");
        return;
      }
      const response = axios.post("/api/service-request/post-new-service", {
        form,
      });
      toast.promise(response, {
        loading: "Submitting your request...",
        success: "Your request has been submitted successfully!",
        error: (err) => {
          return err.response?.data?.message || "Failed to submit the form.";
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <>
      <Navbar className="absolute" />
      <div className="min-h-screen bg-base-200 py-16 pt-36">
        {/* ---------- Stats Section ---------- */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 rounded-2xl">
            <div className="stat hover:scale-105 transition-transform duration-300 bg-base-100">
              <div className="stat-figure text-primary text-3xl">
                <IconWorld size={48} />
              </div>
              <div className="stat-title">Total Clients</div>
              <div className="stat-value text-primary">
                <CountUp end={120} duration={10} />+
              </div>
              <div className="stat-desc">Worldwide reach</div>
            </div>
            <div className="stat hover:scale-105 transition-transform duration-300 bg-base-100">
              <div className="stat-figure text-secondary text-3xl">
                <IconTrophy size={48} />
              </div>
              <div className="stat-title">Projects Completed</div>
              <div className="stat-value text-secondary">
                <CountUp end={85} duration={10} />+
              </div>
              <div className="stat-desc">Delivered on time</div>
            </div>
            <div className="stat hover:scale-105 transition-transform duration-300 bg-base-100">
              <div className="stat-figure text-accent text-3xl">
                <IconFlame size={48} />
              </div>
              <div className="stat-title">Ongoing Projects</div>
              <div className="stat-value text-accent">
                <CountUp end={25} duration={10} />+
              </div>
              <div className="stat-desc">In development</div>
            </div>
            <div className="stat hover:scale-105 transition-transform duration-300 bg-base-100">
              <div className="stat-figure text-success text-3xl">
                <IconMessage size={48} />
              </div>
              <div className="stat-title">Happy Feedbacks</div>
              <div className="stat-value text-success">
                <CountUp end={95} duration={10} />%
              </div>
              <div className="stat-desc">Client satisfaction</div>
            </div>
          </div>
        </div>

        {/* ---------- Form Section ---------- */}
        <div className="max-w-7xl mx-auto w-full bg-base-100 rounded-xl px-6 py-10 lg: shadow-md sm:p-10 md:p-12">
          <div className="max-w-5xl mx-auto text-center mb-8 px-4">
            <SectionTitle
              title="Let's Bring Your Project to Life! 🚀"
              paragraph="Fill out the form below to share your project vision, and let's create something amazing together!. Every masterpiece begins with an idea. Share yours and let’s turn it into digital art 🎨✨"
            />
          </div>

          <div className="space-y-4">
            {/* ---------- Personal Info ---------- */}
            <Title title="📇 Your Information" />
            <div className="grid md:grid-cols-2 gap-3 lg:gap-0 lg:space-x-6">
              {/* Full Name */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  👤 Full Name <span className="text-error">*</span>
                </legend>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="input rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                  placeholder="Saurav Deepak Patil"
                  required
                />
              </fieldset>
              {/* Contact Email */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  📧 Email Address <span className="text-error">*</span>
                </legend>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                  placeholder="yourmail@example.com"
                  required
                />
              </fieldset>
              {/* Contact Number */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  📞 Contact Number <span className="text-error">*</span>
                </legend>
                <input
                  type="text"
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                  className="input rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                  placeholder="Optional — helps us connect faster!"
                />
              </fieldset>
              {/* Preferred Communication */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  💬 Preferred Communication
                </legend>
                <select
                  name="preferredCommunication"
                  value={form.preferredCommunication}
                  onChange={handleChange}
                  className="select rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                >
                  <option value="">Select</option>
                  <option value="Email">Email</option>
                  <option value="Phone">Phone</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Other">Other</option>
                </select>
              </fieldset>
            </div>

            <Title title="📌 Project Details" />
            <div className="grid md:grid-cols-2 gap-3 lg:gap-0 lg:space-x-6">
              {/* Project Title */}
              <fieldset className="fieldset md:col-span-2">
                <legend className="fieldset-legend">
                  📌 Project Title <span className="text-error">*</span>
                </legend>
                <input
                  type="text"
                  name="projectTitle"
                  value={form.projectTitle}
                  onChange={handleChange}
                  className="input rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                  placeholder="e.g., Blockchain Certificate Generator"
                  required
                />
              </fieldset>
              {/* Project Description */}
              <fieldset className="fieldset md:col-span-2">
                <legend className="fieldset-legend">
                  📝 Describe Your Project <span className="text-error">*</span>
                </legend>
                <textarea
                  name="projectDescription"
                  value={form.projectDescription}
                  onChange={handleChange}
                  className="textarea rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full h-32 resize-none"
                  placeholder="Tell us about your idea, goals, or vision..."
                  required
                />
              </fieldset>
              {/* Project Purpose */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  🎯 Purpose of the Project
                </legend>
                <select
                  name="projectPurpose"
                  value={form.projectPurpose}
                  onChange={handleChange}
                  className="input rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                >
                  <option value="">
                    Portfolio, research, commercial use, etc.
                  </option>
                  <option value="College-Project">College Project</option>
                  <option value="Portfolio">Portfolio</option>
                  <option value="Research">Research</option>
                  <option value="Commercial Use">Commercial Use</option>
                  <option value="Other">Other</option>
                </select>
              </fieldset>
              {/* Project Deadline */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">⏳ Deadline</legend>
                <input
                  type="date"
                  name="deadline"
                  value={form.deadline}
                  onChange={handleChange}
                  className="input rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                />
              </fieldset>
            </div>

            <Title title="🎯 Preferences" />
            <div className="grid md:grid-cols-2 gap-3 lg:gap-0 lg:space-x-6">
              {/* Preferred Technologies */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">💡 Preferred Tech</legend>
                <input
                  type="text"
                  name="preferredTechnologies"
                  value={form.preferredTechnologies?.join(", ")}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      preferredTechnologies: e.target.value
                        .split(",")
                        .map((tech) => tech.trim()),
                    });
                  }}
                  className="input rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                  placeholder="React, Node.js, Python..."
                />
              </fieldset>
              {/* Expected Features */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  🚀 Expected Features
                </legend>
                <input
                  type="text"
                  name="expectedFeatures"
                  value={form.expectedFeatures}
                  onChange={handleChange}
                  className="input rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                  placeholder="E.g., User authentication, real-time chat..."
                />
              </fieldset>
              {/* Educational Field */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  🎓 Educational Field
                </legend>
                <select
                  name="educationalField"
                  value={form.educationalField}
                  onChange={handleChange}
                  className="select rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                >
                  <option value="">Select your educational field</option>
                  {[
                    "Engineering",
                    "BCA",
                    "MCA",
                    "Science",
                    "Arts",
                    "Commerce",
                    "Other",
                  ].map((field) => (
                    <option key={field} value={field}>
                      {field}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* Project Complexity */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">📊 Complexity Level</legend>
                <select
                  name="projectComplexity"
                  value={form.projectComplexity}
                  onChange={handleChange}
                  className="select rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                >
                  <option value="">Select</option>
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  🎨 Design Preferences
                </legend>
                <input
                  type="text"
                  name="designPreferences"
                  value={form.designPreferences}
                  onChange={handleChange}
                  className="input rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                  placeholder="You can provide link of design inspiration or describe your style: Modern, minimal, futuristic..."
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  🔗 Reference Project
                </legend>
                <input
                  type="text"
                  name="referenceProject"
                  value={form.referenceProject}
                  onChange={handleChange}
                  className="input rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                  placeholder="URL or name of similar project"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">💵 Budget</legend>
                <input
                  type="text"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="input rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                  placeholder="e.g., ₹500 - ₹2000"
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">💳 Payment Method</legend>
                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleChange}
                  className="select rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                >
                  <option value="">Select</option>
                  <option value="UPI">UPI</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Other">Other</option>
                </select>
              </fieldset>
              {/* Guidelines */}
              <fieldset className="fieldset col-span-2">
                <legend className="fieldset-legend">📚 Guidelines</legend>
                <textarea
                  name="guidelines"
                  value={form.guidelines}
                  onChange={handleChange}
                  className="textarea rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full h-24 resize-none"
                  placeholder="Any specific guidelines or standards to follow?"
                />
              </fieldset>
            </div>

            <Title title="✅ Agreements" />
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={form.termsAccepted}
                  onChange={handleChange}
                  className="checkbox checkbox-primary"
                  required
                />
                <span>📜 I agree to the terms and conditions</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="portfolioAuthorization"
                  checked={form.portfolioAuthorization}
                  onChange={handleChange}
                  className="checkbox checkbox-secondary"
                />
                <span>📁 Allow project showcase in portfolio</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="activelyInvolved"
                  checked={form.activelyInvolved}
                  onChange={handleChange}
                  className="checkbox checkbox-accent"
                />
                <span>
                  🤝 I want to be actively involved in the development
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="regularUpdates"
                  checked={form.regularUpdates}
                  onChange={handleChange}
                  className="checkbox checkbox-success"
                />
                <span>
                  🔄 I would like regular updates on the project status
                </span>
              </label>
            </div>

            <div className="text-center pt-6">
              <button
                onClick={handleSubmit}
                className="btn btn-primary btn-lg rounded-full px-10"
                disabled={
                  !form.termsAccepted ||
                  !form.fullName ||
                  !form.email ||
                  !form.projectTitle ||
                  !form.projectDescription
                }
              >
                🚀 Submit Your Vision
              </button>
            </div>
          </div>
        </div>

        {/* ---------- Footer Caption ---------- */}
        <div className="text-center mt-16 text-base-content/60 font-medium">
          ✨ Turning your concepts into creative code & immersive experiences.
        </div>
      </div>
    </>
  );
}
