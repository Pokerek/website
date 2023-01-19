import { FC } from "react";

import { Star } from "../../components/custom/Star/Star";
import { TextBox } from "../../components/custom/TextBox/TextBox";
import { TCV } from "../../types/cv/CV";

type props = {
  data: TCV;
};

export const AboutMe: FC<props> = (props) => (
  <article className="about__box">
    <h3 className="about__subtitle">User data</h3>
    <p className="about__text">
      First name: <span className="about__subtext">{props.data.firstName}</span>
    </p>
    <p className="about__text">
      Last name: <span className="about__subtext">{props.data.lastName}</span>
    </p>
    <p className="about__text">
      Location: <span className="about__subtext">{props.data.location}</span>
    </p>
    <Star className="about__text" text="BIO" position="end" />
    {props.data.bio && <TextBox innerHtml={props.data.bio} />}
    <Star
      text="You're recruiter and you're looking for technical
    information? Let's click Tech section."
      position="start"
    />
  </article>
);
