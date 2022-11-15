import { FC } from "react";
import "./BurgerMenu.scss";

type props = {
  onClick: () => void;
};

export const BurgerMenu: FC<props> = (props) => {
  return (
    <button className="hamburger" onClick={props.onClick}>
      <span className="hamburger__box">
        <span className="hamburger__inner"></span>
      </span>
    </button>
  );
};
