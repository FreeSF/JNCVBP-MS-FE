import React, { useState } from "react";
import { Form, FormApi } from "informed";
import {
  EditUserMutation,
  EditUserMutationVariables,
  FindUserQuery,
  GetCurrentUserQuery,
  UpdateUserInput,
} from "../../types";
import UserForm from "./UserForm";
import { useMutation, useQuery } from "react-apollo";
import { EDIT_USER, FIND_USER, GET_USERS } from "../../queries/Users";
import Spinner from "../spinner";
import { Container } from "react-bootstrap";
import { CURRENT_USER } from "../../queries/Login";
import { NotificationManager } from "react-notifications";
import _ from "lodash";

const UpdateUserPage = (props) => {
  const [formRef, setFormRef] = useState<FormApi<UpdateUserInput>>(null);
  const currentUserQuery = useQuery<GetCurrentUserQuery>(CURRENT_USER);
  const findUserQuery = useQuery<FindUserQuery>(FIND_USER, { variables: { id: props.match.params.id } });
  const [updateUser, updatedUser] = useMutation<EditUserMutation, EditUserMutationVariables>(EDIT_USER);

  if (findUserQuery.loading || !findUserQuery.called || currentUserQuery.loading) return <Spinner />;

  if (!currentUserQuery.data.currentUser.isAdmin && currentUserQuery.data.currentUser.id !== props.match.params.id)
    return <div>Restringido</div>;

  const user = findUserQuery.data.user;

  const defaultValues: UpdateUserInput = {
    email: user.email,
    firstName: user.firstName,
    id: user.id,
    isAdmin: user.isAdmin,
    lastName: user.lastName,
    password: "",
    username: user.username,
  };

  const handleSubmit = (formStateValues) => {
    updateUser({
      variables: {
        input: { ...formRef.getState().values, id: props.match.params.id },
      },
      refetchQueries: [{ query: GET_USERS }],
    })
      .then((value) => {
        if (currentUserQuery.data.currentUser.isAdmin) props.history.push("/users");
        else props.history.push("");
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
        getApi={(formRef: FormApi<UpdateUserInput>) => setFormRef(formRef)}
        onSubmit={handleSubmit}
      >
        {({ formApi, formState }) => <UserForm formApi={formApi} formState={formState} isCreate={false} />}
      </Form>
    </Container>
  );
};

export default UpdateUserPage;
