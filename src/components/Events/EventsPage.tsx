import React, { useEffect, useRef } from "react";
import { useMutation } from "@apollo/client";
import { RemoveEventMutation, RemoveEventMutationVariables, ServicesAllFieldsFragment } from "../../types";
import { GET_PAGINATED_EVENTS, REMOVE_EVENT } from "../../queries/events";
import { ColumnDescription } from "react-bootstrap-table-next";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { get_event_columns } from "utils/columns";
import PagedTable from "../utils/PagedTable";

const EventsPage = () => {
  const history = useHistory();
  const [removeEvent] = useMutation<RemoveEventMutation, RemoveEventMutationVariables>(REMOVE_EVENT);

  const refreshTable = useRef(() => {});

  useEffect(() => {
    refreshTable.current();
  }, []);

  const columns: ColumnDescription[] = get_event_columns({
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row: ServicesAllFieldsFragment) => (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <Button className="btn-fill btn-sm" onClick={() => history.push(`/events/${row.id}/edit`)} variant="success">
          Editar
        </Button>
        <Button
          className="btn-sm"
          variant="danger"
          onClick={() => removeEvent({ variables: { id: row.id } }).then(() => refreshTable.current())}
        >
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
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              <PagedTable columns={columns} query={GET_PAGINATED_EVENTS} refreshFunction={refreshTable} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventsPage;
