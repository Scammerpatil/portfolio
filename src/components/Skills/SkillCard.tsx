"use client";

import { motion } from "framer-motion";
import { Language } from "@/types/Language";
import Image from "next/image";
import { useState } from "react";

interface Skill {
  name: string;
  iconUrl: string;
}

const SkillBadge = ({ skills }: { skills: Skill[] }) => {
  return skills.map((skill: Skill, index: number) => (
    <SkillBadgeItem key={index} skill={skill} />
  ));
};

const SkillBadgeItem = ({ skill }: { skill: Skill }) => {
  const [src, setSrc] = useState(
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.iconUrl}`
  );

  const handleImageError = () => {
    setSrc(
      `https://cdn.simpleicons.org/${skill.name
        .replace(/(\s\d+(\.\d+)*)|(\sES6\+)/gi, "")
        .toLowerCase()
        .replace(/\s+/g, "")}`
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      className="bg-base-content/70 flex gap-2 border border-base-100 shadow-md shadow-primary rounded-2xl items-center py-2 px-3 mb-2 hover:scale-105 transition-transform duration-200"
    >
      <Image
        className="w-7 sm:w-8 md:w-9 lg:w-10 object-contain"
        src={src}
        width={48}
        height={48}
        alt={`${skill.name} icon`}
        onError={handleImageError}
      />
      <span className="text-base-100 font-medium text-sm sm:text-base md:text-lg">
        {skill.name}
      </span>
    </motion.div>
  );
};

const SkillCard = (props: Language) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="shadow-md shadow-primary rounded-3xl bg-base-content/80 mb-3 border border-primary py-6 px-4 sm:px-6"
    >
      <h3 className="text-center text-base-300 text-2xl sm:text-3xl font-bold mb-4">
        {props.title}
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-2">
        <SkillBadge skills={props.skills} />
      </div>
    </motion.div>
  );
};

export default SkillCard;
