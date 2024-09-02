import React, { useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";

import {
  DeleteVolunteerMutation,
  DeleteVolunteerMutationVariables,
  GetVolunteersQuery,
  VolunteerAllFieldsFragment,
} from "../../types";
import { DELETE_VOLUNTEER, GET_PAGINATED_VOLUNTEERS, GET_VOLUNTEERS } from "../../queries/volunteers";
import { get_volunteer_columns } from "utils/columns";
import PagedTable from "../utils/PagedTable";

const VolunteersPage = (props: RouteComponentProps) => {
  const [removeVolunteer] = useMutation<DeleteVolunteerMutation, DeleteVolunteerMutationVariables>(DELETE_VOLUNTEER, {
    refetchQueries: [{ query: GET_VOLUNTEERS }],
  });
  const handleCreate = () => props.history.push("/volunteers/create");
  const handleEdit = (id: string) => props.history.push("/volunteers/" + id + "/edit");

  const refreshTable = useRef(() => {});
  const handleDelete = (id: string) => removeVolunteer({ variables: { id: id } }).then(() => refreshTable.current());

  const columns: ColumnDescription[] = get_volunteer_columns({
    headerStyle: () => {
      return { width: "20%" };
    },
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row: VolunteerAllFieldsFragment) => (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <Button className="btn-fill btn-sm" variant="success" onClick={() => handleEdit(row.id)}>
          Editar
        </Button>
        <Button className="btn-sm" variant="danger" onClick={() => handleDelete(row.id)}>
          {" "}
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
                Lista de Voluntarios
                <Button className="pull-right ml-2" variant="primary" onClick={handleCreate}>
                  Agregar
                </Button>
              </Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              <PagedTable columns={columns} query={GET_PAGINATED_VOLUNTEERS} refreshFunction={refreshTable} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VolunteersPage;
