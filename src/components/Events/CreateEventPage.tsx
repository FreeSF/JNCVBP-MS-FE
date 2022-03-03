import React, { useState } from "react";
import { FormApi, Form, Text } from "informed";
import { CreateEventInput, CreateEventMutation, CreateEventMutationVariables } from "../../types";
import { useMutation } from "react-apollo";
import { CREATE_EVENT, GET_EVENTS } from "../../queries/Events";
import { Button } from "react-bootstrap";

const initialValues: CreateEventInput = {
  created_by: undefined,
  description: "",
};

const CreateEventPage = (props) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateEventInput>>(null);
  const [createEvent, createdEvent] = useMutation<CreateEventMutation, CreateEventMutationVariables>(CREATE_EVENT);

  const handleSubmit = () => {
    createEvent({
      variables: {
        input: formRefCreate.getState().values,
      },
      refetchQueries: [{ query: GET_EVENTS }],
    }).then((value) => {
      props.history.push("/events");
    });
  };

  return (
    <div>
      <h1>Registrar Novedad</h1>

      <Form
        getApi={(formRef: FormApi<CreateEventInput>) => setFormRefCreate(formRef)}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        {({ formApi, formState }) => (
          <div>
            <label>Descripción:</label>
            <Text field="description" />
            <Button type="submit">Crear Evento</Button>
            <Button href="/events">Volver</Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default CreateEventPage;
