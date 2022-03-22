import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo";

import { Form as IForm, FormApi } from "informed"; //Form
import { Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Spinner from "../spinner";

import {
  EditVolunteerMutation,
  EditVolunteerMutationVariables,
  FindVolunteerQuery,
  GetRanksQuery,
  UpdateVolunteerInput,
} from "../../types";
import { EDIT_VOLUNTEER, FIND_VOLUNTEER, GET_VOLUNTEERS } from "../../queries/volunteers";

import { GET_RANKS } from "../../queries/ranks";
import VolunteerForm from "./VolunteerForm";

const UpdateVolunteerPage = (props: RouteComponentProps<{ id: string }>) => {
  const getVolunteer = useQuery<FindVolunteerQuery>(FIND_VOLUNTEER, { variables: { id: props.match.params.id } });
  const getRanksQuery = useQuery<GetRanksQuery>(GET_RANKS);

  const [formRef, setFormRef] = useState<FormApi<UpdateVolunteerInput>>(null);
  const [editVolunteer, editedVolunteer] = useMutation<EditVolunteerMutation, EditVolunteerMutationVariables>(
    EDIT_VOLUNTEER
  );

  if (getVolunteer.loading || getRanksQuery.loading) return <Spinner />;

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
    name: undefined,
    code: undefined,
    status: "Active",
    blood_type: "Not Set",
    rank: { id: null },
  };
  const volunteer = getVolunteer?.data?.volunteer || defaultValue;
  const rank_options = getRanksQuery.data.ranks;

  return (
    <Container fluid>
      <IForm
        initialValues={volunteer}
        getApi={(formRef: FormApi<UpdateVolunteerInput>) => setFormRef(formRef)}
        onSubmit={handleSubmit}
      >
        {({ formApi, formState }) => (
          <VolunteerForm volunteer={volunteer} rankOptions={rank_options} formApi={formApi} formState={formState} />
        )}
      </IForm>
    </Container>
  );
};

export default UpdateVolunteerPage;
