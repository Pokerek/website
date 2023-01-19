import { FC, FormEvent, ChangeEvent, useState } from "react";
import { TFormControl } from "../../../types/Form/FormControl";
import { FormInput } from "./FormInput";
import { Button } from "../Button/Button";

import "./FormControl.scss";

export const FormControl: FC<TFormControl> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <form className="form-control" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <FormInput
          key={field.name}
          label={field.label}
          type={field.type}
          name={field.name}
          value={field.value}
          onChange={handleChange}
        />
      ))}
      <Button type="submit" text="Login" className="btn--green" />
    </form>
  );
};
