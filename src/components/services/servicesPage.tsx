import React from "react";
import {useQuery} from "react-apollo";
import {GET_SERVICES} from "../../queries/services";
import {GetServicesQuery, Volunteer} from "../../types";
import StandardTable from "../utils/standardTable";
import {ColumnDescription} from "react-bootstrap-table-next";
import {Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Spinner from "../spinner";

const ServicesPage: React.FC<TheProps> = props => {

  const { loading, data } = useQuery<GetServicesQuery>(GET_SERVICES);

  const history = useHistory();

  if(loading)
    return <Spinner />;

  return (
    <React.Fragment>
      <div>Services Page</div>
      <Button onClick={() => history.push(`/services/create`)}>Crear</Button>
      <StandardTable
        columns={columns}
        data={data.services}
      />
    </React.Fragment>
  )
}

interface TheProps {
  //a: string
}

const columns: ColumnDescription[] = [
  {
    dataField: 'id',
    text: 'ID'
  },
  {
    dataField: 'description',
    text: 'Descripción'
  },
  {
    dataField: 'volunteers',
    text: 'Voluntarios',
    formatter: (cell: Volunteer[]) => cell.map(volunteer => volunteer.name).join(',')
  },
  {
    dataField: undefined,
    text: 'Acciones',
    formatter: (cell, row) => (
      <div>
        <Button className="btn-fill btn-sm" href={`/services/${row.id}`} variant="success">Ver</Button>
        <Button className="btn-sm" variant="danger">Eliminar</Button>
      </div>
    )
  }
]

export default ServicesPage;
