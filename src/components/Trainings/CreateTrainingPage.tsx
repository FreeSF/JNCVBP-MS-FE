import React, { useState } from "react";
import { Form, FormApi } from "informed";

import { useMutation, useQuery } from "react-apollo";
import Spinner from "../spinner";

import {
  CreateTrainingInput,
  CreateTrainingMutation,
  CreateTrainingMutationVariables,
  GetVolunteersQuery,
} from "../../types";

import { GET_VOLUNTEERS } from "../../queries/volunteers";
import { CREATE_TRAINING, GET_TRAININGS } from "../../queries/Trainings";
import TrainingForm from "./TrainingForm";

const CreateTrainingPage = (props) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateTrainingInput>>(null);
  const [volunteers, setVolunteers] = useState<[]>(() => []);
  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  const [createTraining, createdTraining] = useMutation<CreateTrainingMutation, CreateTrainingMutationVariables>(
    CREATE_TRAINING
  );

  const defaultValues: CreateTrainingInput = {
    date: new Date(),
    description: "",
    volunteers: [],
  };

  const handleSubmit = () => {
    const volunteers = formRefCreate.getState().values.volunteers.filter((x) => x);
    createTraining({
      variables: {
        input: {
          ...formRefCreate.getState().values,
          volunteers: volunteers,
        },
      },
      refetchQueries: [{ query: GET_TRAININGS }],
    }).then((value) => {
      props.history.push("/trainings");
    });
  };

  if (getVolunteersQuery.loading) return <Spinner />;

  return (
    <Form
      getApi={(formRef: FormApi<CreateTrainingInput>) => setFormRefCreate(formRef)}
      onSubmit={handleSubmit}
      initialValues={defaultValues}
    >
      {({ formApi, formState }) => (
        <TrainingForm formApi={formApi} formState={formState} volunteers={volunteers} setVolunteers={setVolunteers} />
      )}
    </Form>
  );
};

export default CreateTrainingPage;
