import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import {
  GetServicesQuery,
  RemoveServiceMutation,
  RemoveServiceMutationVariables,
  Service,
  ServicesAllFieldsFragment,
  Volunteer,
} from "../../types";
import StandardTable from "../utils/standardTable";
import { ColumnDescription } from "react-bootstrap-table-next";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Spinner from "../spinner";
import { GET_SERVICES, REMOVE_SERVICE } from "../../queries/services";
import SingleServiceReport from "../../reports/SingleServiceReport";
import { BlobProvider, Document, Page, Text, View } from "@react-pdf/renderer";

const ServicesPage: React.FC<TheProps> = (props) => {
  const getServicesQuery = useQuery<GetServicesQuery>(GET_SERVICES);
  const [renderReport, setRenderReport] = useState<string>();

  const [removeService, removedService] = useMutation<RemoveServiceMutation, RemoveServiceMutationVariables>(
    REMOVE_SERVICE
  );

  const history = useHistory();

  if (getServicesQuery.loading) return <Spinner />;

  const columns: ColumnDescription[] = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "description",
      text: "Descripción",
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

          <BlobProvider document={<SingleServiceReport service={row} />}>
            {({ url }) => (
              <Button href={url} target="_blank" className="btn-fill btn-sm" variant="info">
                pdf
              </Button>
            )}
          </BlobProvider>
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

  return (
    <React.Fragment>
      <div>Services Page</div>
      <Button onClick={() => history.push(`/services/create`)}>Crear</Button>
      <StandardTable columns={columns} data={getServicesQuery.data.services} />
    </React.Fragment>
  );
};

interface TheProps {
  //a: string
}

export default ServicesPage;
