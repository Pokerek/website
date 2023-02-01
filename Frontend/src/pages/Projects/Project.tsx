import { FC } from "react";
import { TProject } from "../../types/Project";
import { Button } from "../../components/custom/Button/Button";

import "./Project.scss";

type props = {
  project: TProject;
};

export const Project: FC<props> = (props) => {
  const project = props.project;

  return (
    <article className="project">
      <img src={project.imageUrl} alt={project.name} className="project__img" />
      <div className="project__inner">
        <div className="project__description">
          <h3 className="project__name">{project.name}</h3>
          <p className="project__text">{project.description}</p>
          <div className="project__actions">
            {project.links.online && (
              <Button
                href={project.links.online}
                className="project__link btn--green"
                text="Online"
              />
            )}
            {project.links.github && (
              <Button
                href={project.links.github}
                className="project__link btn--green"
                text="Github"
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
