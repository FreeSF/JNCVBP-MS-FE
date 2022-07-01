import React, { useState } from "react";
import { Checkbox, FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";
import { CreateUserInput, GetCurrentUserQuery, UpdateUserInput } from "../../types";
import { useQuery } from "react-apollo";
import { CURRENT_USER } from "../../queries/Login";
import Spinner from "../spinner";
import { Button } from "react-bootstrap";

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
    <div>
      <label>Username:</label>
      <Text className="form-control" field="username" type="text" />
      <label>Nombre:</label>
      <Text className="form-control" field="firstName" type="text" />
      <label>Apellido:</label>
      <Text className="form-control" field="lastName" type="text" />
      <label>Email:</label>
      <Text className="form-control" field="email" type="text" />
      {props.isCreate ? (
        <React.Fragment>
          <label>Contraseña:</label>
          <Text className="form-control" field="password" type="password" />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <label>Modificar Contraseña?:</label>
          <input
            type="checkbox"
            checked={updatePassword}
            onClick={(event) => {
              // @ts-ignore
              setUpdatePassword(event.target.checked);
              props.formApi.setValues({ ...props.formState.values, password: "" });
            }}
          />
          <br />
          {updatePassword && (
            <React.Fragment>
              <label>Contraseña:</label>
              <Text className="form-control" field="password" type="password" />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      <Checkbox field="isAdmin" hidden />
      {currentUserQuery.data.currentUser.isAdmin && (
        <React.Fragment>
          <label>Es Admin?:</label>
          <Checkbox field="isAdmin" />
        </React.Fragment>
      )}
      <Button className="btn-fill btn-pull-right" variant="info" type="submit">
        Guardar
      </Button>
    </div>
  );
};

export default UserForm;
