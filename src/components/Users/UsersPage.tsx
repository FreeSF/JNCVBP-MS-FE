import React from "react";
import StandardTable from "../utils/standardTable";
import { ColumnDescription } from "react-bootstrap-table-next";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GetUsersQuery, RemoveUserMutation, RemoveUserMutationVariables, ServicesAllFieldsFragment } from "../../types";
import { GET_PAGINATED_USERS, GET_USERS, GET_USERS_DISABLED, REMOVE_USER } from "../../queries/Users";
import Spinner from "../spinner";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { get_users_columns } from "../../utils/columns";
import PagedTable from "../utils/PagedTable";

const UsersPage = (props) => {
  const history = useHistory();
  const getUsersQuery = useQuery<GetUsersQuery>(GET_USERS);

  const [removeUser, removedUSer] = useMutation<RemoveUserMutation, RemoveUserMutationVariables>(REMOVE_USER, {
    refetchQueries: [{ query: GET_USERS }, { query: GET_USERS_DISABLED }],
  });

  if (getUsersQuery.loading) return <Spinner />;

  const columns: ColumnDescription<any, any>[] = get_users_columns({
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row: ServicesAllFieldsFragment) => (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <Button className="btn-fill btn-sm" href={`/users/${row.id}/edit`} variant="success">
          Editar
        </Button>
        <Button className="btn-sm" variant="danger" onClick={() => removeUser({ variables: { id: row.id } })}>
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
                Lista de Usuarios
                <Button className="pull-right ml-2" variant="primary" onClick={() => history.push(`/users/create`)}>
                  Agregar
                </Button>
              </Card.Title>
              <p className="cardu-category">({getUsersQuery.data?.users.length}) Usuarios registrados en el sistema </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              <PagedTable columns={columns} query={GET_PAGINATED_USERS} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UsersPage;
