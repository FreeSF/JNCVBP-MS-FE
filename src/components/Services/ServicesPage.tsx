import React, { useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo";

import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";
import { BlobProvider, Document, Page, Text, View } from "@react-pdf/renderer";

import {
  GetServicesQuery,
  RemoveServiceMutation,
  RemoveServiceMutationVariables,
  ServicesAllFieldsFragment,
  Volunteer,
} from "../../types";
import StandardTable from "../utils/standardTable";
import Spinner from "../spinner";
import { GET_SERVICES, GET_SERVICES_DISABLED, REMOVE_SERVICE } from "../../queries/services";
import SingleServiceReport from "../../reports/SingleServiceReport";
import moment from "moment";
import { DEFAULT_DATE_FORMAT, DEFAULT_DATETIME_FORMAT } from "../../utils/constants";
import { get_service_columns } from "../../utils/columns";

const ServicesPage = (props: RouteComponentProps) => {
  const getServicesQuery = useQuery<GetServicesQuery>(GET_SERVICES);
  const [renderReport, setRenderReport] = useState<string>();

  const [removeService, removedService] = useMutation<RemoveServiceMutation, RemoveServiceMutationVariables>(
    REMOVE_SERVICE,
    { refetchQueries: [{ query: GET_SERVICES }, { query: GET_SERVICES_DISABLED }] }
  );

  const handleCreate = () => props.history.push("/services/create");

  const history = useHistory();

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
        <Button className="btn-sm" variant="danger" onClick={() => removeService({ variables: { id: row.id } })}>
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
              <p className="cardu-category">
                ({getServicesQuery.data?.services?.length || 0}) Servicios en el sistema{" "}
              </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              <StandardTable keyField={"id"} data={getServicesQuery.data?.services} columns={columns} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ServicesPage;
