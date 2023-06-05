import { SuperBox } from "../../components/custom/SuperBox/SuperBox";
import { Button } from "../../components/custom/Button/Button";
import { Write } from "../../components/custom/Write";
import { Terminal } from "../../components/custom/Terminal/Terminal";

const elementsToWrite = [
  { className: "welcome__title", text: "HELLO FRIEND" },
  { className: "welcome__text", text: "I'm Karol Chrobok" },
  { className: "welcome__text", text: "Padawan of JavaScript" },
];

export const Welcome = () => {
  return (
    <div>
      <Terminal />
    </div>
  );
};
