import { HTMLAttributes } from "react";
import "./Container.scss";

export const Container = ({ children }: HTMLAttributes<HTMLDivElement>) => (
  <div className="container">{children}</div>
);
