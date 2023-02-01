import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";

import { SuperBox } from "../../components/custom/SuperBox/SuperBox";
import { Project } from "./Project";
import { Loading } from "../../components/custom/Loading/Loading";
import { TProject } from "../../types/Project";

import "./ProjectsList.scss";

export default function Projects() {
  const [data, isLoading] = useFetch<TProject[]>(
    `${process.env.REACT_APP_BACKEND_URL}/projects`,
  );
  const [projects, setProjects] = useState(data);

  useEffect(() => {
    setProjects(data);
  }, [data]);

  const projectsList = projects?.map((project) => (
    <Project key={project.name} project={project} />
  ));

  return (
    <SuperBox>
      <div className="superBox__left">
        <h2 className="superBox__title">Projects</h2>
      </div>

      <div className="superBox__right projectsList">
        {isLoading && <Loading />}
        {data && projectsList}
      </div>
    </SuperBox>
  );
}
