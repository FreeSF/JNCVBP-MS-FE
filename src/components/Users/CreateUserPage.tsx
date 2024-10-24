import React, { useState } from "react";
import { FormApi, Form } from "informed";
import { CreateUserInput, CreateUserMutation, CreateUserMutationVariables } from "../../types";
import { useMutation } from "@apollo/client";
import { CREATE_USER, GET_USERS } from "../../queries/Users";
import { Container } from "react-bootstrap";
import UserForm from "./UserForm";
import { NotificationManager } from "react-notifications";
import _ from "lodash";

const CreateUserPage = (props) => {
  const [formRef, setFormRef] = useState<FormApi<CreateUserInput>>(null);
  const [createUser] = useMutation<CreateUserMutation, CreateUserMutationVariables>(CREATE_USER);

  const defaultValues: CreateUserInput = {
    email: "",
    firstName: "",
    isAdmin: false,
    lastName: "",
    password: "",
    username: "",
  };

  const handleSubmit = (formStateValues) => {
    createUser({
      variables: {
        input: formRef.getState().values,
      },
      refetchQueries: [{ query: GET_USERS }],
    })
      .then((value) => {
        props.history.push("/users");
      })
      .catch((error) => {
        const status = _.get(error, "graphQLErrors[0].extensions.exception.status");
        if (status === 409) {
          NotificationManager.error("El nombre de usuario ya se encuentra en uso");
        }
      });
  };

  return (
    <Container fluid>
      <Form
        initialValues={{ ...defaultValues }}
        getApi={(formRef: FormApi<CreateUserInput>) => setFormRef(formRef)}
        onSubmit={handleSubmit}
      >
        {({ formApi, formState }) => <UserForm formApi={formApi} formState={formState} isCreate={true} />}
      </Form>
    </Container>
  );
};

export default CreateUserPage;
