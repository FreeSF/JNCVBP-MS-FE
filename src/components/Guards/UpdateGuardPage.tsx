import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form as Form, FormApi } from "informed";
import { Container } from "react-bootstrap";

import { EditGuardMutation, EditGuardMutationVariables, FindGuardQuery, UpdateGuardInput } from "../../types";
import { useMutation, useQuery } from "react-apollo";
import { EDIT_GUARD, FIND_GUARD, GET_GUARDS } from "../../queries/Guards";

import GuardForm from "./GuardForm";
import Spinner from "components/spinner";

const CreateGuardPage = (props) => {
  const getGuard = useQuery<FindGuardQuery>(FIND_GUARD, { variables: { id: props.match.params.id } });
  const [formRef, setFormRef] = useState<FormApi<UpdateGuardInput>>(null);
  const [volunteersQuantity, setVolunteersQuantity] = useState<number>(0);
  const [editGuard, editedGuard] = useMutation<EditGuardMutation, EditGuardMutationVariables>(EDIT_GUARD);

  if (getGuard.loading) return <Spinner />;

  const handleSubmit = () => {
    editGuard({
      variables: {
        input: {
          ...formRef.getState().values,
          id: props.match.params.id,
        },
      },
      refetchQueries: [{ query: GET_GUARDS }],
    }).then((value) => {
      props.history.push("/guards");
    });
  };

  const defaultValues: UpdateGuardInput = {
    id: undefined,
    start_time: new Date().getTime(),
    end_time: new Date().getTime(),
    volunteers: [],
  };

  const guard = getGuard?.data?.guard || defaultValues;
  return (
    <Container fluid>
      <Form
        initialValues={guard}
        getApi={(formRef: FormApi<UpdateGuardInput>) => setFormRef(formRef)}
        onSubmit={handleSubmit}
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
