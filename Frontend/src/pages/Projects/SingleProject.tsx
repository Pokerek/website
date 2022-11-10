import { FC } from "react";
import { TProject } from "../../types/Project";

type props = {
  project: TProject;
};

export const SingleProject: FC<props> = (props) => {
  const project = props.project;

  return (
    <a href={project.links.online} className="project__link">
      <article className="project__box">
        <h3 className="project__name">{project.name}</h3>
        <img
          src={project.imageUrl}
          alt={project.name}
          className="project__img"
        />
      </article>
    </a>
  );
};
