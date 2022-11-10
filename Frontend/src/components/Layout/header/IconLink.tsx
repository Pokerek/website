import React from "react";
import DynamicFaIcon from "../../DynamicFaIcon";
import { TIcon } from "../../../types/Icon";

export const IconLink: React.FC<{ icon: TIcon }> = (props) => {
  return (
    <a href={props.icon.url} className="header__icon">
      <DynamicFaIcon name={props.icon.body} />
    </a>
  );
};
