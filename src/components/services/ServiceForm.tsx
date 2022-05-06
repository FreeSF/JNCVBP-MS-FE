import React, { useState } from "react";
import { FormApi, FormState, Select as InformedSelect, Text, TextArea } from "informed";
import _ from "lodash";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import { useQuery } from "react-apollo";
import {
  CreateServiceInput,
  GetFireCausesQuery,
  GetFireClassesQuery,
  GetSubTypesQuery,
  GetVolunteersQuery,
  OnlyIdVolunteerInput,
  UpdateServiceInput,
} from "../../types";
import { GET_VOLUNTEERS } from "../../queries/volunteers";
import { GET_SUB_TYPES } from "../../queries/subType";
import { GET_FIRE_CAUSES } from "../../queries/fireCause";
import { GET_FIRE_CLASSES } from "../../queries/fireClass";
import Spinner from "../spinner";
import DefaultServiceFields from "./DefaultServiceFields";
import FireReportFields from "./FireReportFields";
import AccidentReportFields from "./AccidentReportFields";
import RescueReportFields from "./RescueReportFields";

type theProps = {
  formApi: FormApi<CreateServiceInput | UpdateServiceInput>;
  formState: FormState<CreateServiceInput | UpdateServiceInput>;
  initialVolunteers?: OnlyIdVolunteerInput[];
};

function arrayRemove(arr, index) {
  const result = [...arr];
  result[index] = "deleteThis";
  return result.filter((item) => item !== "deleteThis");
}

const ServiceForm = (props: theProps) => {
  const { formApi, formState } = props;

  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);

  const getSubTypesQuery = useQuery<GetSubTypesQuery>(GET_SUB_TYPES);
  const getFireCausesQuery = useQuery<GetFireCausesQuery>(GET_FIRE_CAUSES);
  const getFireClassesQuery = useQuery<GetFireClassesQuery>(GET_FIRE_CLASSES);

  if (
    getVolunteersQuery.loading ||
    getSubTypesQuery.loading ||
    getFireCausesQuery.loading ||
    getFireClassesQuery.loading
  )
    return <Spinner />;

  const handleRemoveVolunteer = (i) => {
    const newVolunteers = arrayRemove(formState.values.volunteers, i);
    formApi.setValues({ ...formState.values, volunteers: newVolunteers });
  };

  const handleRemoveFireClass = (i) => {
    const newFireClasses = arrayRemove(formState.values.fire_class, i);
    formApi.setValues({ ...formState.values, fire_class: newFireClasses });
  };

  const handleRemoveUsedResource = (index) => {
    const resources_used = arrayRemove(formState.values.resources_used, index);
    formApi.setValues({ ...formState.values, resources_used });
  };

  // Accident
  const handleRemoveDamage = (index) => {
    const damage1041 = arrayRemove(formState.values.damage1041, index);
    formApi.setValues({ ...formState.values, damage1041 });
  };

  const handleRemoveQuantities1044 = (index) => {
    const quantities1044 = arrayRemove(formState.values.quantities1044, index);
    formApi.setValues({ ...formState.values, quantities1044 });
  };

  const handleRemoveInvolvedElements = (index) => {
    const involved_elements = arrayRemove(formState.values.involved_elements, index);
    formApi.setValues({ ...formState.values, involved_elements });
  };

  const handleRemoveMagnitude1041 = (index) => {
    const magnitude1041 = arrayRemove(formState.values.magnitude1041, index);
    formApi.setValues({ ...formState.values, magnitude1041 });
  };

  // Rescue

  return (
    <Row>
      <Col md="12">
        <Card>
          <Card.Header>
            <Card.Title as="h4">Servicio</Card.Title>
            <label>Tipo</label>
            <InformedSelect field="type">
              <option value="10.40">10.40</option>
              <option value="10.41">10.41</option>
              <option value="10.43">10.43</option>
            </InformedSelect>
            <label>Oficial a cargo:</label>
            <InformedSelect field={`officer_in_charge._id`} initialValue={getVolunteersQuery.data.volunteers[0]?.id}>
              {getVolunteersQuery.data.volunteers.map((volunteer) => (
                <option value={volunteer.id} key={volunteer.id}>
                  {volunteer.name}
                </option>
              ))}
            </InformedSelect>
          </Card.Header>
          <Card.Body>
            <DefaultServiceFields
              formState={formState}
              formApi={formApi}
              handleRemoveVolunteer={handleRemoveVolunteer}
              volunteerOptions={getVolunteersQuery.data.volunteers}
            />

            <hr />
            <h2>10.40 Incendios</h2>
            <label>Tipo de Fuego:</label>
            <InformedSelect field={`sub_type._id`} initialValue={getSubTypesQuery.data.subTypes[0]?.id}>
              {getSubTypesQuery.data.subTypes.map((subType) => (
                <option value={subType.id} key={subType.id}>
                  {subType.name}
                </option>
              ))}
            </InformedSelect>

            <FireReportFields
              fireCausesOptions={getFireCausesQuery.data.fireCauses}
              fireClassesOptions={getFireClassesQuery.data.fireClasses}
              formState={formState}
              formApi={formApi}
              handleRemoveFireClass={handleRemoveFireClass}
              handleRemoveUsedResource={handleRemoveUsedResource}
            />

            <h2>10.41 Accidentes</h2>
            <AccidentReportFields
              formApi={formApi}
              formState={formState}
              handleRemoveDamage={handleRemoveDamage}
              handleRemoveQuantities1044={handleRemoveQuantities1044}
              handleRemoveInvolvedElements={handleRemoveInvolvedElements}
              handleRemoveMagnitude1041={handleRemoveMagnitude1041}
            />

            <h2>10.43 Rescates</h2>
            <RescueReportFields formApi={formApi} formState={formState} />

            <Button className="btn-fill btn-pull-right" variant="info" type="submit">
              Guardar
            </Button>
            <div className="clearfix"></div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ServiceForm;
