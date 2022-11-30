import { FC, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

type props = {
  link?: string;
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

  if (props.link) button = <Link to={props.link}>{button}</Link>;
  if (props.href) button = <a href={props.href}>{button}</a>;
  return button;
};
