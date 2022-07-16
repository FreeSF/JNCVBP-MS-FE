import React, { useState } from "react";
import { Form as Form, FormApi } from "informed";
import { Container } from "react-bootstrap";

import { useMutation } from "react-apollo";
import { useHistory, useParams } from "react-router-dom";
import { CreateGuardInput, CreateGuardMutation, CreateGuardMutationVariables } from "../../types";

import { CREATE_GUARD, CURRENT_GUARD, GET_GUARDS, NEXT_GUARD } from "../../queries/Guards";
import GuardForm from "./GuardForm";

const CreateGuardPage = (_props) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateGuardInput>>(null);
  const [volunteers, setVolunteers] = useState<[]>([]);

  const [createGuard, createdGuard] = useMutation<CreateGuardMutation, CreateGuardMutationVariables>(CREATE_GUARD);
  const history = useHistory();

  const defaultValues: CreateGuardInput = {
    start_time: new Date(new Date().setHours(8, 0, 0, 0)).getTime(), // default 06:00
    end_time: new Date(new Date().setHours(16, 0, 0, 0)).getTime(), // default 16:00
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
      refetchQueries: [{ query: GET_GUARDS }, { query: CURRENT_GUARD }, { query: NEXT_GUARD }],
    }).then((_value) => {
      history.push("/guards");
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
