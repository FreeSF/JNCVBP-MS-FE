import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMutation, useQuery } from "react-apollo";

import { Form as IForm, FormApi } from "informed"; //Form
import { Container } from "react-bootstrap";
import Spinner from "../spinner";

import {
  CreateVolunteerInput,
  CreateVolunteerMutation,
  CreateVolunteerMutationVariables,
  GetRanksQuery,
} from "../../types";
import { CREATE_VOLUNTEER, GET_VOLUNTEERS } from "../../queries/volunteers";
import { GET_RANKS } from "../../queries/ranks";
import VolunteerForm from "./VolunteerForm";

const CreateVolunteerPage = (props: RouteComponentProps<{ id: string }>) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateVolunteerInput>>(null);
  const [createVolunteer, createdVolunteer] = useMutation<CreateVolunteerMutation, CreateVolunteerMutationVariables>(
    CREATE_VOLUNTEER
  );
  const getRanksQuery = useQuery<GetRanksQuery>(GET_RANKS);

  if (getRanksQuery.loading) return <Spinner />;

  const handleSubmit = () => {
    createVolunteer({
      variables: {
        input: formRefCreate.getState().values,
      },
      refetchQueries: [{ query: GET_VOLUNTEERS }],
    }).then((value) => {
      props.history.push("/volunteers");
    });
  };

  const defaultValue: CreateVolunteerInput = {
    name: undefined,
    code: undefined,
    status: "Active",
    blood_type: "Not Set",
    rank: { id: null },
  };
  const volunteer = defaultValue;
  const rank_options = getRanksQuery.data.ranks;

  return (
    <Container fluid>
      <IForm
        initialValues={volunteer}
        getApi={(formRef: FormApi<CreateVolunteerInput>) => setFormRefCreate(formRef)}
        onSubmit={handleSubmit}
      >
        {({ formApi, formState }) => (
          <VolunteerForm
            volunteer={volunteer}
            rankOptions={rank_options || []}
            formApi={formApi}
            formState={formState}
          />
        )}
      </IForm>
    </Container>
  );
};

export default CreateVolunteerPage;
