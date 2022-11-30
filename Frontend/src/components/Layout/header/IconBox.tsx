import { useFetch } from "usehooks-ts";
import { TIcon } from "../../../types/Icon";
import { Button } from "../../Button/Button";
import { IconLink } from "./IconLink";

export const IconBox = () => {
  const { data } = useFetch<TIcon[]>(
    `${process.env.REACT_APP_BACKEND_URL}/cv/social`,
  );

  const cvUrl = `${process.env.REACT_APP_BACKEND_URL}/cv/get`;

  return (
    <div className="header__iconBox header__right">
      <Button text="CV" className="header__cv btn--green" href={cvUrl} />
      {data?.map((icon, index) => (
        <IconLink key={`icon-${index}`} icon={icon} />
      ))}
    </div>
  );
};
