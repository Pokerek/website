import { Link } from "react-router-dom";

import "./Header.scss";
import { Navigation } from "../navigation/Navigation";

import { Button } from "../../custom/Button/Button";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        Chrobok
      </Link>
      <Button className="header__button">Get in touch</Button>
      <Navigation />
    </header>
  );
};
