import { Link } from "react-router-dom";

import "./Header.scss";
import { Navigation } from "../navigation/Navigation";

import { Button } from "../../custom/Button/Button";

export const Header = () => {
  const cvUrl = `${process.env.REACT_APP_BACKEND_URL}/cv/get`;
  return (
    <header className="header">
      <div className="header__inner">
        <Navigation />
        <Link to="/" className="header__title header__left title">
          Chrobok
        </Link>
        <div className="header__right">
          <Button text="CV" className="btn--green" href={cvUrl} />
        </div>
      </div>
    </header>
  );
};
