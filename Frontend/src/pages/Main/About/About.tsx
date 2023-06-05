import ScrollSection from "../ScrollSection/ScrollSection";
import "./About.scss";

const About = () => {
  return (
    <ScrollSection id="about">
      <h2>Who am I?</h2>
      <p className="about__text">
        Junior with ambitions to become a Senior. He has worked in various
        places, but has always been drawn to programming. Perfectionist 90% of
        the time. Loves to share his knowledge.
      </p>
      <img className="about__image" src="/images/logo.png" alt="Logo" />
    </ScrollSection>
  );
};

export default About;
