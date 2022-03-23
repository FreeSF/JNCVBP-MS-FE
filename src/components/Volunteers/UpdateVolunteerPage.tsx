import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo";

import { Form as IForm, FormApi } from "informed"; //Form
import { Container } from "react-bootstrap";
import Spinner from "../spinner";

import {
  EditVolunteerMutation,
  EditVolunteerMutationVariables,
  FindVolunteerQuery,
  UpdateVolunteerInput,
} from "../../types";
import { EDIT_VOLUNTEER, FIND_VOLUNTEER, GET_VOLUNTEERS } from "../../queries/volunteers";

import VolunteerForm from "./VolunteerForm";
import { volunteerDefaultValues } from "utils/constants";

const UpdateVolunteerPage = (props: RouteComponentProps<{ id: string }>) => {
  const getVolunteer = useQuery<FindVolunteerQuery>(FIND_VOLUNTEER, { variables: { id: props.match.params.id } });
  const [formRef, setFormRef] = useState<FormApi<UpdateVolunteerInput>>(null);
  const [editVolunteer, editedVolunteer] = useMutation<EditVolunteerMutation, EditVolunteerMutationVariables>(
    EDIT_VOLUNTEER
  );
  if (getVolunteer.loading) return <Spinner />;

  const handleSubmit = () => {
    editVolunteer({
      variables: {
        input: {
          ...formRef.getState().values,
          id: props.match.params.id,
        },
      },
      refetchQueries: [{ query: GET_VOLUNTEERS }],
    }).then(() => {
      props.history.push("/volunteers");
    });
  };

  const defaultValue: UpdateVolunteerInput = {
    id: undefined,
    ...volunteerDefaultValues,
  };
  const volunteer = getVolunteer?.data?.volunteer || defaultValue;
  return (
    <Container fluid>
      <IForm
        initialValues={volunteer}
        getApi={(formRef: FormApi<UpdateVolunteerInput>) => setFormRef(formRef)}
        onSubmit={handleSubmit}
      >
        {({ formApi, formState }) => <VolunteerForm volunteer={volunteer} formApi={formApi} formState={formState} />}
      </IForm>
    </Container>
  );
};

export default UpdateVolunteerPage;
