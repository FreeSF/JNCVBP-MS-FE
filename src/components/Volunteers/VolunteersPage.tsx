import React from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { useQuery, useMutation } from 'react-apollo';
import { DeleteVolunteerMutation, DeleteVolunteerMutationVariables, GetVolunteersQuery } from "../../types";
import { DELETE_VOLUNTEER, GET_VOLUNTEERS } from "../../queries/volunteers";
import Spinner from "../spinner";
import { gql } from "apollo-boost";

import {
  Button, Card, Col, Container, Row, Table
} from "react-bootstrap";

const fieldsFragmeent = gql`
    fragment volunteerfields on Volunteer {
        id, name, __typename
    }
`;

const getVolunteeers = gql`
    query getVolunteeers {
    volunteers {
    ...volunteerfields
    }
    }
    ${fieldsFragmeent}
`;

const VolunteersPage = (props: RouteComponentProps) => {

  const { loading, data } = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);

  const [deleteClient, deletedClient] = useMutation<
    DeleteVolunteerMutation,
    DeleteVolunteerMutationVariables
  >(DELETE_VOLUNTEER, {
    refetchQueries: [{ query: GET_VOLUNTEERS }]
  });

  const handleCreate = () => props.history.push('/volunteers/create')
  const handleEdit = (id: string) => props.history.push('/volunteers/' + id + '/edit')
  // const handleShow = (id: string) => props.history.push('/volunteers/' + id)
  const handleDelete = (id: string) => deleteClient({ variables: { id: id } });

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Lista de Voluntarios
                <Button className="pull-right ml-2" variant="primary" onClick={handleCreate}> Agregar </Button>
              </Card.Title>
              {/*<p className="cardu-category">({data && data.volunteers.length}) Voluntarios registrados en el
                sistema </p>*/}
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Nombre</th>
                    <th className="border-0">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? <Spinner /> : (
                    data && data.volunteers.map(volunteer =>
                      <tr key={volunteer.id}>
                        <td>{volunteer.id}</td>
                        <td>{volunteer.name}</td>
                        <td>
                          <Button className="btn-fill btn-sm" variant="success" onClick={() => handleEdit(volunteer.id)}> Editar </Button>
                          {/* <Button className="btn-fill btn-sm ml-2" variant="info" onClick={() => handleShow(volunteer._id)}> Ver </Button> */}
                          <Button className="btn-sm ml-2" variant="danger" onClick={() => handleDelete(volunteer.id)}> Eliminar </Button>
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

export default VolunteersPage
