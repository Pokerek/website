import { Fragment } from "react";
import { Link } from "react-router-dom";
import { BurgerMenu } from "./BurgerMenu";
import "./Navigation.scss";

export const Navigation = () => {
  return (
    <Fragment>
      <BurgerMenu />
      <nav className="navigation">
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
