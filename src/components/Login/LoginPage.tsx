import React, { useState } from "react";
import { AUTH_TOKEN_NAME } from "../../utils/constants";
import { LoginMutation, LoginMutationVariables } from "../../types";
import { LOGIN } from "../../queries/Login";
import { useMutation } from "react-apollo";
import { Redirect, BrowserRouter } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { ErrorText, notEmptyValidation } from "components/utils/Validations";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrectCredentials, setIncorrectCredentials] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loginMutation, loadResult] = useMutation<LoginMutation, LoginMutationVariables>(LOGIN, {
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
