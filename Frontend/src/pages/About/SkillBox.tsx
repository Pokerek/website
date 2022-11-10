import { FC } from "react";
import { TSkill } from "../../types/cv/skill";

import "./SkillBox.scss";

type props = {
  name: string;
  skills: TSkill[];
};

export const SkillBox: FC<props> = (props) => {
  const skills = props.skills.map((skill) => {
    let skillComponent = (
      <img src={skill.url} alt={skill.name} className="skillBox__img" />
    );

    if (skill.link) {
      skillComponent = <a href={skill.link}>{skillComponent}</a>;
    }

    return skillComponent;
  });

  return props.skills.length ? (
    <div className="skillBox">
      <h4 className="skillBox__title">{props.name}:</h4>
      {skills}
    </div>
  ) : (
    <div className="skillBox"></div>
  );
};
