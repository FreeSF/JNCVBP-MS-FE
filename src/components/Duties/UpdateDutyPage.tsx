import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo";

import { Form as IForm, FormApi } from "informed"; //Form
import Spinner from "../spinner";
import { Container } from "react-bootstrap";

import { EditDutyMutation, EditDutyMutationVariables, FindDutyQuery, UpdateDutyInput } from "../../types";
import { EDIT_DUTY, FIND_DUTY, GET_DUTIES } from "../../queries/duties";
import DutyForm from "./DutyForm";

interface theProps extends RouteComponentProps {
  id: String;
}

const UpdateDutyPage = (props: RouteComponentProps<{ id: string }>) => {
  const getDuty = useQuery<FindDutyQuery>(FIND_DUTY, { variables: { id: props.match.params.id } });
  const [formRef, setFormRef] = useState<FormApi<UpdateDutyInput>>(null);
  const [editDuty, editedDuty] = useMutation<EditDutyMutation, EditDutyMutationVariables>(EDIT_DUTY, {
    refetchQueries: [{ query: GET_DUTIES }],
  });
  if (getDuty.loading) return <Spinner />;

  const handleSubmit = () => {
    editDuty({
      variables: {
        input: {
          ...formRef.getState().values,
          id: duty.id,
        },
      },
    }).then(() => {
      props.history.push("/duties");
    });
  };

  const duty = getDuty?.data?.duty;

  return (
    <Container fluid>
      <IForm
        initialValues={duty}
        getApi={(formRef: FormApi<UpdateDutyInput>) => setFormRef(formRef)}
        onSubmit={handleSubmit}
      >
        {({ formApi, formState }) => <DutyForm />}
      </IForm>
    </Container>
  );
};

export default UpdateDutyPage;
