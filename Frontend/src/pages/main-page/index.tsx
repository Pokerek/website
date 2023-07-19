import SkillSection from "./sections/skill-section";
import ExperienceSection from "./sections/experience-section";
import OtherActivitiesSection from "./sections/other-activities-section";
import ContactSection from "./sections/contact-section";

import LeftMenu from "./components/left-menu";
import AuthorImage from "./components/author-image";
import ScrollSection from "./components/scroll-section";

import "./index.scss";

const MainPage = () => {

  return (
    <div className="main">
      <ScrollSection id="about">
        <div className="main__box">
          <div className="main__box-description">
            <h2 className="title">Who am I?</h2>
            <p className="description">
              Junior with ambitions to become a Senior. He has worked in
              various places, but has always been drawn to programming.
              Perfectionist 90% of the time. Loves to share his knowledge.
            </p>
          </div>
          <div className="main__box-image">
            <AuthorImage />
          </div>
        </div>
      </ScrollSection>

      <SkillSection />
      <ExperienceSection />
      <OtherActivitiesSection />
      <ContactSection />
      <LeftMenu />
    </div>
  );
};

export default MainPage;
