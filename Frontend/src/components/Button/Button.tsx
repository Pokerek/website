import { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

type props = {
  href?: string;
  text: string;
  className: string;
  onClick?: MouseEventHandler;
};

export const Button: FC<props> = (props) => {
  let button = (
    <button className={`btn ${props.className}`} onClick={props.onClick}>
      {props.text}
    </button>
  );

  if (props.href) button = <Link to={props.href}>{button}</Link>;

  return button;
};
