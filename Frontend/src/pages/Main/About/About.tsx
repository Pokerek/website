import "./About.scss";

const About = () => {
  return (
    <section id="about" className="about">
      <h2>Who am I?</h2>
      <p className="about__text">
        Junior with ambitions to become a Senior. He has worked in various
        places, but has always been drawn to programming. Perfectionist 90% of
        the time. Loves to share his knowledge.
      </p>
      <img className="about__image" src="/public/images/logo.png" alt="Logo" />
    </section>
  );
};

export default About;
