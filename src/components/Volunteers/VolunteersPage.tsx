import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo";

import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";

import {
  DeleteVolunteerMutation,
  DeleteVolunteerMutationVariables,
  GetVolunteersQuery,
  VolunteerAllFieldsFragment,
} from "../../types";
import { DELETE_VOLUNTEER, GET_VOLUNTEERS } from "../../queries/volunteers";
import { get_blood_type, get_formatted_date, get_volunteer_status } from "utils/constants";
import Spinner from "../spinner";

const VolunteersPage = (props: RouteComponentProps) => {
  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  const [deleteClient, deletedClient] = useMutation<DeleteVolunteerMutation, DeleteVolunteerMutationVariables>(
    DELETE_VOLUNTEER,
    { refetchQueries: [{ query: GET_VOLUNTEERS }] }
  );
  const handleCreate = () => props.history.push("/volunteers/create");
  const handleEdit = (id: string) => props.history.push("/volunteers/" + id + "/edit");
  const handleDelete = (id: string) => deleteClient({ variables: { id: id } });

  const columns: ColumnDescription[] = [
    { dataField: "code", text: "Código" },
    { dataField: "name", text: "Nombre" },
    {
      dataField: "status",
      text: "Estado",
      formatter: (cell, row: VolunteerAllFieldsFragment) => get_volunteer_status(row.status),
    },
    {
      dataField: "blood_type",
      text: "Grupo Sanguíneo",
      formatter: (cell, row: VolunteerAllFieldsFragment) => get_blood_type(row.blood_type),
    },
    { dataField: "rank.name", text: "Rango" },
    {
      dataField: "incorporation_date",
      text: "Fecha de Reclutamiento",
      formatter: (cell, row: VolunteerAllFieldsFragment) => get_formatted_date(row.incorporation_date),
    },

    {
      headerStyle: () => {
        return { width: "20%" };
      },
      dataField: "actions",
      text: "Acciones",
      formatter: (cell, row: VolunteerAllFieldsFragment) => (
        <div>
          <Button className="btn-fill btn-sm" variant="success" onClick={() => handleEdit(row.id)}>
            Editar
          </Button>
          <Button className="btn-sm ml-2" variant="danger" onClick={() => handleDelete(row.id)}>
            {" "}
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
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
                <BootstrapTable keyField={"id"} data={getVolunteersQuery.data?.volunteers} columns={columns} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VolunteersPage;
