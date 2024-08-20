import React from "react";
import { useQuery } from "@apollo/client";
import { FindCourseQuery, FindServiceQuery } from "../../types";
import { FIND_COURSE } from "../../queries/Courses";
import Spinner from "../spinner";
import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "../../utils/constants";
import { Button } from "react-bootstrap";

const ShowCoursePage = (props) => {
  const query = useQuery<FindCourseQuery>(FIND_COURSE, { variables: { id: props.match.params.id } });

  if (query.loading) return <Spinner />;

  const course = query.data.course;

  return (
    <div>
      <h1>Curso</h1>
      <label>Descripción:</label>
      {course.description}
      <br />
      <label>Fecha:</label>
      {query.data.course.date ? moment(query.data.course.date).format(DEFAULT_DATE_FORMAT) : ""}
      <br />
      <label>Notas</label>
      <br />
      {query.data.course.details.map((detail) => (
        <React.Fragment key={detail.volunteer?.id}>
          <label>{detail.volunteer?.name}:</label>
          {detail.score}
          <br />
        </React.Fragment>
      ))}
      <Button href={"/courses"}>Volver</Button>
    </div>
  );
};

export default ShowCoursePage;
