import { FC } from "react";
import { TInput } from "../../../types/Form/Input";

export const FormInput: FC<TInput> = ({ label, ...rest }) => {
  return (
    <div>
      <label>
        {label}
        <input {...rest} />
      </label>
    </div>
  );
};
