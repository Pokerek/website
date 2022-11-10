import { FC, ReactNode } from "react";
import "./Container.scss";

export const Container: FC<{ children: ReactNode }> = (props) => (
  <div className="container">{props.children}</div>
);
