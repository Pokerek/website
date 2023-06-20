import { HTMLAttributes } from "react";
import "./CenterBox.scss";

const CenterBox = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  return <div className="centerBox">{children}</div>;
};

export default CenterBox;
