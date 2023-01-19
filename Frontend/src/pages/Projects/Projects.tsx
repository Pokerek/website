import { useFetch } from "usehooks-ts";
import { useEffect, useState } from "react";

import { SuperBox } from "../../components/custom/SuperBox/SuperBox";
import { SingleProject } from "./SingleProject";
import { Loading } from "../../components/custom/Loading/Loading";
import { TProject } from "../../types/Project";

import "./Projects.scss";

export default function Projects() {
  const { data } = useFetch<TProject[]>(
    `${process.env.REACT_APP_BACKEND_URL}/projects`,
  );
  const [projects, setProjects] = useState(data);

  useEffect(() => {
    setProjects(data);
  }, [data]);

  const projectsList = projects?.map((project) => (
    <SingleProject key={project.name} project={project} />
  ));

  return (
    <SuperBox className="project">
      <div className="superBox__left">
        <h2 className="project__title">Projects</h2>
      </div>

      <div className="project__inner superBox__right">
        {projectsList || <Loading />}
      </div>
    </SuperBox>
  );
}
