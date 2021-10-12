import React from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { useQuery, useMutation } from 'react-apollo';
import { DeleteRankMutation, DeleteRankMutationVariables, GetRanksQuery } from "../../types";
import { DELETE_RANK, GET_RANKS } from "../../queries/ranks";
import Spinner from "../spinner";

import {
  Button, Card, Col, Container, Row, Table
} from "react-bootstrap";

const RanksPage = (props: RouteComponentProps) => {

  const { loading, data } = useQuery<GetRanksQuery>(GET_RANKS);

  const [deleteClient, deletedClient] = useMutation<
    DeleteRankMutation,
    DeleteRankMutationVariables
  >(DELETE_RANK, {
    refetchQueries: [{ query: GET_RANKS }]
  });

  const handleCreate = () => props.history.push('/ranks/create')
  const handleEdit = (id: string) => props.history.push('/ranks/' + id + '/edit')
  const handleDelete = (id: string) => deleteClient({ variables: { id: id } });

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Lista de Rangos
                <Button className="pull-right ml-2" variant="primary" onClick={handleCreate}> Agregar </Button>
              </Card.Title>
              <p className="cardu-category">({data && data.ranks.length || 0}) Rangos en el sistema </p>
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
                    data && data.ranks.map(rank =>
                      <tr>
                        <td>{rank.name}</td>
                        <td>{rank.description}</td>
                        <td>
                          <Button className="btn-fill btn-sm" variant="success" onClick={() => handleEdit(rank.id)}> Editar </Button>
                          {rank.isDeletable && <Button className="btn-sm ml-2" variant="danger" onClick={() => handleDelete(rank.id)}> Eliminar </Button>}
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

export default RanksPage
