import React, { useState } from "react";
import { Form, FormApi } from "informed";
import { Container } from "react-bootstrap";
// import _ from "lodash";

import { useMutation, useQuery } from "react-apollo";
import { useHistory } from "react-router-dom";

import {
  CreateCourseInput,
  CreateCourseMutation,
  CreateCourseMutationVariables,
  GetVolunteersQuery,
} from "../../types";
import { GET_VOLUNTEERS } from "../../queries/volunteers";
import { CREATE_COURSE, GET_COURSES } from "../../queries/Courses";
import CourseForm from "./CourseForm";
import Spinner from "../spinner";

const CreateCoursePage = (props) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateCourseInput>>(null);
  const [details, setDetails] = useState<[]>([]);

  const [createCourse, createdCourse] = useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CREATE_COURSE);
  const history = useHistory();

  const defaultValues: CreateCourseInput = {
    date: new Date(),
    description: "",
    details: [],
  };

  const handleSubmit = () => {
    const details = formRefCreate.getState().values?.details || [];
    createCourse({
      variables: {
        input: {
          ...formRefCreate.getState().values,
          details: details,
        },
      },
      refetchQueries: [{ query: GET_COURSES }],
    }).then((value) => {
      props.history.push("/courses");
    });
  };

  return (
    <Container fluid>
      <Form
        getApi={(formRef: FormApi<CreateCourseInput>) => setFormRefCreate(formRef)}
        onSubmit={handleSubmit}
        initialValues={defaultValues}
      >
        {({ formApi, formState }) => (
          <CourseForm formApi={formApi} formState={formState} details={details} setDetails={setDetails} />
        )}
      </Form>
    </Container>
  );
};

export default CreateCoursePage;
