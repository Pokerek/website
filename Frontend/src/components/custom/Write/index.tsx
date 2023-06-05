import { FC, useEffect, useState, Fragment } from "react";
import "./Write.scss";

type props = {
  elements: Array<{
    text: string;
  }>;
  fontColor?: string;
};

type lines = JSX.Element[];

export const Write: FC<props> = ({ elements, fontColor }) => {
  const [typedString, setTypedString] = useState("");
  const [index, setIndex] = useState(0);
  const [wroteLines, setWroteLines] = useState<lines>([]);

  if (!elements) return <Fragment></Fragment>;

  useEffect(() => {
    const delay = setTimeout(() => {
      setTypedString(elements[index].text.slice(0, typedString.length + 1));
    }, 100);

    return () => clearTimeout(delay);
  }, [typedString]);

  if (
    elements[index].text.length === typedString.length &&
    index < elements.length - 1
  ) {
    const element = elements[index];
    const newLine = (
      <p key={index + "_line"} style={{ color: fontColor || "white" }}>
        {element.text}
      </p>
    );

    setWroteLines((prevWroteLines) => [...prevWroteLines, newLine]);
    setIndex(index + 1);
    setTypedString("");
  }

  return (
    <Fragment>
      {wroteLines}
      <p className={`commandLine`} style={{ color: fontColor || "white" }}>
        {typedString}
      </p>
    </Fragment>
  );
};
