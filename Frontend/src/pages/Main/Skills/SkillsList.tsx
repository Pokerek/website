import Skill from "../../../types/skill";
import "./SkillsList.scss";

type Props = {
  elements: Skill[];
};

const SkillsList = ({ elements }: Props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="skillsList">
      {elements.map((skill) => (
        <div key={skill.name} className="skillsList__item">
          <img src={BACKEND_URL + skill.url} alt={skill.alt} />
        </div>
      ))}
    </div>
  );
};

export default SkillsList;
