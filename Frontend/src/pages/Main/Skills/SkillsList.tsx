import "./SkillsList.scss";

type Props = {
  elements: {
    src: string;
    alt: string;
  }[];
};

const SkillsList = ({ elements }: Props) => {
  return (
    <div className="skillsList">
      {elements.map((element) => (
        <div key={element.alt} className="skillsList__item">
          <img src={element.src} alt={element.alt} />
        </div>
      ))}
    </div>
  );
};

export default SkillsList;
