import { Link } from "react-router-dom";

import "./Header.scss";
import { Navigation } from "../navigation/Navigation";

import { Button } from "../../custom/Button/Button";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export const Header = () => {
  const cvUrl = `${process.env.REACT_APP_BACKEND_URL}/cv/get`;
  const Authentication = useContext(AuthContext);

  const logo = Authentication?.isLogin ? "Admin mode" : "Chrobok";
  return (
    <header className="header">
      <div className="header__inner">
        <Navigation />
        <Link to="/" className="header__title header__left title">
          {logo}
        </Link>
        <div className="header__right">
          <Button text="CV" className="btn--green" href={cvUrl} />
        </div>
      </div>
    </header>
  );
};
