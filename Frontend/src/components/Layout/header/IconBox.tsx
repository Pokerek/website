import { useFetch } from "usehooks-ts";
import { TIcon } from "../../../types/Icon";
import { IconLink } from "./IconLink";

export const IconBox = () => {
  const { data } = useFetch<TIcon[]>(
    `${process.env.REACT_APP_BACKEND_URL}/cv/social`,
  );

  return (
    <div className="header__iconBox header__right">
      {data?.map((icon, index) => (
        <IconLink key={`icon-${index}`} icon={icon} />
      ))}
    </div>
  );
};
