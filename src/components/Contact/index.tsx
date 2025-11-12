"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import axios from "axios";
import toast from "react-hot-toast";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      toast.error("Please fill all the fields");
      return;
    }
    const res = axios.post("/api/tickets/add-ticket", formData);
    toast.promise(res, {
      loading: "Submitting...",
      success: () => {
        setFormData({ name: "", email: "", message: "" });
        return "Ticket submitted successfully. I'll get back to you soon!";
      },
      error: "Failed to submit ticket. Try again later.",
    });
  };

  return (
    <motion.section
      id="contact"
      className="overflow-hidden md:px-10 lg:px-24 py-16 md:py-20 lg:py-28 bg-base-200 roboto-condensed px-4 sm:px-8"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <SectionTitle
        title="Let's Have a Chat (or Fix Your Problem 🙃)"
        paragraph="I'm always open to new opportunities and conversations. Feel free to reach out to me for any inquiries, help, or just to connect!"
      />

      <div className="flex justify-center">
        <motion.div
          className="w-full bg-base-100 rounded-xl px-6 py-10 lg: shadow-md sm:p-10 md:p-12"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          <h2 className="mb-2 text-2xl font-bold text-base-content sm:text-3xl">
            Stuck Somewhere? Open a Ticket! 🚀
          </h2>
          <p className="mb-10 text-base text-base-content/80">
            My elite support team (a.k.a. me 😅) will get back to you ASAP via
            email.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Your Name <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">
                  Your Email <span className="text-error">*</span>{" "}
                </legend>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
                />
              </fieldset>
            </div>
            <fieldset className="fieldset mt-6">
              <legend className="fieldset-legend">
                Your Message <span className="text-error">*</span>{" "}
              </legend>
              <textarea
                rows={5}
                placeholder="Enter your message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="textarea rounded-md border border-base-300 bg-base-200 px-4 py-3 text-base text-base-content focus:border-primary focus:outline-none w-full"
              />
            </fieldset>
            <div className="flex justify-center mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-lg btn-primary font-semibold shadow-md transition-colors duration-300 btn-outline"
                type="submit"
              >
                Submit Ticket
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
