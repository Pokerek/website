import "./Header.scss";
import { Navigation } from "../navigation/Navigation";

import { Button } from "../../custom/Button/Button";

export const Header = () => {
  return (
    <header className="header">
      <a className="header__logo">Chrobok</a>
      <Button href="#contact" className="header__button">
        Get in touch
      </Button>
      <Navigation />
    </header>
  );
};
