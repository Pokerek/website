import ScrollSection from "../ScrollSection/ScrollSection";
import SkillsList from "./SkillsList";

const ExampleSkillsList = [
  {
    src: "/icons/tech/html.png",
    alt: "html Icon",
  },
  {
    src: "/icons/tech/css.png",
    alt: "Css Icon",
  },
  {
    src: "/icons/tech/js.png",
    alt: "js Icon",
  },
  {
    src: "/icons/tech/sass.png",
    alt: "sass Icon",
  },
  {
    src: "/icons/tech/typescript.png",
    alt: "typescript Icon",
  },
];

const Skills = () => {
  return (
    <ScrollSection id="skills">
      <h2>Forceful Skills</h2>
      <SkillsList elements={ExampleSkillsList} />
    </ScrollSection>
  );
};

export default Skills;
