import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { EditServiceMutation, EditServiceMutationVariables, FindServiceQuery, UpdateServiceInput } from "../../types";
import { EDIT_SERVICE, FIND_SERVICE, GET_SERVICES } from "../../queries/services";
import Spinner from "../spinner";
import { FormApi, Form } from "informed";
import ServiceForm from "./ServiceForm";
import { formatISOWithOptions } from "date-fns/fp";

const UpdateServicePage = (props) => {
  const getService = useQuery<FindServiceQuery>(FIND_SERVICE, { variables: { id: props.match.params.id } });
  const [formRef, setFormRef] = useState<FormApi<UpdateServiceInput>>(null);
  const [updateService, updatedService] = useMutation<EditServiceMutation, EditServiceMutationVariables>(EDIT_SERVICE);

  if (getService.loading || !getService.called) return <Spinner />;

  const service = getService.data.service;

  const defaultValues: UpdateServiceInput = {
    // Default
    id: service.id,
    type: service.type,
    sub_type: { _id: service.sub_type.id },
    officer_in_charge: { _id: service.officer_in_charge.id },
    date: service.date,
    call_time: service.call_time,
    departure_time: service.departure_time,
    arrival_time: service.arrival_time,
    withdrawal_time: service.withdrawal_time,
    neighborhood: service.neighborhood,
    locality: service.locality,
    address: service.address,
    place: service.place,
    alerted_by: service.alerted_by,
    phone: service.phone,
    received_by: service.received_by,
    crew: service.crew,
    description: service.description,
    volunteers: service.volunteers.map((volunteer) => ({ _id: volunteer.id })),

    // Fire
    fire_type_description: service.fire_type_description,
    fire_type_total_surface: service.fire_type_total_surface,
    fire_type_burned_surface: service.fire_type_burned_surface,
    affected_owner: service.affected_owner,
    affected_owner_description: service.affected_owner_description,
    possible_cause: { _id: service.possible_cause.id },
    possible_cause_other_description: service.possible_cause_other_description,
    damage: service.damage,
    vehicles_used: service.vehicles_used,
    other_units: service.other_units,
    other_occurrences: service.other_occurrences,
    fire_class: service.fire_class.map((fireClass) => ({ _id: fireClass.id })),
    resources_used: service.resources_used.map((resourceUsed) => ({
      resource: resourceUsed.resource,
      quantity: resourceUsed.quantity,
    })),
    police_force_in_charge: service.police_force_in_charge,
    judge_in_charge: service.judge_in_charge,
    magnitude: service.magnitude,

    // Accident
    damage1041: service.damage1041,
    quantities1044: service.quantities1044.map((quantities) => ({
      name: quantities.name,
      quantity: quantities.quantity,
    })),
    involved_elements: service.involved_elements,
    magnitude1041: service.magnitude1041,

    // Rescue
    rescue_type: service.rescue_type,
  };

  // console.log(service.sub_type.id)

  const handleSubmit = () => {
    const values = formRef.getState().values;

    updateService({
      variables: {
        input: {
          ...formRef.getState().values,
          id: props.match.params.id,
          damage1041: values.damage1041 || [],
          fire_class: values.fire_class || [],
          involved_elements: values.involved_elements || [],
          magnitude1041: values.magnitude1041 || [],
          resources_used: values.resources_used || [],
          quantities1044: values.quantities1044 || [],
          volunteers: values.volunteers || [],
        },
      },
      refetchQueries: [{ query: GET_SERVICES }],
    }).then((value) => {
      props.history.push("/services");
    });
  };

  return (
    <Form
      initialValues={{ ...defaultValues }}
      getApi={(formRef: FormApi<UpdateServiceInput>) => setFormRef(formRef)}
      onSubmit={handleSubmit}
    >
      {({ formApi, formState }) => <ServiceForm formApi={formApi} formState={formState} isCreate={false} />}
    </Form>
  );
};

export default UpdateServicePage;
