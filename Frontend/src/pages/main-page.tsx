import { useState, useEffect } from "react";

import SkillSection from "../components/main-page-sections/skill-section";
import ExperienceSection from "../components/main-page-sections/experience-section";
import OtherActivitiesSection from "../components/main-page-sections/other-activities-section";

import Terminal from "../components/terminal/terminal";
import CenterBox from "../components/center-box/center-box";
import AuthorImage from "../components/author-image/author-image";
import ScrollSection from "../components/scroll-section/scroll-section";

import Container from "../components/layout/container";

import "./main-page.scss";
import ContactSection from "../components/main-page-sections/contact-section";

const MainPage = () => {
  //TODO add to context
  const [firstTime, setFirstTime] = useState(false);

  //TODO create hook
  const handleKeyPress = () => {
    setFirstTime(false);
    window.removeEventListener("keypress", handleKeyPress);
    window.removeEventListener("touchstart", handleKeyPress);
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("touchstart", handleKeyPress);
    window.scrollTo(0, 0);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("touchstart", handleKeyPress);
    };
  }, []);

  return (
    <Container>
      <div className="main">
        {firstTime ? (
          <CenterBox>
            <Terminal />
          </CenterBox>
        ) : (
          <>
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
          </>
        )}
      </div>
    </Container>
  );
};

export default MainPage;
