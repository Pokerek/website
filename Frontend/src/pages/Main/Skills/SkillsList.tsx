import Skill from "../../../types/skill";
import "./SkillsList.scss";

type Props = {
  elements: Skill[];
  title: string;
};

const SkillsList = ({ elements, title }: Props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="skillsList">
      <h3 className="skillsList__title">{title}</h3>
      <div className="skillsList__inner">
        {elements.map((skill) => (
          <div key={skill.name} className="skillsList__item">
            <img src={BACKEND_URL + skill.url} alt={skill.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsList;
