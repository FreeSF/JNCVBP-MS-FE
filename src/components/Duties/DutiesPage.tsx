import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";

import { DeleteDutyMutation, DeleteDutyMutationVariables, DutyAllFieldsFragment, GetDutiesQuery } from "../../types";
import { DELETE_DUTY, GET_DUTIES } from "../../queries/duties";
import Spinner from "../spinner";
import { get_course_columns } from "utils/columns";

const DutiesPage = (props: RouteComponentProps) => {
  const getDutiesQuery = useQuery<GetDutiesQuery>(GET_DUTIES);
  const [deleteClient, deletedClient] = useMutation<DeleteDutyMutation, DeleteDutyMutationVariables>(DELETE_DUTY, {
    refetchQueries: [{ query: GET_DUTIES }],
  });
  const handleCreate = () => props.history.push("/duties/create");
  const handleEdit = (id: string) => props.history.push("/duties/" + id + "/edit");
  const handleDelete = (id: string) => deleteClient({ variables: { id: id } });

  const columns: ColumnDescription[] = get_course_columns({
    headerStyle: () => {
      return { width: "15%" };
    },
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row: DutyAllFieldsFragment) => (
      <div>
        <Button className="btn-fill btn-sm" variant="success" onClick={() => handleEdit(row.id)}>
          {" "}
          Editar{" "}
        </Button>
        {row.isDeletable && (
          <Button className="btn-sm ml-2" variant="danger" onClick={() => handleDelete(row.id)}>
            {" "}
            Eliminar{" "}
          </Button>
        )}
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
                Lista de Tipos de Servicios
                <Button className="pull-right ml-2" variant="primary" onClick={handleCreate}>
                  {" "}
                  Agregar{" "}
                </Button>
              </Card.Title>
              <p className="cardu-category">({getDutiesQuery.data?.duties?.length || 0}) Servicios en el sistema </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              {getDutiesQuery.loading ? (
                <Spinner />
              ) : (
                <BootstrapTable keyField={"id"} data={getDutiesQuery.data?.duties} columns={columns} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DutiesPage;
