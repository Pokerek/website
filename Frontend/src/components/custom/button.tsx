import React from "react";
import { Link } from "react-router-dom";
import "./button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  link?: string;
  href?: string;
}

const Button = ({ link, href, className, children, ...props }: ButtonProps) => {
  const classes = "btn";
  if (className) classes.concat(" ", className);

  let button = (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );

  if (link) button = <Link to={link}>{button}</Link>;
  if (href) button = <a href={href}>{button}</a>;
  return button;
};

export default Button;
