import React, { useRef, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";

import {
  GetServicesQuery,
  RemoveServiceMutation,
  RemoveServiceMutationVariables,
  ServicesAllFieldsFragment,
  Volunteer,
} from "../../types";
import Spinner from "../spinner";
import { GET_PAGINATED_SERVICES, GET_SERVICES, GET_SERVICES_DISABLED, REMOVE_SERVICE } from "../../queries/services";
import { get_service_columns } from "../../utils/columns";
import PagedTable from "../utils/PagedTable";

const ServicesPage = (props: RouteComponentProps) => {
  const getServicesQuery = useQuery<GetServicesQuery>(GET_SERVICES);
  const [renderReport, setRenderReport] = useState<string>();

  const [removeService, removedService] = useMutation<RemoveServiceMutation, RemoveServiceMutationVariables>(
    REMOVE_SERVICE,
    { refetchQueries: [{ query: GET_SERVICES }, { query: GET_SERVICES_DISABLED }] }
  );

  const handleCreate = () => props.history.push("/services/create");

  const history = useHistory();

  const refreshTable = useRef(() => {});

  if (getServicesQuery.loading) return <Spinner />;

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
  if (getServicesQuery.loading) return <Spinner />;

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
