import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";

import { RemoveGuardMutation, RemoveGuardMutationVariables, ServicesAllFieldsFragment } from "../../types";
import {
  CURRENT_GUARD,
  GET_GUARDS_DISABLED,
  GET_PAGINATED_GUARDS,
  NEXT_GUARD,
  REMOVE_GUARD,
} from "../../queries/Guards";
import { get_guard_columns } from "utils/columns";
import PagedTable from "../utils/PagedTable";

const GuardsPage = (props) => {
  const [removeGuard, removedService] = useMutation<RemoveGuardMutation, RemoveGuardMutationVariables>(REMOVE_GUARD, {
    refetchQueries: [
      { query: GET_PAGINATED_GUARDS },
      { query: GET_GUARDS_DISABLED },
      { query: CURRENT_GUARD },
      { query: NEXT_GUARD },
    ],
  });
  const history = useHistory();

  const columns: ColumnDescription[] = get_guard_columns({
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row: ServicesAllFieldsFragment) => (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <Button className="btn-fill btn-sm" onClick={() => history.push(`/guards/${row.id}/edit`)} variant="success">
          Editar
        </Button>
        <Button
          className="btn-sm"
          variant="danger"
          onClick={() =>
            removeGuard({
              variables: { id: row.id },
            })
          }
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
              <Card.Title as="h4">
                Lista de Guardias
                <Button className="pull-right ml-2" variant="primary" onClick={() => history.push(`/guards/create`)}>
                  {" "}
                  Agregar
                </Button>
              </Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              <PagedTable keyField={"id"} query={GET_PAGINATED_GUARDS} columns={columns} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GuardsPage;
