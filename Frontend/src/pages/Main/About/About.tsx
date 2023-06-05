import AuthorImage from "./AuthorImage";
import ScrollSection from "../ScrollSection/ScrollSection";
import "./About.scss";

const About = () => {
  return (
    <ScrollSection id="about">
      <h2>Who am I?</h2>
      <p>
        Junior with ambitions to become a Senior. He has worked in various
        places, but has always been drawn to programming. Perfectionist 90% of
        the time. Loves to share his knowledge.
      </p>
      <AuthorImage />
    </ScrollSection>
  );
};

export default About;
