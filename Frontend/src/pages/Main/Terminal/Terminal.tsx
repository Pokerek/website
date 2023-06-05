import { useEffect } from "react";
import { Write } from "../../../components/custom/Write";
import "./Terminal.scss";

type props = {
  elements: { text: string }[];
};

const Terminal = ({ elements }: props) => {
  return (
    <div className="terminal">
      <div className="terminal__header">
        <p className="terminal__title">chrobok.dev@admin: ~/welcome.exe</p>
      </div>
      <div className="terminal__body">
        <Write elements={elements} fontColor="#7bc74d" />
        <p className="terminal__text"></p>
        <p className="terminal__text">Press any key to continue ...</p>
      </div>
    </div>
  );
};

export default Terminal;
