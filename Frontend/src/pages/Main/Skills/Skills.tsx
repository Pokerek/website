import ScrollSection from "../ScrollSection/ScrollSection";
import "./Skills.scss";

const Skills = () => {
  return (
    <ScrollSection id="skills">
      <h2>Forceful Skills</h2>
      <div className="skills__container">
        <div className="skills__item">
          <img src="/icons/tech/html.png" alt="html Icon" />
        </div>
        <div className="skills__item">
          <img src="/icons/tech/css.png" alt="Css Icon" />
        </div>
        <div className="skills__item">
          <img src="/icons/tech/js.png" alt="js Icon" />
        </div>
        <div className="skills__item">
          <img src="/icons/tech/sass.png" alt="sass Icon" />
        </div>
        <div className="skills__item">
          <img src="/icons/tech/sass.png" alt="sass Icon" />
        </div>
      </div>
    </ScrollSection>
  );
};

export default Skills;
