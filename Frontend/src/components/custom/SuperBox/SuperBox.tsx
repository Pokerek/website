import { FC, ReactNode } from "react";
import "./SuperBox.scss";

type props = {
  children: ReactNode;
  className?: string;
};

export const SuperBox: FC<props> = (props) => {
  const style = props.className || "";

  return <div className={`superBox ${style}`}>{props.children}</div>;
};
