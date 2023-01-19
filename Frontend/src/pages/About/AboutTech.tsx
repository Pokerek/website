import { FC, Fragment } from "react";
import { Link } from "react-router-dom";

import { TextBox } from "../../components/custom/TextBox/TextBox";
import { TCV } from "../../types/cv/CV";
import { Experience } from "./Experience";
import { SkillBox } from "./SkillBox";
import { Button } from "../../components/custom/Button/Button";

type props = {
  data: TCV;
};

export const AboutTech: FC<props> = (props) => {
  const cvData = props.data;
  const frontendSkills = cvData.skills.filter((el) => el.area === "Frontend");
  const backendSkills = cvData.skills.filter((el) => el.area === "Backend");
  const toolSkills = cvData.skills.filter((el) => el.area === "Tool");

  return (
    <Fragment>
      <article className="about__box">
        <h3 className="about__subtitle">Tech data</h3>
        <p className="about__text">
          Profession:{" "}
          <span className="about__subtext">{cvData.profession}</span>
        </p>
        <p className="about__text">
          Level: <span className="about__subtext">{cvData.level}</span>
        </p>
        <p className="about__text">
          Main language:{" "}
          <span className="about__subtext">{cvData.devLanguage}</span>
        </p>
        <TextBox>
          Languages:{" "}
          {cvData.languages.map((el, index, arr) => (
            <span key={el} className="alter">
              {el + (index < arr.length - 1 ? " | " : "")}
            </span>
          ))}
        </TextBox>
        <p className="about__text">Motivation:</p>
        <TextBox innerHtml={cvData.motivation} />
      </article>
      <article className="about__box">
        <h3 className="about__subtitle">
          Experience &{" "}
          <Link to="/project.file" className="about__link">
            Projects
          </Link>
        </h3>
        {cvData.experience.map((experience, index) => (
          <Experience key={`Comp-${index}`} experience={experience} />
        ))}
      </article>
      <article className="about__box">
        <h3 className="about__subtitle">Tech stack:</h3>
        <SkillBox skills={frontendSkills} name="Frontend" />
        <SkillBox skills={backendSkills} name="Backend" />
        <SkillBox skills={toolSkills} name="Tools" />
      </article>
      <article className="about__box">
        <h3 className="about__subtitle">
          Follow my learn path on{" "}
          <Button
            href="https://www.instagram.com/chrobok.dev/"
            text="Instagram"
          />
        </h3>
      </article>
    </Fragment>
  );
};
