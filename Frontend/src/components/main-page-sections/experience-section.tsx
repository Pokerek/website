import Button from "../custom/button";
import ScrollSection from "../layout/scroll-section";
import "./experience-section.scss";

const ExperienceSection = () => {
  return (
    <ScrollSection id="experience">
      <h2 className="title">Battle-tested Experience</h2>
      <div className="experience">
        <div className="experience__container">
          <div className="experience__item">
            <h3 className="experience__title">Junior Frontend Developer</h3>
            <p className="experience__subtitle">
              Meetmedia Sp. z o.o. (XII 2019 - VIII 2020)
            </p>
            <div className="experience__stack">
              <p className="experience__text">Tech stack:</p>
              <p className="experience__text">
                JavaScript, JQuery, CSS, Sass, HTML, PHP
              </p>
            </div>
            <p className="experience__text">Responsibilities:</p>
            <ul className="experience__list">
              <li className="experience__list-item">
                Collaborating with clients and translating their design concepts
                into responsive websites.
              </li>
              <li className="experience__list-item">
                Taking an active role in client communication and effectively
                managing a team of developers.
              </li>
              <li className="experience__list-item">
                Identifying and resolving bugs based on client feedback,
                ensuring a seamless user experience.
              </li>
              <li className="experience__list-item">
                Successfully deploying projects into production environments.
              </li>
              <li className="experience__list-item">
                I had the opportunity to code a new layout for bezuzyteczna.pl
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Button>Go to projects</Button>
    </ScrollSection>
  );
};

export default ExperienceSection;
