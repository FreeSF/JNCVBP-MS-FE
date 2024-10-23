import React, { useState } from "react";
import { AUTH_TOKEN_NAME } from "../../utils/constants";
import { LoginMutation, LoginMutationVariables } from "../../types";
import { LOGIN } from "../../queries/Login";
import { useMutation } from "@apollo/client";
import { Redirect, BrowserRouter } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { ErrorText, notEmptyValidation } from "components/utils/Validations";

/**
 * LoginPage component.
 * This component renders a login form that allows users to authenticate by entering their username and password.
 * It uses the `useMutation` hook to perform a login mutation and stores the received access token in local storage upon successful login.
 * If the login is successful, it redirects the user to the home page.
 *
 * @returns {JSX.Element} The login page component.
 */
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const [redirect, setRedirect] = useState(false);

  /**
   * loginMutation is a GraphQL mutation hook that performs the login operation.
   * It takes username and password as variables and attempts to authenticate the user.
   * On successful login, it stores the access token in local storage and triggers a redirect.
   * If the login fails, it sets the incorrectCredentials state to true.
   */
  const [loginMutation] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN, {
    onCompleted: (data) => {
      if (data?.login?.access_token) {
        localStorage.setItem(AUTH_TOKEN_NAME, data.login.access_token);
        setRedirect(true);
      } else setIncorrectCredentials(true);
    },
  });

  const login = () => {
    loginMutation({ variables: { username, password } });
  };

  /**
   * If the user is already logged in, redirect them to the home page.
   * This check is done by checking if the access token is present in local storage.
   * If it is, then the user is already logged in and should be redirected to the home page.
   */
  if (redirect)
    return (
      <BrowserRouter forceRefresh={true}>
        <Redirect push to={"/"} />
      </BrowserRouter>
    );

  return (
    <div className="main-panel" style={{ float: "none", width: "100%" }}>
      <div
        className="content"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Container fluid>
          <Row>
            <Col md="4" className="offset-md-4">
              <Card>
                <Card.Header>
                  <div style={{ textAlign: "center" }}>
                    <div className="card-title">
                      <img src={require("../../assets/img/logo.png")} style={{ width: "52px" }} />
                      <span className="h2 fw-bold" style={{ margin: "0", verticalAlign: "middle" }}>
                        JNCBVP-MS
                      </span>
                    </div>
                  </div>
                  <hr />
                  <Card.Title as="h4">Iniciar Sesión</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label> Nombre de Usuario (*)</label>
                        <ErrorText
                          className="form-control"
                          field="username"
                          placeholder="Usuario"
                          type="text"
                          autoFocus
                          validateOnChange
                          validateOnBlur
                          validate={notEmptyValidation}
                          onChange={(event) => setUsername(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") login();
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col md="12">
                      <Form.Group>
                        <label> Contraseña (*)</label>
                        <ErrorText
                          className="form-control"
                          field="password"
                          placeholder="Contraseña"
                          type="password"
                          validateOnChange
                          validateOnBlur
                          validate={notEmptyValidation}
                          onChange={(event) => setPassword(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") login();
                          }}
                        />
                      </Form.Group>
                    </Col>
                    {incorrectCredentials && (
                      <span style={{ color: "red" }}>La combinación de Usuario - Contraseña no existe</span>
                    )}
                  </Row>
                  <Button className="btn-fill btn-pull-right" variant="info" onClick={login}>
                    Iniciar Sesión
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;
