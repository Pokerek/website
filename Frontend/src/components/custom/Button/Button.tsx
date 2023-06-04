import React from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

type props = React.HTMLAttributes<HTMLButtonElement> & {
  link?: string;
  href?: string;
};

export const Button = (props: props) => {
  const { className, onClick, children, link, href } = props;
  let button = (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );

  if (link) button = <Link to={link}>{button}</Link>;
  if (href) button = <a href={href}>{button}</a>;
  return button;
};
