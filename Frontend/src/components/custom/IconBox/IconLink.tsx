import React from "react";
import DynamicFaIcon from "../../DynamicFaIcon";
import { TIcon } from "../../../types/Icon";

import "./IconBox.scss";

export const IconLink: React.FC<{ icon: TIcon }> = (props) => {
  return (
    <a href={props.icon.url} className="iconBox__icon">
      <DynamicFaIcon name={props.icon.body} />
    </a>
  );
};
