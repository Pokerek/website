import { FC } from "react";
import "./Star.scss";

type props = {
  position: "start" | "end";
  text: string;
  className?: string;
};

export const Star: FC<props> = ({
  position = "start",
  text,
  className = "",
}) => {
  return <p className={`${className} star star__${position}`}>{text}</p>;
};
