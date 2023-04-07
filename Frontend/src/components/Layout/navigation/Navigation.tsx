import { Fragment, useState, useContext } from "react";
import { NavLink } from "react-router-dom";

import { BurgerMenu } from "./BurgerMenu";
import Socials from "./Socials/Socials";
import { AuthContext } from "../../../context/AuthContext";
import "./Navigation.scss";
// import { useCookies } from "react-cookie";

export const Navigation = () => {
  const [isActive, setIsActive] = useState(false);
  const Authentication = useContext(AuthContext);
  // const [, , removeCookie] = useCookies();

  const handleToggleNavigation = () => {
    setIsActive((prevStatus) => !prevStatus);
  };

  // const handleLogout = () => {
  //   Authentication?.changeIsLogin();
  //   removeCookie("Authorization");
  // };

  return (
    <Fragment>
      <BurgerMenu onClick={handleToggleNavigation} />
      <nav
        onClick={handleToggleNavigation}
        className={`navigation ${isActive ? "navigation--active" : ""}`}
      >
        <ul className="navigation__list">
          <li className="navigation__item">
            <NavLink to="/about.me">About.me</NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to="/journal.dev">Journal.dev</NavLink>
          </li>
          <li className="navigation__item">
            <NavLink to="/project.file">Project.file</NavLink>
          </li>
          {Authentication?.isAdmin && !Authentication.isLogin && (
            <li className="navigation__item">
              <NavLink to="/auth">Admin</NavLink>
            </li>
          )}
          {Authentication?.isLogin && (
            <li className="navigation__item">
              <NavLink onClick={() => handleLogout()} to="/">
                Logout
              </NavLink>
            </li>
          )}
        </ul>
        <Socials />
      </nav>
    </Fragment>
  );
};
