import React, { useState } from "react";
import { FormApi, FormState, Select as InformedSelect, Text } from "informed";
import _ from "lodash";
import { Button } from "react-bootstrap";
import { useQuery } from "react-apollo";
import {
  CreateServiceInput,
  GetFireCausesQuery,
  GetFireClassesQuery,
  GetFireTypesQuery,
  GetVolunteersQuery,
  OnlyIdVolunteerInput,
  UpdateServiceInput,
} from "../../types";
import { GET_VOLUNTEERS } from "../../queries/volunteers";
import { GET_FIRE_TYPES } from "../../queries/fireType";
import { GET_FIRE_CAUSES } from "../../queries/fireCause";
import { GET_FIRE_CLASSES } from "../../queries/fireClass";
import Spinner from "../spinner";

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

  const getFireTypesQuery = useQuery<GetFireTypesQuery>(GET_FIRE_TYPES);
  const getFireCausesQuery = useQuery<GetFireCausesQuery>(GET_FIRE_CAUSES);
  const getFireClassesQuery = useQuery<GetFireClassesQuery>(GET_FIRE_CLASSES);

  if (
    getVolunteersQuery.loading ||
    getFireTypesQuery.loading ||
    getFireCausesQuery.loading ||
    getFireClassesQuery.loading
  )
    return <Spinner />;

  return (
    <div>
      <label>Tipo</label>
      <InformedSelect field={`type`}>
        <option value="10.40">10.40</option>
        <option value="10.41">10.41</option>
        <option value="10.43">10.43</option>
      </InformedSelect>
      <br />
      <label>Descripción:</label>
      <Text field="description" />
      <br />
      <label>Hora de llamada:</label>
      <Text field="call_time" />
      <br />
      <label>Hora de Salida:</label>
      <Text field="departure_time" />
      <br />
      <label>Hora de Llegada:</label>
      <Text field="arrival_time" />
      <br />
      <label>Hora de Retirada:</label>
      <Text field="withdrawal_time" />
      <br />
      <label>Localidad:</label>
      <Text field="locality" />
      <br />
      <label>Barrio:</label>
      <Text field="neighborhood" />
      <br />
      <label>Dirección:</label>
      <Text field="address" />
      <br />
      <label>Lugar:</label>
      <Text field="place" />
      <br />
      <label>Comunicado por:</label>
      <Text field="alerted_by" />
      <br />
      <label>Teléfono:</label>
      <Text field="phone" />
      <br />
      <label>Recibido por:</label>
      <Text field="received_by" />
      <br />
      <label>Equipo:</label>
      <Text field="crew" />
      <br />
      <label>Asistencia de Voluntarios</label>
      <br />
      {/*volunteers.map((volunteer, i) => (
        <React.Fragment key={volunteer._id}>
          <Select
            value={{
              value: volunteer._id,
              label: _.get(getVolunteersQuery.data.volunteers.find(theVolunteer => theVolunteer.id === volunteer._id), 'name', 'No Seleccionado')
            }}
            options={getVolunteersQuery.data.volunteers.map(theVolunteer=> ({value: theVolunteer.id, label: theVolunteer.name}))}
            onChange={value => {
              const newVolunteers = [...volunteers];
              newVolunteers[i] = {_id: value.value};
              setVolunteers(newVolunteers);
            }}
            />
          <button
            onClick={() => {
              const newVolunteers = arrayRemove(volunteers, i);
              setVolunteers(newVolunteers);
            }}
          >
            Remove
          </button>
          <br />
        </React.Fragment>
      ))*/}
      {/*<button
        onClick={(event) => {
          event.preventDefault();
          setVolunteers([...volunteers, {_id: undefined}]);
        }}
      >
        Agregar
      </button>*/}
      <br />
      <Text field="volunteers" /> {/*Need to be here to work*/}
      {(formState.values.volunteers || []).map((volunteer, i) => {
        return (
          <React.Fragment>
            {" "}
            {/*don't add key for now*/}
            <InformedSelect field={`volunteers[${i}]._id`} initialValue={getVolunteersQuery.data.volunteers[0]?.id}>
              {getVolunteersQuery.data.volunteers.map((volunteer) => (
                <option value={volunteer.id} key={volunteer.id}>
                  {volunteer.name}
                </option>
              ))}
            </InformedSelect>
            <button
              onClick={(event) => {
                event.preventDefault();

                const newVolunteers = arrayRemove(formState.values.volunteers, i);
                formApi.setValues({ ...formState.values, volunteers: newVolunteers });
              }}
            >
              Quitar
            </button>
            <br />
          </React.Fragment>
        );
      })}
      <br />
      <button
        onClick={(event) => {
          event.preventDefault();
          const newVolunteers = formState.values.volunteers || [];
          newVolunteers.push({ _id: undefined });
          formApi.setValues({ ...formState.values, volunteers: newVolunteers });
        }}
      >
        Agregar
      </button>
      <br />
      <label>Oficial a cargo:</label>
      <InformedSelect field={`officer_in_charge._id`} initialValue={getVolunteersQuery.data.volunteers[0]?.id}>
        {getVolunteersQuery.data.volunteers.map((volunteer) => (
          <option value={volunteer.id} key={volunteer.id}>
            {volunteer.name}
          </option>
        ))}
      </InformedSelect>
      <br />
      <label>Tipo de Fuego:</label>
      <InformedSelect field={`fire_type._id`} initialValue={getFireTypesQuery.data.fireTypes[0]?.id}>
        {getFireTypesQuery.data.fireTypes.map((fireType) => (
          <option value={fireType.id} key={fireType.id}>
            {fireType.name}
          </option>
        ))}
      </InformedSelect>
      <br />
      <label>Superficie Total:</label>
      <Text field="fire_type_total_surface" type="number" />
      <br />
      <label>Superficie Quemada:</label>
      <Text field="fire_type_burned_surface" type="number" />
      <br />
      <label>Tipo de fuego (otro):</label>
      <Text field="fire_type_description" />
      <br />
      <label>Afectado:</label>
      <Text field="affected_owner" />
      <br />
      <label>Afectado (descripción):</label>
      <Text field="affected_owner_description" />
      <br />
      <label>Causa Posible: </label>
      <InformedSelect field={`possible_cause._id`} initialValue={getFireCausesQuery.data.fireCauses[0]?.id}>
        {getFireCausesQuery.data.fireCauses.map((fireCause) => (
          <option value={fireCause.id} key={fireCause.id}>
            {fireCause.name}
          </option>
        ))}
      </InformedSelect>
      <br />
      <label>Causa Posible (otro):</label>
      <Text field="possible_cause_other_description" />
      <br />
      <label>Proporción:</label>
      <Text field="magnitude" />
      <br />
      <label>Fuego Clase:</label>
      <Text field="fire_class" />
      <br />
      {(formState.values.fire_class || []).map((fireClass, i) => (
        <React.Fragment>
          <InformedSelect field={`fire_class[${i}]._id`} initialValue={getFireClassesQuery.data.fireClasses[0]?.id}>
            {getFireClassesQuery.data.fireClasses.map((fireClass) => (
              <option value={fireClass.id} key={fireClass.id}>
                {fireClass.name}
              </option>
            ))}
          </InformedSelect>
          <button
            onClick={(event) => {
              const newFireClasses = arrayRemove(formState.values.fire_class, i);
              formApi.setValues({ ...formState.values, fire_class: newFireClasses });
            }}
          >
            Quitar
          </button>
          <br />
        </React.Fragment>
      ))}
      <button
        onClick={(event) => {
          event.preventDefault();
          const newFireClasses = formState.values.fire_class || [];
          newFireClasses.push({ _id: undefined });
          formApi.setValues({ ...formState.values, fire_class: newFireClasses });
        }}
      >
        Agregar
      </button>
      <br />
      <label>Proporción/Magnitud:</label>
      <Text field="magnitude" />
      <br />
      <label>Destrucción:</label>
      <Text field="damage" />
      <br />
      <Button type="submit">Crear Servicio</Button>
      <Button href="/services">Volver</Button>
    </div>
  );
};

export default ServiceForm;
