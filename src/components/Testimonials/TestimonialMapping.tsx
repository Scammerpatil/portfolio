"use client";
import { Testimonial } from "@/types/Testimonial";
import {
  IconArrowLeft,
  IconArrowRight,
  IconStarFilled,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const TestimonialMapping = ({
  autoplay = false,
  testimonials,
}: {
  autoplay?: boolean;
  testimonials: Testimonial[];
}) => {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay && !isPaused) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, isPaused, handleNext]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  const bufferToBase64 = (image: {
    data: Uint8Array | null;
    contentType: string;
  }) => {
    if (!image?.data) return "/images/dummy.jpg";
    const base64String = Buffer.from(image.data).toString("base64");
    return `data:${image.contentType};base64,${base64String}`;
  };

  const activeTestimonial = testimonials[active];

  return (
    <section
      id="testimonials"
      className="mx-auto rounded-2xl text-base-content px-4 sm:px-8 md:px-10 lg:px-24 py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image side */}
        <div className="relative h-72 sm:h-80 md:h-96 w-full">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, scale: 0.9, rotate: randomRotateY() }}
                animate={{
                  opacity: isActive(index) ? 1 : 0,
                  scale: isActive(index) ? 1 : 0.9,
                  rotate: isActive(index) ? 0 : randomRotateY(),
                  zIndex: isActive(index) ? 2 : 1,
                }}
                exit={{ opacity: 0, scale: 0.8, rotate: randomRotateY() }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 flex justify-center items-center"
              >
                <Link
                  href={testimonial.linkedIn || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full"
                >
                  <Image
                    src={bufferToBase64(testimonial.image)}
                    alt={testimonial.name}
                    width={300}
                    height={400}
                    className="rounded-3xl object-cover lg:object-contain w-full h-full shadow-lg shadow-primary/40 bg-base-300"
                  />
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Text side */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col justify-between h-full bg-base-200 p-6 rounded-2xl shadow-lg shadow-primary/30"
        >
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 capitalize">
              {activeTestimonial.name}
            </h3>

            <div className="flex items-center space-x-1 my-2">
              {Array.from({ length: activeTestimonial.star }).map(
                (_, index) => (
                  <IconStarFilled
                    key={index}
                    size={22}
                    className="text-warning"
                  />
                )
              )}
            </div>

            <p className="text-sm sm:text-base text-base-content/80 capitalize">
              {activeTestimonial.designation}
              {activeTestimonial.currentEmployer &&
                ` @ ${activeTestimonial.currentEmployer}`}{" "}
              |
              <Link
                className="lowercase hover:underline ml-1"
                href={`mailto:${activeTestimonial.email}`}
              >
                {activeTestimonial.email}
              </Link>
            </p>

            <motion.p className="text-base text-base-content mt-4 mb-4 leading-relaxed">
              {activeTestimonial.content.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeOut",
                    delay: 0.015 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </div>

          {/* Controls */}
          <div className="flex gap-4 mt-6 md:mt-0">
            <button
              onClick={handlePrev}
              className="h-8 w-8 rounded-full bg-base-100 shadow-md hover:shadow-lg text-base-content flex items-center justify-center group transition-all duration-300"
            >
              <IconArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-8 w-8 rounded-full bg-base-100 shadow-md hover:shadow-lg text-base-content flex items-center justify-center group transition-all duration-300"
            >
              <IconArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialMapping;
