import { Language } from "@/types/Language";
import SkillCard from "./SkillCard";
import SectionTitle from "../Common/SectionTitle";

const Skills = ({ language }: { language: Language[] }) => {
  return (
    <div
      className="px-16 md-mx:px-6 my-10 font-mono bg-base-300 py-10"
      id="Skills"
    >
      <SectionTitle
        title="Skill Arsenal 🛠️"
        paragraph="A showcase of the tools, tricks, and talents that fuel my creations."
      />

      <div className="flex flex-wrap justify-around md-mx:justify-between sm-mx:justify-center gap-4 md-mx:gap-2">
        {language.map((skill: any, index: number) => (
          <SkillCard key={index} title={skill.title} skills={skill.skills} />
        ))}
      </div>
    </div>
  );
};
export default Skills;
