import { useEffect, useState } from "react";

import ScrollSection from "../ScrollSection/ScrollSection";
import SkillsList from "./SkillsList";
import Skill from "../../../types/skill";

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchSkills();
  }, []);

  console.log(`${BACKEND_URL}/skills`);

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

  const strongSkills = skills.filter((skill) => skill.type === "strong");
  const weakSkills = skills.filter((skill) => skill.type === "weak");
  const neutralSkills = skills.filter((skill) => skill.type === "neutral");

  return (
    <ScrollSection id="skills">
      <h2>Forceful Skills</h2>
      <SkillsList elements={strongSkills} />
      <h2>Emerging Techniques</h2>
      <SkillsList elements={weakSkills} />
      <h2>Developer Toolset</h2>
      <SkillsList elements={neutralSkills} />
    </ScrollSection>
  );
};

export default Skills;
