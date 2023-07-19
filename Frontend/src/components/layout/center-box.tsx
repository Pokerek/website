import { HTMLAttributes } from "react";
import "./center-box.scss";

const CenterBox = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className="centerBox">{children}</div>;
};

export default CenterBox;
