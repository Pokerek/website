import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./button.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  link?: string;
  href?: string;
  navLink?: string;
}

const Button = ({ link, href, navLink, className, children, ...props }: ButtonProps) => {
  let classes = "btn";
  if (className) classes = classes + " " + className;

  let buttonComponent = (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );

  if (navLink) buttonComponent = <NavLink to={navLink}>{buttonComponent}</NavLink>;
  if (link) buttonComponent = <Link to={link}>{buttonComponent}</Link>;
  if (href) buttonComponent = <a href={href}>{buttonComponent}</a>;
  return buttonComponent;
};

export default Button;
