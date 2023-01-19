import { FC, ReactNode } from "react";
import "./TextBox.scss";

type props = {
  innerHtml?: string;
  children?: ReactNode;
};
export const TextBox: FC<props> = (props) => {
  let textBox = (
    <div
      className="textBox"
      dangerouslySetInnerHTML={{
        __html: props.innerHtml ? props.innerHtml : "",
      }}
    ></div>
  );
  if (props.children) textBox = <div className="textBox">{props.children}</div>;

  return textBox;
};
