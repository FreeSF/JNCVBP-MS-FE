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
import { GET_SERVICES, REMOVE_SERVICE } from "../../queries/services";
import SingleServiceReport from "../../reports/SingleServiceReport";
import moment from "moment";
import { DEFAULT_DATE_FORMAT, DEFAULT_DATETIME_FORMAT } from "../../utils/constants";

const ServicesPage = (props: RouteComponentProps) => {
  const getServicesQuery = useQuery<GetServicesQuery>(GET_SERVICES);
  const [renderReport, setRenderReport] = useState<string>();

  const [removeService, removedService] = useMutation<RemoveServiceMutation, RemoveServiceMutationVariables>(
    REMOVE_SERVICE
  );

  const handleCreate = () => props.history.push("/services/create");

  const history = useHistory();

  if (getServicesQuery.loading) return <Spinner />;

  const columns: ColumnDescription[] = [
    {
      dataField: "date",
      text: "Fecha",
      formatter: (cell, row) => moment(cell).format(DEFAULT_DATETIME_FORMAT),
      searchable: false,
    },
    {
      dataField: "officer_in_charge.name",
      text: "Oficial",
    },
    {
      dataField: "locality",
      text: "Localidad",
    },
    {
      dataField: "sub_type.code",
      text: "Código",
    },
    {
      dataField: "sub_type.name",
      text: "Sub Tipo",
    },
    {
      dataField: "volunteers",
      text: "Voluntarios",
      formatter: (cell: Volunteer[]) => cell.map((volunteer) => volunteer.name).join(","),
    },
    {
      dataField: undefined,
      text: "Acciones",
      formatter: (cell, row: ServicesAllFieldsFragment) => (
        <div>
          <Button className="btn-fill btn-sm" href={`/services/${row.id}`} variant="info">
            Ver
          </Button>
          <Button className="btn-fill btn-sm" href={`/services/${row.id}/edit`} variant="success">
            Editar
          </Button>
          <Button
            className="btn-sm"
            variant="danger"
            onClick={() => removeService({ variables: { id: row.id }, refetchQueries: [{ query: GET_SERVICES }] })}
          >
            Eliminar
          </Button>
        </div>
      ),
    },
  ];
  if (getServicesQuery.loading) return <Spinner />;

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">
                Lista de Servicios
                <Button className="pull-right ml-2" variant="primary" onClick={handleCreate}>
                  Agregar
                </Button>
              </Card.Title>
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
