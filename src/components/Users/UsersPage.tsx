import React from "react";
import StandardTable from "../utils/standardTable";
import { ColumnDescription } from "react-bootstrap-table-next";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo";
import { GetUsersQuery, RemoveUserMutation, RemoveUserMutationVariables, ServicesAllFieldsFragment } from "../../types";
import { GET_USERS, REMOVE_USER } from "../../queries/Users";
import Spinner from "../spinner";
import { Button } from "react-bootstrap";
import { get_users_columns } from "../../utils/columns";

const UsersPage = (props) => {
  const history = useHistory();
  const getUsersQuery = useQuery<GetUsersQuery>(GET_USERS);

  const [removeUser, removedUSer] = useMutation<RemoveUserMutation, RemoveUserMutationVariables>(REMOVE_USER);

  if (getUsersQuery.loading) return <Spinner />;

  const columns: ColumnDescription<any, any>[] = get_users_columns({
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row: ServicesAllFieldsFragment) => (
      <div>
        <Button className="btn-fill btn-sm" href={`/users/${row.id}/edit`} variant="success">
          Editar
        </Button>
        <Button
          className="btn-sm"
          variant="danger"
          onClick={() => removeUser({ variables: { id: row.id }, refetchQueries: [{ query: GET_USERS }] })}
        >
          Eliminar
        </Button>
      </div>
    ),
  });

  return (
    <div>
      Usuarios
      <Button onClick={() => history.push(`/users/create`)}>Crear</Button>
      <StandardTable columns={columns} data={getUsersQuery.data.users} />
    </div>
  );
};

export default UsersPage;
