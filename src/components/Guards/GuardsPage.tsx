import React from "react";
import StandardTable from "../utils/standardTable";
import { useMutation, useQuery } from "react-apollo";
import {
  GetGuardsQuery,
  RemoveGuardMutation,
  RemoveGuardMutationVariables,
  ServicesAllFieldsFragment,
  VolunteerAllFieldsFragment,
} from "../../types";
import { GET_GUARDS, REMOVE_GUARD } from "../../queries/Guards";
import Spinner from "../spinner";
import { ColumnDescription } from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const GuardsPage = (props) => {
  const getGuardsQuery = useQuery<GetGuardsQuery>(GET_GUARDS);
  const history = useHistory();

  const [removeGuard, removedService] = useMutation<RemoveGuardMutation, RemoveGuardMutationVariables>(REMOVE_GUARD);

  if (getGuardsQuery.loading) return <Spinner />;

  const columns: ColumnDescription[] = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "start_time",
      text: "Inicio",
    },
    {
      dataField: "end_time",
      text: "Fin",
    },
    {
      dataField: "volunteers",
      text: "Voluntarios",
      formatter: (cell: VolunteerAllFieldsFragment[]) => cell.map((volunteer) => volunteer.name).join(","),
    },
    {
      dataField: undefined,
      text: "Acciones",
      formatter: (cell, row: ServicesAllFieldsFragment) => (
        <div>
          <Button className="btn-fill btn-sm" onClick={() => history.push(`/guards/${row.id}`)} variant="info">
            Ver
          </Button>
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
    },
  ];

  return (
    <div>
      <h1>Guards Page</h1>
      <Button onClick={() => history.push(`/guards/create`)}>Crear</Button>
      <StandardTable columns={columns} data={getGuardsQuery.data.guards} />
    </div>
  );
};

export default GuardsPage;
