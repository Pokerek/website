import React, { useCallback, useState } from "react";

import { Form, useRouteError } from "react-router-dom";

import CenterBox from "../../components/layout/center-box";
import Button from "../../components/custom/button";

import "./login-page.scss";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useRouteError();
  if (error) console.log(error);

  const handleUsernameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setUsername(event.target.value),
    [],
  );
  const handlePasswordChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(event.target.value),
    [],
  );

  return (
    <CenterBox>
      <Form
        method="POST"
        className="login-form"
      >
        <label className="login-form__label">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            pattern="[A-Za-z0-9]*"
            minLength={6}
            maxLength={20}
            required
            className="login-form__input"
            onChange={handleUsernameChange}
          />
        </label>
        <label className="login-form__label">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            pattern="[\S]*"
            minLength={6}
            maxLength={20}
            required
            className="login-form__input"
            onChange={handlePasswordChange}
          />
        </label>
        <Button type="submit">Login</Button>
      </Form>
    </CenterBox>
  );
};

export default LoginPage;
