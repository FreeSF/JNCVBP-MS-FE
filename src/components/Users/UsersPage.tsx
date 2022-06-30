import React from "react";
import StandardTable from "../utils/standardTable";
import { ColumnDescription } from "react-bootstrap-table-next";
import { useHistory } from "react-router-dom";
import { useQuery } from "react-apollo";
import { GetUsersQuery } from "../../types";
import { GET_USERS } from "../../queries/Users";
import Spinner from "../spinner";
import { Button } from "react-bootstrap";

const UsersPage = (props) => {
  const history = useHistory();
  const getUsersQuery = useQuery<GetUsersQuery>(GET_USERS);

  if (getUsersQuery.loading) return <Spinner />;

  const columns: ColumnDescription<any, any>[] = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "username",
      text: "Usuario",
    },
    {
      dataField: "firstName",
      text: "Nombre",
    },
    {
      dataField: "lastName",
      text: "Apellido",
    },
    {
      dataField: "email",
      text: "Email",
    },
  ];

  return (
    <div>
      Usuarios
      <Button onClick={() => history.push(`/users/create`)}>Crear</Button>
      <StandardTable columns={columns} data={getUsersQuery.data.users} />
    </div>
  );
};

export default UsersPage;
