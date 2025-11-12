import { Language } from "@/types/Language";
import SkillCard from "./SkillCard";
import SectionTitle from "../Common/SectionTitle";

const Skills = ({ language }: { language: Language[] }) => {
  return (
    <div className="px-6 md:px-24 my-10 bg-base-100 py-10" id="skills">
      <SectionTitle
        title="Skill Arsenal 🛠️"
        paragraph="A showcase of the tools, tricks, and talents that fuel my creations."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mx-auto">
        {language.map((skill: Language, index: number) => (
          <SkillCard
            key={index}
            title={skill.title}
            skills={skill.skills}
            description={skill.description}
          />
        ))}
      </div>
    </div>
  );
};
export default Skills;
