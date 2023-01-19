import { useFetch } from "usehooks-ts";
import { TIcon } from "../../../types/Icon";
import { IconLink } from "./IconLink";

import "./IconBox.scss";

export const IconBox = () => {
  const { data } = useFetch<TIcon[]>(
    `${process.env.REACT_APP_BACKEND_URL}/cv/social`,
  );

  return (
    <div className="iconBox">
      {data?.map((icon, index) => (
        <IconLink key={`icon-${index}`} icon={icon} />
      ))}
    </div>
  );
};
