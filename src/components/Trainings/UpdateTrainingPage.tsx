import React, { useEffect, useState } from "react";
import { Form, FormApi } from "informed";
import _ from "lodash";

import { useMutation, useLazyQuery } from "react-apollo";
import {
  EditTrainingMutation,
  EditTrainingMutationVariables,
  FindTrainingQuery,
  FindTrainingQueryVariables,
  UpdateTrainingInput,
} from "../../types";
import { EDIT_TRAINING, FIND_TRAINING, GET_TRAININGS } from "../../queries/Trainings";

import TrainingForm from "./TrainingForm";
import Spinner from "../spinner";

const CreateTrainingPage = (props) => {
  const [loadTraining, loadResult] = useLazyQuery<FindTrainingQuery, FindTrainingQueryVariables>(FIND_TRAINING, {
    onCompleted: (data) => {
      const volunteers = data.training?.volunteers.map((volunteer) => ({ _id: volunteer.id }));
      setVolunteers(volunteers);
    },
  });

  const [formRef, setFormRef] = useState<FormApi<UpdateTrainingInput>>(null);
  const [volunteers, setVolunteers] = useState<any>([]);
  const [updateTraining, editedTraining] = useMutation<EditTrainingMutation, EditTrainingMutationVariables>(
    EDIT_TRAINING,
    { refetchQueries: [{ query: GET_TRAININGS }] }
  );

  useEffect(() => {
    loadTraining({ variables: { id: props.match.params.id } });
  }, []);

  if (loadResult.loading) return <Spinner />;

  const handleSubmit = () => {
    const volunteers = formRef.getState().values.volunteers?.filter((x) => x) || [];
    updateTraining({
      variables: {
        input: {
          ...formRef.getState().values,
          volunteers: volunteers,
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

  const training = loadResult?.data?.training || defaultValues;
  return (
    <Form
      initialValues={training}
      getApi={(formRef: FormApi<UpdateTrainingInput>) => setFormRef(formRef)}
      onSubmit={handleSubmit}
    >
      {({ formApi, formState }) => (
        <TrainingForm formApi={formApi} formState={formState} volunteers={volunteers} setVolunteers={setVolunteers} />
      )}
    </Form>
  );
};

export default CreateTrainingPage;
