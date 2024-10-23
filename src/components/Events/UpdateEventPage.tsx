import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { Form as IForm, FormApi, Text } from "informed";
import Spinner from "../spinner";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { EditEventMutation, EditEventMutationVariables, FindEventQuery, UpdateEventInput } from "../../types";
import { EDIT_EVENT, FIND_EVENT, GET_EVENTS } from "../../queries/events";

const UpdateeventPage = (props: RouteComponentProps<{ id: string }>) => {
  const getevent = useQuery<FindEventQuery>(FIND_EVENT, { variables: { id: props.match.params.id } });
  const [formRef, setFormRef] = useState<FormApi<UpdateEventInput>>(null);
  const [editEvent] = useMutation<EditEventMutation, EditEventMutationVariables>(EDIT_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }],
  });
  if (getevent.loading) return <Spinner />;

  const handleSubmit = () => {
    editEvent({
      variables: {
        input: {
          ...formRef.getState().values,
          id: event.id,
        },
      },
    }).then(() => {
      props.history.push("/events");
    });
  };

  const event = getevent?.data?.event;

  return (
    <Container fluid>
      <IForm initialValues={event} getApi={(formRef: FormApi<any>) => setFormRef(formRef)} onSubmit={handleSubmit}>
        {({ formApi, formState }) => (
          <Row>
            <Col md="6" className="offset-md-3">
              <Card>
                <Card.Header>
                  <Card.Title as="h4">Evento</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md="8">
                      <Form.Group>
                        <label>Descripción</label>
                        <Text className="form-control" field="description" type="text" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button className="btn-fill btn-pull-right" variant="info" type="submit">
                    Guardar Evento
                  </Button>
                  <div className="clearfix"></div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </IForm>
    </Container>
  );
};

export default UpdateeventPage;
