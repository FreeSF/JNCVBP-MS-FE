import React from "react";
import { useMutation, useQuery } from "react-apollo";
import {
  CoursesAllFieldsFragment,
  GetCoursesQuery,
  GetTrainingsQuery,
  RemoveCourseMutation,
  RemoveCourseMutationVariables,
  ServicesAllFieldsFragment,
  VolunteerAllFieldsFragment,
} from "../../types";
import { useHistory } from "react-router-dom";
import { GET_COURSES, REMOVE_COURSE } from "../../queries/Courses";
import { GET_TRAININGS, REMOVE_TRAINING } from "../../queries/Trainings";
import Spinner from "../spinner";
import { Button } from "react-bootstrap";
import StandardTable from "../utils/standardTable";
import { ColumnDescription } from "react-bootstrap-table-next";
import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "../../utils/constants";

const CoursesPage = (props) => {
  const getCoursesQuery = useQuery<GetCoursesQuery>(GET_COURSES);
  const history = useHistory();

  const [removeCourse, removedCourse] = useMutation<RemoveCourseMutation, RemoveCourseMutationVariables>(REMOVE_COURSE);

  if (getCoursesQuery.loading) return <Spinner />;

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
      dataField: "date",
      text: "Fecha",
      formatter: (cell, row) => (cell ? moment(cell).format(DEFAULT_DATE_FORMAT) : ""),
    },
    {
      dataField: undefined,
      text: "Acciones",
      formatter: (cell, row: CoursesAllFieldsFragment) => (
        <div>
          <Button className="btn-fill btn-sm" onClick={() => history.push(`/courses/${row.id}`)} variant="info">
            Ver
          </Button>
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
    },
  ];

  return (
    <div>
      <h1>Cursos</h1>
      <Button onClick={() => history.push(`/courses/create`)}>Crear</Button>
      <StandardTable columns={columns} data={getCoursesQuery.data.courses} />
    </div>
  );
};

export default CoursesPage;
