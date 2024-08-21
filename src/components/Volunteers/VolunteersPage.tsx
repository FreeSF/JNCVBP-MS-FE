import React from "react";
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
import { DELETE_VOLUNTEER, GET_VOLUNTEERS, GET_VOLUNTEERS_DISABLED } from "../../queries/volunteers";
import { get_blood_type, get_formatted_date, get_volunteer_status } from "utils/constants";
import Spinner from "../spinner";
import { get_volunteer_columns } from "utils/columns";
import StandardTable from "../utils/standardTable";

const VolunteersPage = (props: RouteComponentProps) => {
  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  const [deleteClient, deletedClient] = useMutation<DeleteVolunteerMutation, DeleteVolunteerMutationVariables>(
    DELETE_VOLUNTEER,
    { refetchQueries: [{ query: GET_VOLUNTEERS }, { query: GET_VOLUNTEERS_DISABLED }] }
  );
  const handleCreate = () => props.history.push("/volunteers/create");
  const handleEdit = (id: string) => props.history.push("/volunteers/" + id + "/edit");
  const handleDelete = (id: string) => deleteClient({ variables: { id: id } });

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
              <p className="cardu-category">
                ({getVolunteersQuery.data?.volunteers.length}) Voluntarios registrados en el sistema{" "}
              </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              {getVolunteersQuery.loading ? (
                <Spinner />
              ) : (
                <StandardTable columns={columns} data={getVolunteersQuery.data?.volunteers} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VolunteersPage;
