import React, { useState } from "react";
import { Form, FormApi } from "informed";
import _ from "lodash";

import { useMutation, useQuery } from "react-apollo";
import { useHistory } from "react-router-dom";

import {
  CreateCourseInput,
  EditCourseMutation,
  FindCourseQuery,
  GetVolunteersQuery,
  UpdateCourseInput,
  EditCourseMutationVariables,
} from "../../types";
import { GET_VOLUNTEERS } from "../../queries/volunteers";
import { CREATE_COURSE, FIND_COURSE, GET_COURSES } from "../../queries/Courses";
import Spinner from "../spinner";

import CourseForm from "./CourseForm";

const CreateCoursePage = (props) => {
  const getCourse = useQuery<FindCourseQuery>(FIND_COURSE, { variables: { id: props.match.params.id } });
  const [formRef, setFormRef] = useState<FormApi<UpdateCourseInput>>(null);
  const [volunteersQuantity, setVolunteersQuantity] = useState<number>(0);
  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  const [editCourse, editedCourse] = useMutation<EditCourseMutation, EditCourseMutationVariables>(CREATE_COURSE);
  const history = useHistory();

  if (getVolunteersQuery.loading) return <Spinner />;

  const handleSubmit = () => {
    console.log({ values: formRef.getState().values });
    editCourse({
      variables: {
        input: {
          ...formRef.getState().values,
          id: props.match.params.id,
        },
      },
      refetchQueries: [{ query: GET_COURSES }],
    }).then((value) => {
      props.history.push("/courses");
    });
  };

  const defaultValues: UpdateCourseInput = {
    id: props.match.params.id,
    date: new Date(),
    description: "",
    details: [],
  };

  const course = getCourse?.data?.course || defaultValues;

  return (
    <Form
      getApi={(formRef: FormApi<UpdateCourseInput>) => setFormRef(formRef)}
      onSubmit={handleSubmit}
      initialValues={course}
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
