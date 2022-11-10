import { Link } from "react-router-dom";

import "./Header.scss";
import { Navigation } from "../navigation/Navigation";
import { IconBox } from "./IconBox";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <Navigation />
        <Link to="/" className="header__title header__left title">
          Chrobok
        </Link>
        <IconBox />
      </div>
    </header>
  );
};
