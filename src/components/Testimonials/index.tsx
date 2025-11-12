"use client";
import { Testimonial } from "@/types/Testimonial";
import React from "react";
import TestimonialMapping from "./TestimonialMapping";
import AddTestimonial from "./AddTestimonial";
import SectionTitle from "../Common/SectionTitle";

const Testimonials = ({ testimonial }: { testimonial: Testimonial[] }) => {
  const shuffleArray = (array: Testimonial[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <section
      className="relative bg-base-100 py-8 md:py-10 lg:py-14"
      id="testimonials"
    >
      <SectionTitle
        title="Raving Reviews & Wild Compliments 🚀"
        paragraph="Hear the buzz from my amazing clients and collaborators! Spoiler: They love working with me (and you will too)."
      />

      <div className="w-full mx-auto">
        <TestimonialMapping
          autoplay={true}
          testimonials={shuffleArray([...testimonial])}
        />
      </div>

      <div className="w-full flex justify-center items-center mt-4">
        <button
          className="btn btn-primary btn-outline lg:btn-lg mt-8"
          onClick={() =>
            (
              document.getElementById("newReview") as HTMLDialogElement
            )?.showModal()
          }
        >
          Add Your Review
        </button>
      </div>
      <AddTestimonial />
    </section>
  );
};

export default Testimonials;
