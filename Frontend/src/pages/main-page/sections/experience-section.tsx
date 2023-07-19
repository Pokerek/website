import { useLoaderData } from 'react-router-dom';

import { routesPaths } from "../../../routes";
import Button from "../../../components/custom/button";
import Carousel from "../../../components/carousel/carousel";


import ScrollSection from "../components/scroll-section";
import ExperienceItem from "../components/experience-item";

import "./experience-section.scss";

const ExperienceSection = () => {
  const { experiences } = useLoaderData() as MainPageLoaderResponse;
  if (experiences.length === 0) return null;

  const experienceItems = experiences.map((experience) => {
    return (
      <ExperienceItem
        key={experience.id}
        experience={experience}
      />
    );
  });

  return (
    <ScrollSection id="experience">
      <h2 className="title">Battle-tested Experience</h2>
      <Carousel elements={experienceItems} />
      <Button link={routesPaths.PROJECT_PAGE}>Go to projects</Button>
    </ScrollSection>
  );
};

export default ExperienceSection;
