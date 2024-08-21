import React, { useEffect, useRef, useState } from "react";
import { Form, FormApi, Text, Select } from "informed";
import { RouteComponentProps } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CreateServiceInput, CreateServiceMutation, CreateServiceMutationVariables } from "../../types";
import { CREATE_SERVICE, EDIT_SERVICE, FIND_SERVICE, GET_SERVICES } from "../../queries/services";
import ServiceForm from "./ServiceForm";
import { CODES } from "utils/constants";

const CreateServicePage: React.FC<TheProps> = (props) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateServiceInput>>(null);

  const [createService, createdService] = useMutation<CreateServiceMutation, CreateServiceMutationVariables>(
    CREATE_SERVICE
  );

  // Example of how to do it without informed
  const defaultValues: CreateServiceInput = {
    // Default
    sub_type: undefined,
    type: "10.41",
    officer_in_charge: undefined,
    date: new Date(),
    call_time: "00:00",
    departure_time: "01:00",
    arrival_time: "02:00",
    withdrawal_time: "02:01",
    neighborhood: "",
    locality: "",
    address: "",
    place: "",
    alerted_by: "",
    phone: "+595",
    received_by: "",
    crew: "",
    description: "",
    volunteers: [],

    // Fire
    fire_type_description: "",
    fire_type_total_surface: "",
    fire_type_burned_surface: "",
    affected_owner: "",
    affected_owner_description: "",
    possible_cause: undefined,
    possible_cause_other_description: "",
    magnitude: "",
    damage: "",
    vehicles_used: "",
    other_units: "",
    other_occurrences: "",
    fire_class: undefined,
    police_force_in_charge: "",
    judge_in_charge: "",
    resources_used: undefined,

    // Accident
    damage1041: undefined,
    quantities1044: undefined,
    involved_elements: undefined,
    magnitude1041: undefined,

    // Rescue
    rescue_type: undefined,
  };

  const handleSubmit = (formStateValues) => {
    createService({
      variables: {
        input: formRefCreate.getState().values,
      },
      refetchQueries: [{ query: GET_SERVICES }],
    }).then((value) => {
      props.history.push("/services");
    });
  };

  return (
    <Form
      getApi={(formRef: FormApi<CreateServiceInput>) => setFormRefCreate(formRef)}
      onSubmit={handleSubmit}
      initialValues={defaultValues}
    >
      {({ formApi, formState }) => <ServiceForm formApi={formApi} formState={formState} isCreate={true} />}
    </Form>
  );
};

interface MatchParams {
  id: string;
}

interface TheProps extends RouteComponentProps<MatchParams> {}

export default CreateServicePage;
