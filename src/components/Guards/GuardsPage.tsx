import React from "react";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";

import {
  GetGuardsQuery,
  RemoveGuardMutation,
  RemoveGuardMutationVariables,
  ServicesAllFieldsFragment,
} from "../../types";
import { GET_GUARDS, REMOVE_GUARD } from "../../queries/Guards";
import Spinner from "../spinner";
import { get_guard_columns } from "utils/columns";
import StandardTable from "../utils/standardTable";

const GuardsPage = (props) => {
  const getGuardsQuery = useQuery<GetGuardsQuery>(GET_GUARDS);
  const [removeGuard, removedService] = useMutation<RemoveGuardMutation, RemoveGuardMutationVariables>(REMOVE_GUARD);
  const history = useHistory();

  if (getGuardsQuery.loading) return <Spinner />;

  const columns: ColumnDescription[] = get_guard_columns({
    dataField: "actions",
    text: "Acciones",
    formatter: (cell, row: ServicesAllFieldsFragment) => (
      <div>
        <Button className="btn-fill btn-sm" onClick={() => history.push(`/guards/${row.id}/edit`)} variant="success">
          Editar
        </Button>
        <Button
          className="btn-sm"
          variant="danger"
          onClick={() => removeGuard({ variables: { id: row.id }, refetchQueries: [{ query: GET_GUARDS }] })}
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
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">
                Lista de Guardias
                <Button className="pull-right ml-2" variant="primary" onClick={() => history.push(`/guards/create`)}>
                  {" "}
                  Agregar
                </Button>
              </Card.Title>
              <p className="cardu-category">({getGuardsQuery.data?.guards?.length || 0}) Rangos en el sistema </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              {getGuardsQuery.loading ? (
                <Spinner />
              ) : (
                <StandardTable keyField={"id"} data={getGuardsQuery.data?.guards} columns={columns} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GuardsPage;
