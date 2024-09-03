import React, { useEffect, useRef } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ColumnDescription } from "react-bootstrap-table-next";

import { RemoveServiceMutation, RemoveServiceMutationVariables, ServicesAllFieldsFragment } from "../../types";
import { GET_PAGINATED_SERVICES, REMOVE_SERVICE } from "../../queries/services";
import { get_service_columns } from "../../utils/columns";
import PagedTable from "../utils/PagedTable";

const ServicesPage = (props: RouteComponentProps) => {
  const [removeService] = useMutation<RemoveServiceMutation, RemoveServiceMutationVariables>(REMOVE_SERVICE);

  const handleCreate = () => props.history.push("/services/create");

  useEffect(() => {
    refreshTable.current();
  }, []);

  const refreshTable = useRef(() => {});

  const columns: ColumnDescription[] = get_service_columns({
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row: ServicesAllFieldsFragment) => (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <Button className="btn-fill btn-sm" href={`/services/${row.id}`} variant="info">
          Ver
        </Button>
        <Button className="btn-fill btn-sm" href={`/services/${row.id}/edit`} variant="success">
          Editar
        </Button>
        <Button
          className="btn-sm"
          variant="danger"
          onClick={() => removeService({ variables: { id: row.id } }).then(() => refreshTable.current())}
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
                Lista de Servicios
                <Button className="pull-right ml-2" variant="primary" onClick={handleCreate}>
                  Agregar
                </Button>
              </Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              <PagedTable
                keyField={"id"}
                query={GET_PAGINATED_SERVICES}
                columns={columns}
                refreshFunction={refreshTable}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ServicesPage;
