import { useLoaderData } from "react-router-dom";

import ScrollSection from "../components/scroll-section";
import SkillsList from "../components/skills-list";

const SkillSection = () => {
  const { skills } = useLoaderData() as MainPageLoaderResponse;
  if (skills.length === 0) return null;

  const frontendSkills = skills.filter((skill) => skill.category === "frontend");
  const backendSkills = skills.filter((skill) => skill.category === "backend");
  const toolSkills = skills.filter((skill) => skill.category === "tool");

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
