import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form as Form, FormApi } from "informed";
import { Container } from "react-bootstrap";

import { CreateGuardInput, CreateGuardMutation, CreateGuardMutationVariables } from "../../types";
import { useMutation } from "react-apollo";
import { CREATE_GUARD, GET_GUARDS } from "../../queries/Guards";
import GuardForm from "./GuardForm";

const CreateGuardPage = (props) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateGuardInput>>(null);
  const [volunteersQuantity, setVolunteersQuantity] = useState<number>(0);

  const [createGuard, createdGuard] = useMutation<CreateGuardMutation, CreateGuardMutationVariables>(CREATE_GUARD);
  const history = useHistory();

  const defaultValues: CreateGuardInput = {
    start_time: new Date().getTime(),
    end_time: new Date().getTime(),
    volunteers: [],
  };

  const handleSubmit = () => {
    createGuard({
      variables: {
        input: formRefCreate.getState().values,
      },
      refetchQueries: [{ query: GET_GUARDS }],
    }).then((value) => {
      props.history.push("/guards");
    });
  };

  return (
    <Container fluid>
      <Form
        getApi={(formRef: FormApi<CreateGuardInput>) => setFormRefCreate(formRef)}
        onSubmit={handleSubmit}
        initialValues={defaultValues}
      >
        {({ formApi, formState }) => (
          <GuardForm
            formApi={formApi}
            formState={formState}
            volunteersQuantity={volunteersQuantity}
            setVolunteersQuantity={setVolunteersQuantity}
          />
        )}
      </Form>
    </Container>
  );
};

export default CreateGuardPage;
