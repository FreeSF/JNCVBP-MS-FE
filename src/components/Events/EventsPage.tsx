import React from "react";
import { useMutation, useQuery } from "react-apollo";
import {
  GetEventsQuery,
  RemoveEventMutation,
  RemoveEventMutationVariables,
  ServicesAllFieldsFragment,
  VolunteerAllFieldsFragment,
} from "../../types";
import { GET_EVENTS, REMOVE_EVENT } from "../../queries/Events";
import Spinner from "../spinner";
import { ColumnDescription } from "react-bootstrap-table-next";
import { Button } from "react-bootstrap";
import { GET_GUARDS } from "../../queries/Guards";
import { useHistory } from "react-router-dom";
import StandardTable from "../utils/standardTable";

const EventsPage = (props) => {
  const history = useHistory();
  const getEventsQuery = useQuery<GetEventsQuery>(GET_EVENTS);
  const [removeEvent, removedEvent] = useMutation<RemoveEventMutation, RemoveEventMutationVariables>(REMOVE_EVENT);

  if (getEventsQuery.loading) return <Spinner />;

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
      dataField: undefined,
      text: "Acciones",
      formatter: (cell, row: ServicesAllFieldsFragment) => (
        <div>
          <Button className="btn-fill btn-sm" onClick={() => history.push(`/events/${row.id}/edit`)} variant="success">
            Editar
          </Button>
          <Button
            className="btn-sm"
            variant="danger"
            onClick={() => removeEvent({ variables: { id: row.id }, refetchQueries: [{ query: GET_EVENTS }] })}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Libro de Novedades</h1>
      <Button onClick={() => history.push(`/events/create`)}>Crear</Button>
      <StandardTable columns={columns} data={getEventsQuery.data.events} />
    </div>
  );
};

export default EventsPage;
