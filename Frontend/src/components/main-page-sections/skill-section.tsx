import { useLoaderData } from "react-router-dom";

import ScrollSection from "../scroll-section/scroll-section";
import SkillsList from "../skills-list/skills-list";
import Skill from "../../types/skill";

const SkillSection = () => {
  const skills = useLoaderData() as Skill[];

  if (!skills.length) return <></>;

  const frontendSkills = skills.filter((skill) => skill.type === "frontend");
  const backendSkills = skills.filter((skill) => skill.type === "backend");
  const toolSkills = skills.filter((skill) => skill.type === "tool");

  return (
    <ScrollSection id="skills">
      <h2 className="title">Forceful Skills</h2>
      <SkillsList
        elements={backendSkills}
        title="Backend"
      />
      <SkillsList
        elements={frontendSkills}
        title="Frontend"
      />
      <SkillsList
        elements={toolSkills}
        title="Tools"
      />
    </ScrollSection>
  );
};

export default SkillSection;
