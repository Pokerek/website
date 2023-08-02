import { useLoaderData } from "react-router-dom";

import ProjectItem from "./project-item";

import "./projects-page.scss";

const ProjectsPage = () => {
  const projects = useLoaderData() as Project[];
  return (
    <div className="projects-page">
      <h1>Projects</h1>
      {
        projects.length ?
          <div className="projects-page__projects">
            {projects.map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
              />
            ))}
          </div>
          :
          <div className="projects-page__no-projects">No projects.</div>
      }
    </div>
  );
};

export default ProjectsPage;
