import React, { useEffect, useState } from "react";
import { Form as Form, FormApi } from "informed";
import { Container } from "react-bootstrap";

import {
  EditGuardMutation,
  EditGuardMutationVariables,
  FindGuardQuery,
  FindGuardQueryVariables,
  UpdateGuardInput,
} from "../../types";
import { useMutation, useLazyQuery } from "@apollo/client";
import { CURRENT_GUARD, EDIT_GUARD, FIND_GUARD, GET_GUARDS, NEXT_GUARD } from "../../queries/Guards";

import GuardForm from "./GuardForm";
import Spinner from "components/spinner";
import { useParams } from "react-router-dom";

const CreateGuardPage = (props) => {
  const [loadGuard, loadResult] = useLazyQuery<FindGuardQuery, FindGuardQueryVariables>(FIND_GUARD, {
    onCompleted: (data) => {
      const volunteers = data.guard?.volunteers.map((volunteer) => ({ _id: volunteer.id }));
      setVolunteers(volunteers);
    },
  });
  const params = useParams<any>();

  const [formRef, setFormRef] = useState<FormApi<UpdateGuardInput>>(null);
  const [volunteers, setVolunteers] = useState<any>([]);
  const [updateGuard, editedGuard] = useMutation<EditGuardMutation, EditGuardMutationVariables>(EDIT_GUARD);

  useEffect(() => {
    loadGuard({ variables: { id: params.id } });
  }, []);

  if (loadResult.loading || !loadResult.called) return <Spinner />;

  const handleSubmit = () => {
    const volunteers = formRef.getState().values.volunteers?.filter((x) => x) || [];
    updateGuard({
      variables: {
        input: {
          ...formRef.getState().values,
          volunteers: volunteers,
          id: props.match.params.id,
        },
      },
      refetchQueries: [{ query: GET_GUARDS }, { query: CURRENT_GUARD }, { query: NEXT_GUARD }],
    }).then((value) => {
      props.history.push("/guards");
    });
  };

  const defaultValues: UpdateGuardInput = {
    id: loadResult.data.guard.id,
    start_time: loadResult.data.guard.start_time,
    end_time: loadResult.data.guard.end_time,
    volunteers: loadResult.data.guard.volunteers.map((volunteer) => ({ _id: volunteer.id })),
  };

  return (
    <Container fluid>
      <Form
        initialValues={defaultValues}
        getApi={(formRef: FormApi<UpdateGuardInput>) => setFormRef(formRef)}
        onSubmit={handleSubmit}
      >
        {({ formApi, formState }) => (
          <GuardForm
            formApi={formApi}
            formState={formState}
            volunteers={volunteers}
            setVolunteers={setVolunteers}
            initialVolunteersQuantity={loadResult.data.guard.volunteers.length}
          />
        )}
      </Form>
    </Container>
  );
};

export default CreateGuardPage;
