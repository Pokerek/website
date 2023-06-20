import { HTMLAttributes } from "react";
import "./Container.scss";

const Container = ({ children }: HTMLAttributes<HTMLDivElement>) => (
  <div className="container">{children}</div>
);

export default Container;
