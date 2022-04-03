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
import { useMutation, useLazyQuery } from "react-apollo";
import { EDIT_GUARD, FIND_GUARD, GET_GUARDS } from "../../queries/Guards";

import GuardForm from "./GuardForm";
import Spinner from "components/spinner";

const CreateGuardPage = (props) => {
  const [loadGuard, loadResult] = useLazyQuery<FindGuardQuery, FindGuardQueryVariables>(FIND_GUARD, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      const volunteers = data.guard?.volunteers.map((volunteer) => ({ _id: volunteer.id }));
      setVolunteers(volunteers);
    },
  });

  const [formRef, setFormRef] = useState<FormApi<UpdateGuardInput>>(null);
  const [volunteers, setVolunteers] = useState<any>([]);
  const [updateGuard, editedGuard] = useMutation<EditGuardMutation, EditGuardMutationVariables>(EDIT_GUARD);

  useEffect(() => {
    loadGuard({ variables: { id: props.match.params.id } });
  }, []);

  if (loadResult.loading) return <Spinner />;

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

  const guard = loadResult?.data?.guard || defaultValues;
  return (
    <Container fluid>
      <Form
        initialValues={guard}
        getApi={(formRef: FormApi<UpdateGuardInput>) => setFormRef(formRef)}
        onSubmit={handleSubmit}
      >
        {({ formApi, formState }) => (
          <GuardForm formApi={formApi} formState={formState} volunteers={volunteers} setVolunteers={setVolunteers} />
        )}
      </Form>
    </Container>
  );
};

export default CreateGuardPage;
