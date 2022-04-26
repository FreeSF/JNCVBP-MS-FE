import React, { useEffect, useRef, useState } from "react";
import { Form, FormApi, Text, Select } from "informed";
import { RouteComponentProps } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "react-apollo";
import { CreateServiceInput, CreateServiceMutation, CreateServiceMutationVariables } from "../../types";
import { CREATE_SERVICE, EDIT_SERVICE, FIND_SERVICE, GET_SERVICES } from "../../queries/services";
import ServiceForm from "./ServiceForm";

const CreateServicePage: React.FC<TheProps> = (props) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateServiceInput>>(null);

  const [createService, createdService] = useMutation<CreateServiceMutation, CreateServiceMutationVariables>(
    CREATE_SERVICE
  );

  // Example of how to do it without informed
  const defaultValues: CreateServiceInput = {
    damage1041: undefined,
    involved_elements: undefined,
    judge_in_charge: "",
    magnitude1041: undefined,
    other_occurrences: "",
    other_units: "",
    police_force_in_charge: "",
    quantities1044: undefined,
    rescue_type: undefined,
    resources_used: undefined,
    vehicles_used: "",
    address: "Calle 123",
    type: "10.41",
    affected_owner: "0",
    affected_owner_description: "0",
    alerted_by: "Alguien",
    call_time: "00:00",
    departure_time: "01:00",
    arrival_time: "02:00",
    withdrawal_time: "02:01",
    crew: "The Crew",
    damage: "There was some damage",
    description: "---",
    fire_class: undefined,
    sub_type: undefined,
    fire_type_burned_surface: 0,
    fire_type_description: "0",
    fire_type_total_surface: 0,
    locality: "Cap. Miranda",
    magnitude: "Great",
    neighborhood: "Centro",
    officer_in_charge: undefined,
    phone: "+595",
    place: "Cerca",
    possible_cause: undefined,
    possible_cause_other_description: "----",
    received_by: "Someone",
    volunteers: [],
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
    <div>
      <h2>Crear Service</h2>

      <Form
        getApi={(formRef: FormApi<CreateServiceInput>) => setFormRefCreate(formRef)}
        onSubmit={handleSubmit}
        initialValues={defaultValues}
      >
        {({ formApi, formState }) => <ServiceForm formApi={formApi} formState={formState} />}
      </Form>
    </div>
  );
};

interface MatchParams {
  id: string;
}

interface TheProps extends RouteComponentProps<MatchParams> {}

export default CreateServicePage;
