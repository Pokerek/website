import { HTMLAttributes } from "react";
import "./container.scss";

const Container = ({ children }: HTMLAttributes<HTMLDivElement>) => (
  <div className="container">{children}</div>
);

export default Container;
