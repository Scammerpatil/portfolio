import { Testimonial } from "@/types/testimonial";
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
  const emoticons = [
    { name: "friend", emotion: "🧑‍🤝‍🧑" },
    { name: "colleague", emoticon: "🤝" },
    { name: "client", emoticon: "💼" },
  ];
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay && !isPaused) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, isPaused, handleNext]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div
      className="rounded-2xl text-base-content mx-auto antialiased font-sans md:px-8 lg:mx-36 py-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 mx-10">
        {/* Image Section */}
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial._id}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -1,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -1,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 2 : 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 1,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Link
                    href={`https://github.com/${testimonial.github}`}
                    target="_blank"
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      objectFit="cover"
                      width={400}
                      height={400}
                      className="rounded-3xl"
                    />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-between py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold">
              {testimonials[active].name}
              {
                emoticons.find(
                  (e) => e.name === testimonials[active].designation
                )?.emotion
              }
            </h3>
            <div className="my-2 flex items-center space-x-1">
              {Array.from({ length: testimonials[active].star }).map(
                (_, index) => (
                  <IconStarFilled key={index} size={24} />
                )
              )}
            </div>
            <p className="text-base text-base-content/80 capitalize">
              {testimonials[active].designation} |{" "}
              <Link
                className="lowercase"
                href={`mailto:${testimonials[active].email}`}
              >
                {testimonials[active].email}
              </Link>
            </p>
            <motion.p className="text-base text-base-content mt-4 mb-4">
              {testimonials[active].content.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-16 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-base-100 text-base-content flex items-center justify-center group"
            >
              <IconArrowLeft className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-base-100 text-base-content flex items-center justify-center group"
            >
              <IconArrowRight className="h-5 w-5 group-hover:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialMapping;
