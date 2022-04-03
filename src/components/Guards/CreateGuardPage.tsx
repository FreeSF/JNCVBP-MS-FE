import React, { useState } from "react";
import { Form as Form, FormApi } from "informed";
import { Container } from "react-bootstrap";

import { useMutation } from "react-apollo";
import { useHistory } from "react-router-dom";
import { CreateGuardInput, CreateGuardMutation, CreateGuardMutationVariables } from "../../types";

import { CREATE_GUARD, GET_GUARDS } from "../../queries/Guards";
import GuardForm from "./GuardForm";

const CreateGuardPage = (props) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateGuardInput>>(null);
  const [volunteers, setVolunteers] = useState<[]>([]);

  const [createGuard, createdGuard] = useMutation<CreateGuardMutation, CreateGuardMutationVariables>(CREATE_GUARD);
  const history = useHistory();

  const defaultValues: CreateGuardInput = {
    start_time: new Date().getTime(),
    end_time: new Date().getTime(),
    volunteers: [],
  };

  const handleSubmit = () => {
    const volunteers = formRefCreate.getState().values?.volunteers?.filter((x) => x) || [];
    createGuard({
      variables: {
        input: {
          ...formRefCreate.getState().values,
          volunteers: volunteers,
        },
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
          <GuardForm formApi={formApi} formState={formState} volunteers={volunteers} setVolunteers={setVolunteers} />
        )}
      </Form>
    </Container>
  );
};

export default CreateGuardPage;
