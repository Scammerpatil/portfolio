import { Language } from "@/types/Language";
import SkillCard from "./SkillCard";

const Skills = ({ language }: { language: Language[] }) => {
  return (
    <div
      className="px-16 md-mx:px-6 my-10 font-mono bg-base-300 py-10"
      id="Skills"
    >
      <h1 className="text-4xl sm-mx:text-3xl xs-mx:text-2xl mb-10 font-bold text-center text-base-content">
        <span className="text-primary">&nbsp;</span>Skills
      </h1>
      <div className="flex flex-wrap justify-around md-mx:justify-between sm-mx:justify-center gap-4 md-mx:gap-2">
        {language.map((skill: any, index: number) => (
          <SkillCard key={index} title={skill.title} skills={skill.skills} />
        ))}
      </div>
    </div>
  );
};
export default Skills;
