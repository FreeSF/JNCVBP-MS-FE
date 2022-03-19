import React from "react";
import { GET_TRAININGS, REMOVE_TRAINING } from "../../queries/Trainings";
import {
  GetTrainingsQuery,
  RemoveGuardMutation,
  RemoveGuardMutationVariables,
  RemoveTrainingMutation,
  RemoveTrainingMutationVariables,
  ServicesAllFieldsFragment,
  TrainingAllFieldsFragment,
  VolunteerAllFieldsFragment,
} from "../../types";
import { useMutation, useQuery } from "react-apollo";
import Spinner from "../spinner";
import { ColumnDescription } from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import { GET_GUARDS, REMOVE_GUARD } from "../../queries/Guards";
import { useHistory } from "react-router-dom";
import StandardTable from "../utils/standardTable";

const TrainingsPage = (props) => {
  const getTrainingsQuery = useQuery<GetTrainingsQuery>(GET_TRAININGS);
  const history = useHistory();

  const [removeTraining, removedTraining] = useMutation<RemoveTrainingMutation, RemoveTrainingMutationVariables>(
    REMOVE_TRAINING
  );

  if (getTrainingsQuery.loading) return <Spinner />;

  const columns: ColumnDescription[] = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "description",
      text: "Descripción",
    },
    {
      dataField: "date",
      text: "Fecha",
    },
    {
      dataField: "volunteers",
      text: "Voluntarios",
      formatter: (cell: VolunteerAllFieldsFragment[]) => cell.map((volunteer) => volunteer.name).join(","),
    },
    {
      dataField: undefined,
      text: "Acciones",
      formatter: (cell, row: TrainingAllFieldsFragment) => (
        <div>
          <Button className="btn-fill btn-sm" onClick={() => history.push(`/trainings/${row.id}`)} variant="info">
            Ver
          </Button>
          <Button
            className="btn-fill btn-sm"
            onClick={() => history.push(`/trainings/${row.id}/edit`)}
            variant="success"
          >
            Editar
          </Button>
          <Button
            className="btn-sm"
            variant="danger"
            onClick={() => removeTraining({ variables: { id: row.id }, refetchQueries: [{ query: GET_TRAININGS }] })}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Prácticas</h1>
      <Button onClick={() => history.push(`/trainings/create`)}>Crear</Button>
      <StandardTable columns={columns} data={getTrainingsQuery.data.trainings} />
    </div>
  );
};

export default TrainingsPage;
