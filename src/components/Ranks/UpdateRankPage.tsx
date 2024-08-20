import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import { Form as IForm, FormApi } from "informed"; //Form
import Spinner from "../spinner";
import { Container } from "react-bootstrap";

import { EditRankMutation, EditRankMutationVariables, FindRankQuery, UpdateRankInput } from "../../types";
import { EDIT_RANK, FIND_RANK, GET_RANKS } from "../../queries/ranks";

import RankForm from "./RankForm";

const UpdateRankPage = (props: RouteComponentProps<{ id: string }>) => {
  const getRank = useQuery<FindRankQuery>(FIND_RANK, { variables: { id: props.match.params.id } });
  const [formRef, setFormRef] = useState<FormApi<UpdateRankInput>>(null);
  const [editRank, editedRank] = useMutation<EditRankMutation, EditRankMutationVariables>(EDIT_RANK);
  if (getRank.loading) return <Spinner />;

  const handleSubmit = () => {
    editRank({
      variables: {
        input: {
          ...formRef.getState().values,
          id: props.match.params.id,
        },
      },
      refetchQueries: [{ query: GET_RANKS }],
    }).then(() => {
      props.history.push("/ranks");
    });
  };

  const rank = getRank?.data?.rank;

  return (
    <Container fluid>
      <IForm
        initialValues={rank}
        getApi={(formRef: FormApi<UpdateRankInput>) => setFormRef(formRef)}
        onSubmit={handleSubmit}
      >
        {({ formApi, formState }) => <RankForm />}
      </IForm>
    </Container>
  );
};

export default UpdateRankPage;
