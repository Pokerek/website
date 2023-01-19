import { FC, useEffect, useState, Fragment } from "react";
import "./Write.scss";

type props = {
  elements: Array<{
    className: string;
    text: string;
  }>;
};

type lines = JSX.Element[];

export const Write: FC<props> = (props) => {
  const [typedString, setTypedString] = useState("");
  const [index, setIndex] = useState(0);
  const [wroteLines, setWroteLines] = useState<lines>([]);

  const specialClassName = props.elements[index].className
    ? props.elements[index].className
    : "";

  useEffect(() => {
    const delay = setTimeout(() => {
      setTypedString(
        props.elements[index].text.slice(0, typedString.length + 1),
      );
    }, 100);

    return () => clearTimeout(delay);
  }, [typedString]);

  if (
    props.elements[index].text.length === typedString.length &&
    index < props.elements.length - 1
  ) {
    const element = props.elements[index];
    const newLine = (
      <p key={index + "_line"} className={element.className}>
        {element.text}
      </p>
    );

    setWroteLines((prevWroteLines) => prevWroteLines.concat(newLine));
    setIndex(index + 1);
    setTypedString("");
  }

  return (
    <Fragment>
      {wroteLines}
      <p className={`commandLine ${specialClassName}`}>{typedString}</p>
    </Fragment>
  );
};
