import React, { useState } from "react";
import { FormApi, Form } from "informed";
import { CreateUserInput, CreateUserMutation, CreateUserMutationVariables } from "../../types";
import { CREATE_SERVICE, GET_SERVICES } from "../../queries/services";
import { useMutation } from "react-apollo";
import { CREATE_USER, GET_USERS } from "../../queries/Users";
import UserForm from "./UserForm";

const CreateUserPage = (props) => {
  const [formRef, setFormRef] = useState<FormApi<CreateUserInput>>(null);
  const [createUser, createdUser] = useMutation<CreateUserMutation, CreateUserMutationVariables>(CREATE_USER);

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
    }).then((value) => {
      props.history.push("/users");
    });
  };

  return (
    <div>
      <h2>Create user</h2>
      <Form
        initialValues={{ ...defaultValues }}
        getApi={(formRef: FormApi<CreateUserInput>) => setFormRef(formRef)}
        onSubmit={handleSubmit}
      >
        {({ formApi, formState }) => <UserForm formApi={formApi} formState={formState} isCreate={true} />}
      </Form>
    </div>
  );
};

export default CreateUserPage;
