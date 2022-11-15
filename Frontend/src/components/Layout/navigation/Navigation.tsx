import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { BurgerMenu } from "./BurgerMenu";
import "./Navigation.scss";

export const Navigation = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggleNavigation = () => {
    setIsActive((prevStatus) => !prevStatus);
  };

  return (
    <Fragment>
      <BurgerMenu onClick={handleToggleNavigation} />
      <nav
        onClick={handleToggleNavigation}
        className={`navigation ${isActive ? "navigation--active" : ""}`}
      >
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link to="/about.me">About.me</Link>
          </li>
          <li className="navigation__item">
            <Link to="/journal.dev">Journal.dev</Link>
          </li>
          <li className="navigation__item">
            <Link to="/project.file">Project.file</Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};
