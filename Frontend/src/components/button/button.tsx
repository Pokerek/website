import React from "react";
import { Link } from "react-router-dom";
import "./button.scss";

type props = React.HTMLAttributes<HTMLButtonElement> & {
  link?: string;
  href?: string;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button = (props: props) => {
  const { className, onClick, children, link, href, type } = props;

  const classes = "btn";
  if (className) classes.concat(" ", className);

  let button = (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );

  if (link) button = <Link to={link}>{button}</Link>;
  if (href) button = <a href={href}>{button}</a>;
  return button;
};

export default Button;
