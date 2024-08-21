import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { Form as IForm, FormApi } from "informed"; //Form
import { Container } from "react-bootstrap";

import { CreateRankInput, Rank } from "../../types";
import { CREATE_RANK, GET_RANKS } from "../../queries/ranks";
import RankForm from "./RankForm";

const CreateRankPage = (props: RouteComponentProps<{ id: string }>) => {
  const [createRank, createdRank] = useMutation<{ createClient: Rank }, { input: CreateRankInput }>(CREATE_RANK);
  const [formRef, setFormRef] = useState<FormApi<Rank>>(null);

  const handleSubmit = () => {
    createRank({
      variables: {
        input: { ...formRef.getState().values },
      },
      refetchQueries: [{ query: GET_RANKS }],
    }).then((value) => {
      props.history.push("/ranks");
    });
  };

  return (
    <Container fluid>
      <IForm getApi={(formRef: FormApi<Rank>) => setFormRef(formRef)} onSubmit={handleSubmit}>
        {({ formApi, formState }) => <RankForm />}
      </IForm>
    </Container>
  );
};

export default CreateRankPage;
