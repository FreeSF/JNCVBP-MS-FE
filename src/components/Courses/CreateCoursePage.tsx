import React, { useState } from "react";
import { Form, FormApi, Select, Text } from "informed";
import _ from "lodash";

import { useMutation, useQuery } from "react-apollo";
import { useHistory } from "react-router-dom";

import {
  CreateCourseInput,
  CreateCourseMutation,
  CreateCourseMutationVariables,
  CreateGuardInput,
  GetVolunteersQuery,
} from "../../types";
import { GET_VOLUNTEERS } from "../../queries/volunteers";
import { CREATE_COURSE, GET_COURSES } from "../../queries/Courses";
import Spinner from "../spinner";

import CourseForm from "./CourseForm";

const CreateCoursePage = (props) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateCourseInput>>(null);
  const [volunteersQuantity, setVolunteersQuantity] = useState<number>(0);
  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  const [createCourse, createdCourse] = useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CREATE_COURSE);
  const history = useHistory();

  const defaultValues: CreateCourseInput = {
    date: new Date(),
    description: "",
    details: [],
  };

  if (getVolunteersQuery.loading) return <Spinner />;

  const handleSubmit = () => {
    console.log({ values: formRefCreate.getState().values });
    createCourse({
      variables: {
        input: formRefCreate.getState().values,
      },
      refetchQueries: [{ query: GET_COURSES }],
    }).then((value) => {
      props.history.push("/courses");
    });
  };

  return (
    <Form
      getApi={(formRef: FormApi<CreateCourseInput>) => setFormRefCreate(formRef)}
      onSubmit={handleSubmit}
      initialValues={defaultValues}
    >
      {({ formApi, formState }) => (
        <div>
          <CourseForm
            formApi={formApi}
            formState={formState}
            setVolunteersQuantity={setVolunteersQuantity}
            volunteersQuantity={volunteersQuantity}
          />
        </div>
      )}
    </Form>
  );
};

export default CreateCoursePage;
