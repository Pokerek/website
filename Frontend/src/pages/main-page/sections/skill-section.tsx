import { useLoaderData } from "react-router-dom";

import ScrollSection from "../components/scroll-section";
import { BACKEND_URL } from "../../../constants";

import "./skill-section.scss";

const SkillSection = () => {
  const { skills } = useLoaderData() as MainPageLoaderResponse;
  console.log(skills);
  if (skills.length === 0) return null;

  return (
    <ScrollSection id="skills">
      <h2 className="title">Forceful Skills</h2>
      <div className="skills-list">
        {skills.map((skill) => (
          <div key={skill.name} className="skills-list__item">
            <img src={BACKEND_URL + skill.imageUrl} alt={skill.name} />
          </div>
        ))}
      </div>
    </ScrollSection>
  );
};

export default SkillSection;
