import ScrollSection from "../scroll-section/scroll-section";
import "./other-activities-section.scss";

const OtherActivitiesSection = () => {
  return (
    <ScrollSection id="others">
      <h2 className="title">Beyond the Code</h2>
      <div className="other-activities">
        <div className="other-activities__item">
          <h3 className="other-activities__title">Developer's Journal</h3>
          <p className="other-activities__text">#fromzerotosenior</p>
          <p className="other-activities__text">Since I 2023</p>
        </div>
        <div className="other-activities__stroke"></div>
        <div className="other-activities__item">
          <h3 className="other-activities__title">Math tutor</h3>
          <p className="other-activities__text">Level: High School</p>
          <p className="other-activities__text">Since IX 2015</p>
        </div>
      </div>
    </ScrollSection>
  );
};

export default OtherActivitiesSection;
