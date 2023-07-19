import { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";

import BurgerMenu from "./burger-menu";

import { routesPaths } from "../../routes";

import "./navigation.scss";
import useAuth from "../../hooks/useAuth";

const Navigation = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggleNavigation = () => {
    setIsActive((prevStatus) => !prevStatus);
  };

  const { authenticated } = useAuth();

  return (
    <Fragment>
      <BurgerMenu onClick={handleToggleNavigation} isActive={isActive} />
      <nav
        onClick={handleToggleNavigation}
        className={`navigation ${isActive ? "navigation--active" : ""}`}
      >
        <ul className="navigation__list">
          <li className="navigation__item">
            <NavLink
              className="navigation__link"
              to={routesPaths.HOME_PAGE}
            >
              About.me
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              className="navigation__link"
              to={routesPaths.PROJECT_PAGE}
            >
              Project.file
            </NavLink>
          </li>
          <li className="navigation__item">
            <NavLink
              className="navigation__link"
              to={routesPaths.JOURNAL_PAGE}
            >
              Journal.dev
            </NavLink>
          </li>
          {authenticated && (
            <li className="navigation__item">
              <NavLink
                className="navigation__link"
                to={routesPaths.ADMIN_PAGE}
              >
                Admin Panel
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Navigation;
