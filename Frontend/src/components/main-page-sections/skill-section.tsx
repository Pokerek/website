import { useEffect, useState } from "react";

import ScrollSection from "../scroll-section/scroll-section";
import SkillsList from "../skills-list/skills-list";
import Skill from "../../types/skill";

const SkillSection = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  // TODO add load for this fetch
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/skills`);
      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error("Error occurred while fetching skills:", error);
    }
  };

  if (!skills.length) return <></>;

  const frontendSkills = skills.filter((skill) => skill.type === "frontend");
  const backendSkills = skills.filter((skill) => skill.type === "backend");
  const toolSkills = skills.filter((skill) => skill.type === "tool");

  return (
    <ScrollSection id="skills">
      <h2>Forceful Skills</h2>
      <SkillsList elements={backendSkills} title="Backend" />
      <SkillsList elements={frontendSkills} title="Frontend" />
      <SkillsList elements={toolSkills} title="Tools" />
    </ScrollSection>
  );
};

export default SkillSection;
