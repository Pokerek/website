import { Fragment, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { BurgerMenu } from "./BurgerMenu";
import Socials from "./Socials/Socials";
import { AuthContext } from "../../../context/AuthContext";
import "./Navigation.scss";
import { useCookies } from "react-cookie";

export const Navigation = () => {
  const [isActive, setIsActive] = useState(false);
  const Authentication = useContext(AuthContext);
  const [, , removeCookie] = useCookies();

  const handleToggleNavigation = () => {
    setIsActive((prevStatus) => !prevStatus);
  };

  const handleLogout = () => {
    Authentication?.changeIsLogin();
    removeCookie("Authorization");
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
          {Authentication?.isAdmin && !Authentication.isLogin && (
            <li className="navigation__item">
              <Link to="/auth">Admin</Link>
            </li>
          )}
          {Authentication?.isLogin && (
            <li className="navigation__item">
              <Link onClick={() => handleLogout()} to="/">
                Logout
              </Link>
            </li>
          )}
        </ul>
        <Socials />
      </nav>
    </Fragment>
  );
};
