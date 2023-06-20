import { useState, useEffect } from "react";

import CenterBox from "./CenterBox/CenterBox";
import About from "./About/About";
import Skills from "./Skills/Skills";
import Experience from "./Experience/Experience";
import OtherActivities from "./OtherActivities/OtherActivities";
import Contact from "./Contact/Contact";
import Welcome from "./Welcome/Welcome";

import "./Main.scss";

const Main = () => {
  //TODO add to context
  const [firstTime, setFirstTime] = useState(true);

  const handleKeyPress = () => {
    setFirstTime(false);
    window.removeEventListener("keypress", handleKeyPress);
    window.removeEventListener("touchstart", handleKeyPress);
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);
    window.addEventListener("touchstart", handleKeyPress);
    window.scrollTo(0, 0);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      window.removeEventListener("touchstart", handleKeyPress);
    };
  }, []);

  return (
    <div className="main">
      {firstTime ? (
        <Welcome />
      ) : (
        <>
          <About />
          <Skills />

          <Experience />

          <OtherActivities />
          <Contact />
        </>
      )}
    </div>
  );
};

export default Main;
