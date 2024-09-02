import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import moment from "moment";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import BootstrapTable, { ColumnDescription } from "react-bootstrap-table-next";

import {
  CoursesAllFieldsFragment,
  GetCoursesQuery,
  RemoveCourseMutation,
  RemoveCourseMutationVariables,
} from "../../types";
import { GET_COURSES, GET_COURSES_DISABLED, GET_PAGINATED_COURSES, REMOVE_COURSE } from "../../queries/Courses";

import Spinner from "../spinner";
import { get_course_columns } from "utils/columns";
import StandardTable from "../utils/standardTable";
import PagedTable from "../utils/PagedTable";

const CoursesPage = (props) => {
  const getCoursesQuery = useQuery<GetCoursesQuery>(GET_COURSES);
  const history = useHistory();

  const [removeCourse, removedCourse] = useMutation<RemoveCourseMutation, RemoveCourseMutationVariables>(REMOVE_COURSE);

  const refreshTable = useRef(() => {});

  if (getCoursesQuery.loading) return <Spinner />;

  const columns: ColumnDescription[] = get_course_columns({
    dataField: undefined,
    text: "Acciones",
    formatter: (cell, row: CoursesAllFieldsFragment) => (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <Button className="btn-fill btn-sm" onClick={() => history.push(`/courses/${row.id}/edit`)} variant="success">
          Editar
        </Button>
        <Button
          className="btn-sm"
          variant="danger"
          onClick={() =>
            removeCourse({
              variables: { id: row.id },
              refetchQueries: [{ query: GET_COURSES }, { query: GET_COURSES_DISABLED }],
            }).then(() => refreshTable.current())
          }
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
          <Card>
            <Card.Header>
              <Card.Title as="h4">
                Lista de Cursos
                <Button className="pull-right ml-2" variant="primary" onClick={() => history.push(`/courses/create`)}>
                  {" "}
                  Agregar
                </Button>
              </Card.Title>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive">
              <PagedTable
                keyField={"id"}
                query={GET_PAGINATED_COURSES}
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

export default CoursesPage;
