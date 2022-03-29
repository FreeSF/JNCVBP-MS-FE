import React, { useState } from "react";
import { Form, FormApi } from "informed";
import { useHistory } from "react-router-dom";
import _ from "lodash";

import { useMutation, useQuery } from "react-apollo";
import Spinner from "../spinner";

import {
  EditTrainingMutation,
  EditTrainingMutationVariables,
  FindTrainingQuery,
  UpdateTrainingInput,
} from "../../types";

import { EDIT_TRAINING, FIND_TRAINING, GET_TRAININGS } from "../../queries/Trainings";
import TrainingForm from "./TrainingForm";

const CreateTrainingPage = (props) => {
  const getTraining = useQuery<FindTrainingQuery>(FIND_TRAINING, { variables: { id: props.match.params.id } });
  const [formRef, setFormRef] = useState<FormApi<UpdateTrainingInput>>(null);
  const [volunteersQuantity, setVolunteersQuantity] = useState<number>(0);
  const [editTraining, editedTraining] = useMutation<EditTrainingMutation, EditTrainingMutationVariables>(
    EDIT_TRAINING,
    { refetchQueries: [{ query: GET_TRAININGS }] }
  );

  if (getTraining.loading) return <Spinner />;

  const handleSubmit = () => {
    editTraining({
      variables: {
        input: {
          ...formRef.getState().values,
          id: props.match.params.id,
        },
      },
      refetchQueries: [{ query: GET_TRAININGS }],
    }).then((value) => {
      props.history.push("/trainings");
    });
  };

  const defaultValues: UpdateTrainingInput = {
    id: props.match.params.id,
    date: new Date(),
    description: "",
    volunteers: [],
  };

  const training = getTraining?.data?.training || defaultValues;
  return (
    <Form
      initialValues={training}
      getApi={(formRef: FormApi<UpdateTrainingInput>) => setFormRef(formRef)}
      onSubmit={handleSubmit}
    >
      {({ formApi, formState }) => (
        <TrainingForm
          formApi={formApi}
          formState={formState}
          setVolunteersQuantity={setVolunteersQuantity}
          volunteersQuantity={volunteersQuantity}
        />
      )}
    </Form>
  );
};

export default CreateTrainingPage;
