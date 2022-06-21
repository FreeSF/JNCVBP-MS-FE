import React, { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { API_URL, AUTH_TOKEN_NAME } from "../../utils/constants";
import { useLazyQuery, useQuery } from "react-apollo";
import { LoginQuery, LoginQueryVariables } from "../../types";
import { FIND_COURSE } from "../../queries/Courses";
import { LOGIN } from "../../queries/Login";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loadGuard, loadResult] = useLazyQuery<LoginQuery, LoginQueryVariables>(LOGIN, {
    onCompleted: (data) => {
      localStorage.setItem(AUTH_TOKEN_NAME, data.login.access_token);
    },
  });

  const login = () => {
    loadGuard({ variables: { username, password } });
  };

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
