import { FormControl } from "../../components/custom/FromControl/FormControl";
import { SuperBox } from "../../components/custom/SuperBox/SuperBox";
import { TInput } from "../../types/Form/Input";

const fields: TInput[] = [
  { name: "username", label: "Username" },
  { name: "password", label: "Password", type: "password" },
];

export const LoginForm = () => {
  const handleFormSubmit = (data: { [key: string]: string }) => {
    console.log(data);
  };
  return (
    <SuperBox className="">
      <FormControl fields={fields} onSubmit={handleFormSubmit} />
    </SuperBox>
  );
};
