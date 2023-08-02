import { BACKEND_URL } from "../../constants";
import Button from "../../components/custom/button";

import "./project-item.scss";

interface ProjectItemProps {
  project: Project;
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  const { name, stack, description, links } = project;

  return (
    <div className="project-item">
      <img
        className="project-item__image"
        src={`${BACKEND_URL}${project.imageUrl}`}
        alt={name}
      />
      <h3 className="project-item__title">{name}</h3>
      <div className="project-item__content">
        <h4 className="project-item__subtitle">Tech stack</h4>
        <ul className="project-item__list">
          {stack.map((item) => (
            <li
              key={item}
              className="project-item__list-item"
            >
              {item}
            </li>
          ))}
        </ul>
        <h4 className="project-item__subtitle">Description</h4>
        <p className="project-item__text">{description}</p>
        {links && (
          <div className="project-item__links">
            {links.github && <Button href={links.github}>Github</Button>}
            {links.online && <Button href={links.online}>Online</Button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectItem;
