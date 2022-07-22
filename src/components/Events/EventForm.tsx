import React, { useState } from "react";
import { FormApi, Form as IForm, Text } from "informed";

import { CreateEventInput, CreateEventMutation, CreateEventMutationVariables, GetCurrentUserQuery } from "../../types";
import { useMutation, useQuery } from "react-apollo";
import { CREATE_EVENT, GET_EVENTS } from "../../queries/events";

import { Button, Row } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import { CURRENT_USER } from "../../queries/Login";
import Spinner from "../spinner";

const initialValues: CreateEventInput = {
  created_by: undefined,
  description: "",
};

const EventForm = (props) => {
  const currentUserQuery = useQuery<GetCurrentUserQuery>(CURRENT_USER);

  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateEventInput>>(null);
  const [createEvent, createdEvent] = useMutation<CreateEventMutation, CreateEventMutationVariables>(CREATE_EVENT);

  if (currentUserQuery.loading) return <Spinner />;

  const handleSubmit = (a) => {
    createEvent({
      variables: {
        input: { ...formRefCreate.getState().values, created_by: { _id: currentUserQuery.data.currentUser.id } },
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
