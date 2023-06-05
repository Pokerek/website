import Terminal from "./Terminal/Terminal";
import CenterBox from "./CenterBox/CenterBox";

const elementsToWrite = [
  { className: "welcome__title", text: "HELLO FRIEND" },
  { className: "welcome__text", text: "I'm Karol Chrobok" },
  { className: "welcome__text", text: "Padawan of JavaScript" },
];

const Main = () => {
  return (
    <div>
      <CenterBox>
        <Terminal />
      </CenterBox>
    </div>
  );
};

export default Main;
