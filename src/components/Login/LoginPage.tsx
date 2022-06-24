import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AUTH_TOKEN_NAME } from "../../utils/constants";
import { LoginMutation, LoginMutationVariables } from "../../types";
import { LOGIN } from "../../queries/Login";
import { useMutation } from "react-apollo";
import { Redirect, BrowserRouter } from "react-router-dom";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loginMutation, loadResult] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem(AUTH_TOKEN_NAME, data.login.access_token);
      setRedirect(true);
    },
  });

  const login = () => {
    loginMutation({ variables: { username, password } });
  };

  if (redirect)
    return (
      <BrowserRouter forceRefresh={true}>
        <Redirect push to={"/"} />
      </BrowserRouter>
    );

  return (
    <div>
      <div>Username</div>
      <input value={username} onChange={(event) => setUsername(event.target.value)} />
      <div>Contraseña</div>
      <input value={password} onChange={(event) => setPassword(event.target.value)} />
      <Button onClick={login}>Login</Button>
    </div>
  );
};

export default LoginPage;
