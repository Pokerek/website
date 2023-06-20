import { useState } from "react";

import "./burger-menu.scss";

type props = {
  onClick: () => void;
};

const BurgerMenu = ({ onClick }: props) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggleBurgerMenu = () => {
    onClick();
    setIsActive((prevStatus) => !prevStatus);
  };

  return (
    <button
      className={`hamburger ${isActive ? "hamburger--active" : ""}`}
      onClick={handleToggleBurgerMenu}
    >
      <span className="hamburger__box">
        <span className="hamburger__inner"></span>
      </span>
    </button>
  );
};

export default BurgerMenu;
