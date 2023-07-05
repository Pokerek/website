import { Link } from "react-router-dom";

import Navigation from "./navigation";

import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to={"/"} className="header__logo">
          Chrobok
        </Link>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
