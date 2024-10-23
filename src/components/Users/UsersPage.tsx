import React, { useRef } from "react";
import { ColumnDescription } from "react-bootstrap-table-next";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { RemoveUserMutation, RemoveUserMutationVariables, ServicesAllFieldsFragment } from "../../types";
import { GET_PAGINATED_USERS, REMOVE_USER } from "../../queries/Users";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { get_users_columns } from "../../utils/columns";
import PagedTable from "../utils/PagedTable";

const UsersPage = () => {
  const history = useHistory();

  const [removeUser] = useMutation<RemoveUserMutation, RemoveUserMutationVariables>(REMOVE_USER);

  const refreshTable = useRef(() => {});

  const columns: ColumnDescription[] = get_users_columns({
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row: ServicesAllFieldsFragment) => (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <Button className="btn-fill btn-sm" href={`/users/${row.id}/edit`} variant="success">
          Editar
        </Button>
        <Button
          className="btn-sm"
          variant="danger"
          onClick={() => removeUser({ variables: { id: row.id } }).then(() => refreshTable.current())}
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
                Lista de Usuarios
                <Button className="pull-right ml-2" variant="primary" onClick={() => history.push(`/users/create`)}>
                  Agregar
                </Button>
              </Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              <PagedTable columns={columns} query={GET_PAGINATED_USERS} refreshFunction={refreshTable} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UsersPage;
