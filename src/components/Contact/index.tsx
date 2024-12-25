"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import axios from "axios";
import toast from "react-hot-toast";

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
    const res = axios.post("/api/addTicket", formData);
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
    <section
      id="contact"
      className="overflow-hidden md:px-16 py-16 md:py-20 lg:py-28 bg-base-200"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <SectionTitle
        title="Let's Have a Chat (or Fix Your Problem 🙃)"
        paragraph="I'm always open to new opportunities and conversations. Feel free to reach out to me for any inquiries, help, or just to connect!"
      />

      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4 lg:mx-16">
          <div
            className="mb-12 bg-base-100 rounded-sm px-8 py-11 shadow-three sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
            data-wow-delay=".15s"
          >
            <h2 className="mb-3 text-2xl font-bold text-base-content sm:text-3xl lg:text-2xl xl:text-3xl">
              Stuck Somewhere? Open a Ticket! 🚀
            </h2>
            <p className="mb-12 text-base font-medium text-base-content">
              My elite support team (a.k.a. me 😅) will get back to you ASAP via
              email.
            </p>
            <form>
              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="mb-3 block text-base font-medium text-base-content"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                      }}
                      className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-base-content outline-none focus:border-primary bg-base-200"
                    />
                  </div>
                </div>
                <div className="w-full px-4 md:w-1/2">
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-base-content"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                      }}
                      className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-base-content outline-none focus:border-primary bg-base-200"
                    />
                  </div>
                </div>
                <div className="w-full px-4">
                  <div className="mb-8">
                    <label
                      htmlFor="message"
                      className="mb-3 block text-sm font-medium text-base-content"
                    >
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                      }}
                      className="border-stroke w-full rounded-sm border px-6 py-3 text-base text-base-content outline-none focus:border-primary bg-base-200"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full mx-auto px-4">
                  <button
                    className="rounded-sm bg-accent px-9 py-4 text-accent-content font-medium shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark"
                    onClick={handleSubmit}
                  >
                    Submit Ticket
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
