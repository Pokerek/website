import { FC } from "react";
import { TextBox } from "../../components/custom/TextBox/TextBox";

type props = {
  experience: {
    position: string;
    company: string;
    duration: string;
    location: string;
    responsibility: string;
    stack: [string];
    projects: [
      {
        name: string;
        url: string;
      },
    ];
  };
};

export const Experience: FC<props> = (props) => {
  const experience = props.experience;
  return (
    <div className="about__experience">
      <p className="about__text">{experience.position}</p>
      <p className="about__info">
        ( {experience.company} - {experience.duration}, {experience.location} )
      </p>
      <ul className="about__list">
        <li className="about__item">
          Tech stack:{" "}
          {experience.stack.map(
            (el, index, arr) => el + (index < arr.length - 1 ? " | " : ""),
          )}
        </li>
        <li className="about__item">
          Responsibility: <TextBox>{experience.responsibility}</TextBox>
        </li>
        <li className="about__item">
          Main projects:{" "}
          {experience.projects.map((el, index, arr) => (
            <a key={`Exp-${el.name}`} href={el.url} className="alter">
              {el.name + (index < arr.length - 1 ? " | " : "")}
            </a>
          ))}
        </li>
      </ul>
    </div>
  );
};
