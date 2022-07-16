import React, { useState } from "react";
import { Checkbox, FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";
import { CreateUserInput, GetCurrentUserQuery, UpdateUserInput } from "../../types";
import { useQuery } from "react-apollo";
import { CURRENT_USER } from "../../queries/Login";
import Spinner from "../spinner";

import { Button, Card, Col, Form, Row } from "react-bootstrap";

type theProps = {
  formApi: FormApi<CreateUserInput | UpdateUserInput>;
  formState: FormState<CreateUserInput | UpdateUserInput>;
  isCreate: boolean;
};

const UserForm = (props: theProps) => {
  const currentUserQuery = useQuery<GetCurrentUserQuery>(CURRENT_USER);
  const [updatePassword, setUpdatePassword] = useState(false);

  if (currentUserQuery.loading) return <Spinner />;

  //props.formState.values.

  return (
    <Row>
      <Col md="2"></Col>
      <Col md="8">
        <Card>
          <Card.Header>
            <Card.Title as="h4">Usuario</Card.Title>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md="6">
                <Form.Group>
                  <label>Username</label>
                  <Text className="form-control" field="username" type="text" />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group>
                  <label>Email</label>
                  <Text className="form-control" field="email" type="text" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Form.Group>
                  <label>Nombre</label>
                  <Text className="form-control" field="firstName" type="text" />
                </Form.Group>
              </Col>
              <Col md="6">
                <Form.Group>
                  <label>Apellido</label>
                  <Text className="form-control" field="lastName" type="text" />
                </Form.Group>
              </Col>
            </Row>
            <Col md="6">
              {currentUserQuery.data.currentUser.isAdmin && (
                <div className="mb-1 pl-0 form-check">
                  <label className="form-check-label">
                    <Checkbox field="isAdmin" className="form-check-input" />
                    <span className="form-check-sign"></span>
                    Es Admin?
                  </label>
                </div>
              )}
            </Col>

            {props.isCreate ? (
              <React.Fragment>
                <label>Contraseña:</label>
                <Text className="form-control" field="password" type="password" />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Col md="6">
                  <div className="mb-1 pl-0 form-check">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={updatePassword}
                        onClick={(event) => {
                          // @ts-ignore
                          setUpdatePassword(event.target.checked);
                          props.formApi.setValues({ ...props.formState.values, password: "" });
                        }}
                      />
                      <span className="form-check-sign"></span>
                      Modificar Contraseña?
                    </label>
                  </div>
                </Col>
                {updatePassword && (
                  <Col md="6">
                    <label>Contraseña:</label>
                    <Text className="form-control" field="password" type="password" />
                  </Col>
                )}
              </React.Fragment>
            )}
            <Button className="btn-fill btn-pull-right" variant="info" type="submit">
              Guardar
            </Button>
            <div className="clearfix"></div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default UserForm;
