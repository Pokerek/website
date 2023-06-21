import { useState, useEffect } from "react";

import SkillSection from "../components/main-page-sections/skill-section";
import ExperienceSection from "../components/main-page-sections/experience-section";
import OtherActivitiesSection from "../components/main-page-sections/other-activities-section";

import Terminal from "../components/terminal/terminal";
import CenterBox from "../components/center-box/center-box";
import AuthorImage from "../components/author-image/author-image";
import ScrollSection from "../components/scroll-section/scroll-section";
import ContactForm from "../components/contact-form/contact-form";
import Button from "../components/button/button";

import "./main-page.scss";

const MainPage = () => {
  //TODO add to context
  const [firstTime, setFirstTime] = useState(true);

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
    <div className="main">
      {firstTime ? (
        <CenterBox>
          <Terminal />
        </CenterBox>
      ) : (
        <>
          <ScrollSection id="about">
            <h2>Who am I?</h2>
            <p>
              Junior with ambitions to become a Senior. He has worked in various
              places, but has always been drawn to programming. Perfectionist
              90% of the time. Loves to share his knowledge.
            </p>
            <AuthorImage />
          </ScrollSection>
          <SkillSection />
          <ExperienceSection />
          <OtherActivitiesSection />
          <ScrollSection id="contact">
            <h2>Send a Transmission</h2>
            <ContactForm />
            <p>or use external connection</p>
            <Button>Email: karolchrobok@gmail.com</Button>
            <Button>Linkedin: karol-chrobok</Button>
            <p>May the Force be with You!</p>
          </ScrollSection>
        </>
      )}
    </div>
  );
};

export default MainPage;
