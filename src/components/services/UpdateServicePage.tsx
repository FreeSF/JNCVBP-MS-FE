import React, { useState } from "react";
import { useMutation, useQuery } from "react-apollo";
import { FindServiceQuery, UpdateServiceInput } from "../../types";
import { FIND_SERVICE } from "../../queries/services";
import Spinner from "../spinner";
import { FormApi, Form } from "informed";
import ServiceForm from "./ServiceForm";

const UpdateServicePage = (props) => {
  const getService = useQuery<FindServiceQuery>(FIND_SERVICE, { variables: { id: props.match.params.id } });
  const [formRef, setFormRef] = useState<FormApi<UpdateServiceInput>>(null);

  if (getService.loading) return <Spinner />;

  const service = getService.data.service;

  const defaultValues: UpdateServiceInput = {
    address: service.address,
    affected_owner: service.affected_owner,
    affected_owner_description: service.affected_owner_description,
    alerted_by: service.alerted_by,
    arrival_time: service.arrival_time,
    call_time: service.call_time,
    crew: service.crew,
    damage: service.damage,
    departure_time: service.departure_time,
    description: service.description,
    fire_class: service.fire_class.map((fireclass) => ({ _id: fireclass.id })),
    sub_type: { _id: service.sub_type.id },
    fire_type_burned_surface: service.fire_type_burned_surface,
    fire_type_description: service.fire_type_description,
    fire_type_total_surface: service.fire_type_total_surface,
    id: service.id,
    locality: service.locality,
    magnitude: service.magnitude,
    neighborhood: service.neighborhood,
    officer_in_charge: { _id: service.officer_in_charge.id },
    phone: service.phone,
    place: service.place,
    possible_cause: { _id: service.possible_cause.id },
    possible_cause_other_description: service.possible_cause_other_description,
    received_by: service.received_by,
    type: service.type,
    volunteers: service.volunteers.map((volunteer) => ({ _id: volunteer.id })),
    withdrawal_time: service.withdrawal_time,
  };

  return (
    <Form
      initialValues={defaultValues}
      getApi={(formRef: FormApi<UpdateServiceInput>) => setFormRef(formRef)}
      onSubmit={() => {
        console.log("x");
      }}
    >
      {({ formApi, formState }) => <ServiceForm formApi={formApi} formState={formState} />}
    </Form>
  );
};

export default UpdateServicePage;
