import React from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DeleteDutyMutation, DeleteDutyMutationVariables, GetDutiesQuery } from "../../types";
import { DELETE_DUTY, GET_DUTIES } from "../../queries/duties";
import Spinner from "../spinner";

import {
  Button, Card, Col, Container, Row, Table
} from "react-bootstrap";

const DutiesPage = (props: RouteComponentProps) => {

  const { loading, data } = useQuery<GetDutiesQuery>(GET_DUTIES);

  const [deleteClient, deletedClient] = useMutation<
    DeleteDutyMutation,
    DeleteDutyMutationVariables
  >(DELETE_DUTY, {
    refetchQueries: [{ query: GET_DUTIES }]
  });

  const handleCreate = () => props.history.push('/duties/create')
  const handleEdit = (id: string) => props.history.push('/duties/' + id + '/edit')
  const handleDelete = (id: string) => deleteClient({ variables: { _id: id } });

  console.log(data)
  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Lista de Tipos de Servicios
                <Button className="pull-right ml-2" variant="primary" onClick={handleCreate}> Agregar </Button>
              </Card.Title>
              <p className="cardu-category">({data && data.duties.length || 0}) Servicios en el sistema </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">Nombre</th>
                    <th className="border-0">Descripción</th>
                    <th className="border-0">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? <Spinner /> : (
                    data && data.duties.map(duty =>
                      <tr>
                        <td>{duty.name}</td>
                        <td>{duty.description}</td>
                        <td>
                          <Button className="btn-fill btn-sm" variant="success" onClick={() => handleEdit(duty._id)}> Editar </Button>
                          {duty.isDeletable && <Button className="btn-sm ml-2" variant="danger" onClick={() => handleDelete(duty._id)}> Eliminar </Button>}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container >
  )
}

export default DutiesPage
