import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";

import { GET_TRAININGS, GET_TRAININGS_DISABLED, REMOVE_TRAINING } from "../../queries/Trainings";
import {
  GetTrainingsQuery,
  RemoveTrainingMutation,
  RemoveTrainingMutationVariables,
  TrainingAllFieldsFragment,
  VolunteerAllFieldsFragment,
} from "../../types";
import Spinner from "../spinner";
import { get_formatted_date, get_formatted_volunteers } from "utils/constants";
import { get_training_columns } from "utils/columns";
import StandardTable from "../utils/standardTable";

const TrainingsPage = (props) => {
  const getTrainingsQuery = useQuery<GetTrainingsQuery>(GET_TRAININGS);
  const [removeTraining, removedTraining] = useMutation<RemoveTrainingMutation, RemoveTrainingMutationVariables>(
    REMOVE_TRAINING,
    { refetchQueries: [{ query: GET_TRAININGS }, { query: GET_TRAININGS_DISABLED }] }
  );
  const history = useHistory();

  if (getTrainingsQuery.loading) return <Spinner />;

  const columns: ColumnDescription[] = get_training_columns({
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row: TrainingAllFieldsFragment) => (
      <div>
        <Button className="btn-fill btn-sm" onClick={() => history.push(`/trainings/${row.id}/edit`)} variant="success">
          Editar{" "}
        </Button>
        <Button className="btn-sm" variant="danger" onClick={() => removeTraining({ variables: { id: row.id } })}>
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
              <p className="cardu-category">
                ({getTrainingsQuery.data?.trainings?.length || 0}) Prácticas en el sistema{" "}
              </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              {getTrainingsQuery.loading ? (
                <Spinner />
              ) : (
                <StandardTable keyField={"id"} data={getTrainingsQuery.data?.trainings} columns={columns} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TrainingsPage;
