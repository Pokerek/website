import CenterBox from "../../components/center-box/center-box";
import Button from "../../components/button/button";

import "./login-page.scss";

const LoginPage = () => {
  return (
    <CenterBox>
      <form
        method="POST"
        className="login-form"
      >
        <label className="login-form__label">
          Username:
          <input
            type="text"
            name="username"
            pattern="[A-Za-z0-9]*"
            minLength={3}
            maxLength={20}
            required
            className="login-form__input"
          />
        </label>
        <label className="login-form__label">
          Password:
          <input
            type="password"
            name="password"
            pattern="[A-Za-z0-9]*"
            minLength={3}
            maxLength={20}
            required
            className="login-form__input"
          />
        </label>
        <Button type="submit">Login</Button>
      </form>
    </CenterBox>
  );
};

export default LoginPage;
