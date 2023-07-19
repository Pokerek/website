import { HTMLAttributes } from "react";

import "./scroll-section.scss";

const ScrollSection = ({ id, children }: HTMLAttributes<HTMLElement>) => {
  return (
    <section id={id} className="scrollSection">
      {children}
    </section>
  );
};

export default ScrollSection;
