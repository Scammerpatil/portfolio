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
    <div className="bg-base-content/70 flex gap-2 border border-base-100 shadow-md shadow-primary rounded-2xl items-center py-2 px-3 bs-mx:py-0 bs-mx:px-1.5 bs-mx:gap-1 mb-1">
      <Image
        className="w-[48px] bs-mx:w-[36px] xsm-mx:w-[28px] !p-1"
        src={src}
        width={48}
        height={48}
        alt={`${skill.name} icon`}
        onError={handleImageError}
      />
      <div className="text-base-100 text-lg font-medium sm-mx:text-lg xs-mx:text-sm">
        {skill.name}
      </div>
    </div>
  );
};

const SkillCard = (props: Language) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="800"
      data-aos-easing="ease-in-sine"
      className="w-[47%] shadow-md shadow-primary rounded-3xl bg-base-content/80 mb-3 border border-primary p-5 bs-mx:p-3 sm-mx:w-full"
    >
      <div className="text-xl md:text-2xl lg:text-3xl text-base-300 mb-4 text-center font-bold">
        {props.title}
      </div>
      <div className="flex gap-3 bs-mx:gap-2 h-[calc(100%-40%)] justify-center items-center flex-wrap">
        <SkillBadge skills={props.skills} />
      </div>
    </div>
  );
};

export default SkillCard;
