import CenterBox from "../CenterBox/CenterBox";
import Terminal from "../Terminal/Terminal";

const elementsToWrite = [
  { text: "Hello stranger!" },
  { text: "I'm Karol Chrobok" },
  { text: "Padawan of Fullstack" },
];

const Welcome = () => {
  return (
    <CenterBox>
      <Terminal elements={elementsToWrite} />
    </CenterBox>
  );
};

export default Welcome;
