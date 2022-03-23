import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMutation } from "react-apollo";

import { Form as IForm, FormApi } from "informed"; //Form
import { Container } from "react-bootstrap";

import { CreateDutyInput, Duty } from "../../types";
import { CREATE_DUTY, GET_DUTIES } from "../../queries/duties";
import DutyForm from "./DutyForm";

const CreateDutyPage = (props: RouteComponentProps<{ id: string }>) => {
  const [createDuty, createdDuty] = useMutation<{ createClient: Duty }, { input: CreateDutyInput }>(CREATE_DUTY);
  const [formRef, setFormRef] = useState<FormApi<Duty>>(null);

  const handleSubmit = () => {
    createDuty({
      variables: {
        input: { ...formRef.getState().values },
      },
      refetchQueries: [{ query: GET_DUTIES }],
    }).then((value) => {
      props.history.push("/duties");
    });
  };

  return (
    <Container fluid>
      <IForm getApi={(formRef: FormApi<Duty>) => setFormRef(formRef)} onSubmit={handleSubmit}>
        {({ formApi, formState }) => <DutyForm />}
      </IForm>
    </Container>
  );
};

export default CreateDutyPage;
