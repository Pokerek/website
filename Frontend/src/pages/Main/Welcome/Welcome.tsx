import Terminal from "../Terminal/Terminal";

const elementsToWrite = [
  { text: "Hello stranger!" },
  { text: "I'm Karol Chrobok" },
  { text: "Padawan of Fullstack" },
];

const Welcome = () => {
  return <Terminal elements={elementsToWrite} />;
};

export default Welcome;
