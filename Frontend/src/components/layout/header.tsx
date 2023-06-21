import Navigation from "./navigation";
import Button from "../button/button";

import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__logo">Chrobok</a>
        <Button href="#contact" className="header__button">
          Get in touch
        </Button>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
