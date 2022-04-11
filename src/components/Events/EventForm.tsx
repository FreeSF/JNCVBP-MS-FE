import React, { useState } from "react";
import { FormApi, Form as IForm, Text } from "informed";

import { CreateEventInput, CreateEventMutation, CreateEventMutationVariables } from "../../types";
import { useMutation } from "react-apollo";
import { CREATE_EVENT, GET_EVENTS } from "../../queries/Events";

import { Button, Row } from "react-bootstrap";
import { NotificationManager } from "react-notifications";

const initialValues: CreateEventInput = {
  created_by: undefined,
  description: "",
};

const EventForm = (props) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateEventInput>>(null);
  const [createEvent, createdEvent] = useMutation<CreateEventMutation, CreateEventMutationVariables>(CREATE_EVENT);

  const handleSubmit = (a) => {
    createEvent({
      variables: {
        input: formRefCreate.getState().values,
      },
      refetchQueries: [{ query: GET_EVENTS }],
    }).then((value) => {
      formRefCreate.reset();
      NotificationManager.success("Novedad creada");
    });
  };

  return (
    <IForm
      getApi={(formRef: FormApi<CreateEventInput>) => setFormRefCreate(formRef)}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    >
      {({ formApi, formState }) => (
        <Row>
          <div style={{ borderRadius: "4px", color: "#565656", width: "500px" }}>
            <Text
              className="form-control"
              minLength={3}
              required
              style={{ display: "inline", width: "60%" }}
              field="description"
            />
            <Button className="btn-sm" type="submit">
              Crear Evento
            </Button>
          </div>
        </Row>
      )}
    </IForm>
  );
};

export default EventForm;
