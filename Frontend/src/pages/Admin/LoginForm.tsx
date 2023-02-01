import { useContext } from "react";
import { FormControl } from "../../components/custom/FromControl/FormControl";
import { SuperBox } from "../../components/custom/SuperBox/SuperBox";
import { TInput } from "../../types/Form/Input";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const fields: TInput[] = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];

export const LoginForm = () => {
  const navigate = useNavigate();
  const Authentication = useContext(AuthContext);

  const handleFormSubmit = async (data: { [key: string]: string }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );
      if (response.status !== 200) throw Error("Something went wrong!");
      Authentication?.changeIsLogin();

      navigate("/journal.dev");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SuperBox>
      <FormControl fields={fields} onSubmit={handleFormSubmit} />
    </SuperBox>
  );
};
