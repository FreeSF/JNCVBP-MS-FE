import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ColumnDescription } from "react-bootstrap-table-next";

import { GET_PAGINATED_TRAININGS, REMOVE_TRAINING } from "../../queries/Trainings";
import { RemoveTrainingMutation, RemoveTrainingMutationVariables, TrainingAllFieldsFragment } from "../../types";
import { get_training_columns } from "utils/columns";
import PagedTable from "../utils/PagedTable";

const TrainingsPage = () => {
  const [removeTraining] = useMutation<RemoveTrainingMutation, RemoveTrainingMutationVariables>(REMOVE_TRAINING);
  const history = useHistory();

  const refreshTable = useRef(() => {});

  useEffect(() => {
    refreshTable.current();
  }, []);

  const columns: ColumnDescription[] = get_training_columns({
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row: TrainingAllFieldsFragment) => (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <Button className="btn-fill btn-sm" onClick={() => history.push(`/trainings/${row.id}/edit`)} variant="success">
          Editar{" "}
        </Button>
        <Button
          className="btn-sm"
          variant="danger"
          onClick={() => removeTraining({ variables: { id: row.id } }).then(() => refreshTable.current())}
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
                Lista de Prácticas
                <Button className="pull-right ml-2" variant="primary" onClick={() => history.push(`/trainings/create`)}>
                  {" "}
                  Agregar
                </Button>
              </Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              <PagedTable
                keyField={"id"}
                query={GET_PAGINATED_TRAININGS}
                columns={columns}
                refreshFunction={refreshTable}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TrainingsPage;
