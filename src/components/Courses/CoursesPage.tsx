import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo";

import moment from "moment";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";

import {
  CoursesAllFieldsFragment,
  GetCoursesQuery,
  RemoveCourseMutation,
  RemoveCourseMutationVariables,
} from "../../types";
import { GET_COURSES, REMOVE_COURSE } from "../../queries/Courses";

import Spinner from "../spinner";
import { get_course_columns } from "utils/columns";
import StandardTable from "../utils/standardTable";

const CoursesPage = (props) => {
  const getCoursesQuery = useQuery<GetCoursesQuery>(GET_COURSES);
  const history = useHistory();

  const [removeCourse, removedCourse] = useMutation<RemoveCourseMutation, RemoveCourseMutationVariables>(REMOVE_COURSE);

  if (getCoursesQuery.loading) return <Spinner />;

  const columns: ColumnDescription[] = get_course_columns({
    dataField: "actions",
    text: "Acciones",
    formatter: (cell, row: CoursesAllFieldsFragment) => (
      <div>
        <Button className="btn-fill btn-sm" onClick={() => history.push(`/courses/${row.id}/edit`)} variant="success">
          Editar
        </Button>
        <Button
          className="btn-sm"
          variant="danger"
          onClick={() => removeCourse({ variables: { id: row.id }, refetchQueries: [{ query: GET_COURSES }] })}
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
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">
                Lista de Cursos
                <Button className="pull-right ml-2" variant="primary" onClick={() => history.push(`/courses/create`)}>
                  {" "}
                  Agregar
                </Button>
              </Card.Title>
              <p className="cardu-category">({getCoursesQuery.data?.courses?.length || 0}) Rangos en el sistema </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              {getCoursesQuery.loading ? (
                <Spinner />
              ) : (
                <StandardTable keyField={"id"} data={getCoursesQuery.data?.courses} columns={columns} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CoursesPage;
