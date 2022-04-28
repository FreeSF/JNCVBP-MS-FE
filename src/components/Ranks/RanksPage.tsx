import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery, useMutation } from "react-apollo";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";

import { DeleteRankMutation, DeleteRankMutationVariables, GetRanksQuery, RankAllFieldsFragment } from "../../types";
import { DELETE_RANK, GET_RANKS } from "../../queries/ranks";
import Spinner from "../spinner";
import { get_rank_columns } from "utils/columns";

const RanksPage = (props: RouteComponentProps) => {
  const getRanksQuery = useQuery<GetRanksQuery>(GET_RANKS);
  const [deleteClient, deletedClient] = useMutation<DeleteRankMutation, DeleteRankMutationVariables>(DELETE_RANK, {
    refetchQueries: [{ query: GET_RANKS }],
  });
  const handleCreate = () => props.history.push("/ranks/create");
  const handleEdit = (id: string) => props.history.push("/ranks/" + id + "/edit");
  const handleDelete = (id: string) => deleteClient({ variables: { id: id } });

  const columns: ColumnDescription[] = get_rank_columns({
    headerStyle: () => {
      return { width: "15%" };
    },
    dataField: "",
    text: "Acciones",
    formatter: (cell, row: RankAllFieldsFragment) => (
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
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">
                Lista de Rangos
                <Button className="pull-right ml-2" variant="primary" onClick={handleCreate}>
                  Agregar
                </Button>
              </Card.Title>
              <p className="cardu-category">({getRanksQuery.data?.ranks?.length || 0}) Rangos en el sistema </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              {getRanksQuery.loading ? (
                <Spinner />
              ) : (
                <BootstrapTable keyField={"id"} data={getRanksQuery.data?.ranks} columns={columns} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RanksPage;
