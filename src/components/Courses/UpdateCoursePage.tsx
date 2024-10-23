import React, { useEffect, useState } from "react";
import { Form, FormApi } from "informed";

import { useMutation, useLazyQuery } from "@apollo/client";

import {
  EditCourseMutation,
  FindCourseQuery,
  UpdateCourseInput,
  EditCourseMutationVariables,
  FindCourseQueryVariables,
} from "../../types";
import { EDIT_COURSE, FIND_COURSE } from "../../queries/Courses";
import Spinner from "../spinner";

import CourseForm from "./CourseForm";

const UpdateCoursePage = (props) => {
  const [loadCourse, loadResult] = useLazyQuery<FindCourseQuery, FindCourseQueryVariables>(FIND_COURSE, {
    onCompleted: (data) => {
      const details = data.course?.details.map((detail) => ({
        volunteer: { _id: detail.volunteer.id },
        score: detail.score,
      }));
      setDetails(details);
    },
  });

  const [formRef, setFormRef] = useState<FormApi<UpdateCourseInput>>(null);
  const [details, setDetails] = useState<any>();
  const [updateCourse] = useMutation<EditCourseMutation, EditCourseMutationVariables>(EDIT_COURSE);

  useEffect(() => {
    loadCourse({ variables: { id: props.match.params.id } });
  }, []);

  if (loadResult.loading) return <Spinner />;

  const handleSubmit = () => {
    const details = formRef.getState().values.details?.filter((x) => x) || [];
    updateCourse({
      variables: {
        input: {
          ...formRef.getState().values,
          details: details,
          id: props.match.params.id,
        },
      },
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

  const course = loadResult?.data?.course || defaultValues;

  return (
    <Form
      getApi={(formRef: FormApi<UpdateCourseInput>) => setFormRef(formRef)}
      onSubmit={handleSubmit}
      initialValues={course}
    >
      {({ formApi, formState }) => (
        <CourseForm formApi={formApi} formState={formState} details={details} setDetails={setDetails} />
      )}
    </Form>
  );
};

export default UpdateCoursePage;
