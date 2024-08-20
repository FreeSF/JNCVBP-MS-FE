import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GetEventsQuery,
  RemoveEventMutation,
  RemoveEventMutationVariables,
  ServicesAllFieldsFragment,
  VolunteerAllFieldsFragment,
} from "../../types";
import { GET_EVENTS, GET_EVENTS_DISABLED, REMOVE_EVENT } from "../../queries/events";
import Spinner from "../spinner";
import { ColumnDescription } from "react-bootstrap-table-next";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { GET_GUARDS } from "../../queries/Guards";
import { useHistory } from "react-router-dom";
import StandardTable from "../utils/standardTable";
import { get_event_columns } from "utils/columns";

const EventsPage = (props) => {
  const history = useHistory();
  const getEventsQuery = useQuery<GetEventsQuery>(GET_EVENTS);
  const [removeEvent, removedEvent] = useMutation<RemoveEventMutation, RemoveEventMutationVariables>(REMOVE_EVENT, {
    refetchQueries: [{ query: GET_EVENTS }, { query: GET_EVENTS_DISABLED }],
  });

  if (getEventsQuery.loading) return <Spinner />;

  const columns: ColumnDescription[] = get_event_columns({
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row: ServicesAllFieldsFragment) => (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <Button className="btn-fill btn-sm" onClick={() => history.push(`/events/${row.id}/edit`)} variant="success">
          Editar
        </Button>
        <Button className="btn-sm" variant="danger" onClick={() => removeEvent({ variables: { id: row.id } })}>
          Eliminar
        </Button>
      </div>
    ),
  });

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Libro de Novedades</Card.Title>
              <p className="cardu-category">
                ({getEventsQuery.data?.events.length}) Eventos registrados en el sistema{" "}
              </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              {getEventsQuery.loading ? (
                <Spinner />
              ) : (
                <StandardTable columns={columns} data={getEventsQuery.data?.events} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventsPage;
