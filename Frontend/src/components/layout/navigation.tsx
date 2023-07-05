import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

import BurgerMenu from "./burger-menu";

import ROUTES from "../../constants/routes";

import "./navigation.scss";

const Navigation = () => {
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
            <NavLink
              className="navigation__link"
              to={ROUTES.HOME_PAGE.PATH}
            >
              About.me
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              className="navigation__link"
              to={ROUTES.PROJECT_PAGE.PATH}
            >
              Project.file
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              className="navigation__link"
              to={ROUTES.JOURNAL_PAGE.PATH}
            >
              Journal.dev
            </NavLink>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navigation;
