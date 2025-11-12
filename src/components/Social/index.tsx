"use client";
import { socialLinks } from "@/data";
import Image from "next/image";
import { motion } from "framer-motion";

const Social = () => {
  // Animation variant for each icon
  const iconVariant = {
    hidden: { opacity: 0, y: 20, rotate: -90 },
    visible: { opacity: 1, y: 0, rotate: -90 },
  };

  return (
    <div className="fixed bottom-32 -left-48 z-50 hidden rotate-90 items-center gap-8 text-base-content md:flex">
      {/* Freelancer Icon */}
      <motion.a
        href="https://www.freelancer.in/u/Scammerpatil?sb=t"
        target="_blank"
        rel="noopener noreferrer"
        variants={iconVariant}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        className="font-mono text-lg transition-transform duration-300 ease-in-out hover:-translate-x-1 hover:text-primary"
      >
        <Image
          src="/images/freelancer.svg"
          width={28}
          height={28}
          alt="Freelancer icon"
        />
      </motion.a>

      {socialLinks.map((socialLink, index) => {
        const Icon = socialLink.icon;
        return (
          <motion.a
            key={index}
            href={socialLink.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariant}
            initial="hidden"
            animate="visible"
            transition={{
              duration: 0.6,
              delay: 0.15 + index * 0.1,
              ease: "easeOut",
            }}
            className="font-mono text-lg transition-transform duration-300 ease-in-out hover:-translate-x-1 hover:text-primary"
          >
            <Icon stroke={1.5} size={25} />
          </motion.a>
        );
      })}

      <hr className="w-40 rounded-full border border-base-content bg-base-100" />
    </div>
  );
};

export default Social;
