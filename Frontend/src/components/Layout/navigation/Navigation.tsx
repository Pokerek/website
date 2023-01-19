import { Fragment, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { BurgerMenu } from "./BurgerMenu";
import { IconBox } from "../../custom/IconBox/IconBox";
import { SecretContext } from "../../../context/SecretContext";
import "./Navigation.scss";

export const Navigation = () => {
  const [isActive, setIsActive] = useState(false);
  const secret = useContext(SecretContext);

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
          {secret.isAdmin && (
            <li className="navigation__item">
              <Link to="/admin">Admin</Link>
            </li>
          )}
        </ul>
        <IconBox />
      </nav>
    </Fragment>
  );
};
