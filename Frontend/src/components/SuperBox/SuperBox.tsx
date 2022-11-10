import { FC, ReactNode } from "react";
import "./SuperBox.scss";

type props = {
  children: ReactNode;
  className: string;
};

export const SuperBox: FC<props> = (props) => (
  <div className={`superBox ${props.className}`}>{props.children}</div>
);
