import React, { useState } from "react";
import { FormApi, FormState, Select as InformedSelect, Text } from "informed";
import _ from "lodash";
import { Button } from "react-bootstrap";
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

  return (
    <div>
      <label>Tipo</label>
      <InformedSelect field="type">
        <option value="10.40">10.40</option>
        <option value="10.41">10.41</option>
        <option value="10.43">10.43</option>
      </InformedSelect>
      <br />
      <h2>General</h2>
      <label>Descripción:</label> {/*Otros datos de Interés / Mayor problema presente*/}
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
      <br />
      <Text field="volunteers" disabled={true} /> {/*Need to be here to work*/}
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
      <h2>10.40 Incendios</h2>
      <label>Tipo de Fuego:</label>
      <InformedSelect field={`sub_type._id`} initialValue={getSubTypesQuery.data.subTypes[0]?.id}>
        {getSubTypesQuery.data.subTypes.map((subType) => (
          <option value={subType.id} key={subType.id}>
            {subType.name}
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
      <Text field="fire_class" disabled={true} />
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
              event.preventDefault();
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
      <label>vehicles_used:</label>
      <Text field="vehicles_used" />
      <br />
      <label>other_units:</label>
      <Text field="other_units" />
      <br />
      <label>other_occurrences:</label>
      <Text field="other_occurrences" />
      <br />
      <label>police_force_in_charge:</label>
      <Text field="police_force_in_charge" />
      <br />
      <label>judge_in_charge:</label>
      <Text field="judge_in_charge" />
      <br />
      <label>Recursos Utilizados:</label>
      <Text field="resources_used" disabled={true} />
      {(formState.values.resources_used || []).map((value, index) => {
        return (
          <div>
            <InformedSelect field={`resources_used[${index}].resource`} initialValue="combustible">
              <option value="combustible">Combustible</option>
              <option value="bomberos">Bomberos</option>
              <option value="kilometros">Km. recorridos</option>
              <option value="tiempo">Tiempo total</option>
              <option value="agua">Agua</option>
              <option value="polvo">Polvo químico</option>
              <option value="gas">Gas carbónico</option>
              <option value="espuma">Espuma</option>
              <option value="otro">Otro</option>
              {/* create constants */}
              {/* Does it need a db entry? */}
            </InformedSelect>
            <Text field={`resources_used[${index}].quantity`} initialValue={1} />
            <button
              onClick={(event) => {
                event.preventDefault();
                const resources_used = arrayRemove(formState.values.resources_used, index);
                formApi.setValues({ ...formState.values, resources_used });
              }}
            >
              Quitar
            </button>
          </div>
        );
      })}
      <br />
      <button
        onClick={(event) => {
          event.preventDefault();
          const newResources = formState.values.resources_used || [];
          newResources.push(undefined);
          formApi.setValues({ ...formState.values, resources_used: newResources });
        }}
      >
        Agregar
      </button>
      <br />
      <h2>10.41 Accidentes</h2>
      <label>Daños:</label>
      <Text field="damage1041" disabled={true} />
      {(formState.values.damage1041 || []).map((value, index) => {
        return (
          <div>
            <InformedSelect field={`damage1041[${index}]`} initialValue="materiales">
              <option value="materiales">Daños Materiales</option>
              <option value="heridos">Con Heridos</option>
              <option value="heridos_atrapados">Con Heridos Atrapados</option>
              <option value="incendios">Con Incendios</option>
              <option value="mat_pel">Con Mat-Pel ??</option>
              {/* create constants */}
            </InformedSelect>
            <button
              onClick={(event) => {
                event.preventDefault();
                const damage1041 = arrayRemove(formState.values.damage1041, index);
                formApi.setValues({ ...formState.values, damage1041 });
              }}
            >
              Quitar
            </button>
          </div>
        );
      })}
      <br />
      <button
        onClick={(event) => {
          event.preventDefault();
          const newDamages = formState.values.damage1041 || [];
          newDamages.push(undefined);
          formApi.setValues({ ...formState.values, damage1041: newDamages });
        }}
      >
        Agregar
      </button>
      <br />
      <label>Cantidad 10.44:</label>
      <Text field="quantities1044" disabled={true} />
      {(formState.values.quantities1044 || []).map((value, index) => {
        return (
          <div>
            <InformedSelect field={`quantities1044[${index}].type`} initialValue="ilesos">
              <option value="ilesos">Ileso/s</option>
              <option value="heridos">Herido/s</option>
              <option value="fallecidos">Fallecido/s</option>
              <option value="rescates">Rescate/s</option>
              <option value="enfermos">Enfermo/s</option>
              {/* create constants */}
            </InformedSelect>
            <Text field={`quantities1044[${index}].quantity`} initialValue={1} />
            <button
              onClick={(event) => {
                event.preventDefault();
                const quantities1044 = arrayRemove(formState.values.quantities1044, index);
                formApi.setValues({ ...formState.values, quantities1044 });
              }}
            >
              Quitar
            </button>
          </div>
        );
      })}
      <br />
      <button
        onClick={(event) => {
          event.preventDefault();
          const newQuantities = formState.values.quantities1044 || [];
          newQuantities.push(undefined);
          formApi.setValues({ ...formState.values, quantities1044: newQuantities });
        }}
      >
        Agregar
      </button>
      <br />
      <label>Daños:</label>
      <Text field="involved_elements" disabled={true} />
      {(formState.values.involved_elements || []).map((value, index) => {
        return (
          <div>
            <InformedSelect field={`involved_elements[${index}]`} initialValue="peatones">
              <option value="peatones">Peatones</option>
              <option value="motos">Motos</option>
              <option value="vehiculos_livianos">Vehículos livianos</option>
              <option value="vehiculos_pesados">Vehículos pesados</option>
              <option value="buses">Buses</option>
              {/* create constants */}
            </InformedSelect>
            <button
              onClick={(event) => {
                event.preventDefault();
                const involved_elements = arrayRemove(formState.values.involved_elements, index);
                formApi.setValues({ ...formState.values, involved_elements });
              }}
            >
              Quitar
            </button>
          </div>
        );
      })}
      <br />
      <button
        onClick={(event) => {
          event.preventDefault();
          const newInvolvedElements = formState.values.involved_elements || [];
          newInvolvedElements.push(undefined);
          formApi.setValues({ ...formState.values, involved_elements: newInvolvedElements });
        }}
      >
        Agregar
      </button>
      <br />
      <label>Magnitudes:</label>
      <Text field="magnitude1041" disabled={true} />
      {(formState.values.magnitude1041 || []).map((value, index) => {
        return (
          <div>
            <InformedSelect field={`magnitude1041[${index}]`} initialValue="cinturon_conductor">
              <option value="cinturon_conductor">Cinturón Conductor</option>
              <option value="cinturon_acomp">Cinturón Acompañante</option>
              <option value="casco_conductor">Casco Conductor</option>
              <option value="casco_acomp">Casco Acompañante</option>
              {/* create constants */}
            </InformedSelect>
            <button
              onClick={(event) => {
                event.preventDefault();
                const magnitude1041 = arrayRemove(formState.values.magnitude1041, index);
                formApi.setValues({ ...formState.values, magnitude1041 });
              }}
            >
              Quitar
            </button>
          </div>
        );
      })}
      <br />
      <button
        onClick={(event) => {
          event.preventDefault();
          const newMagnitudes = formState.values.magnitude1041 || [];
          newMagnitudes.push(undefined);
          formApi.setValues({ ...formState.values, magnitude1041: newMagnitudes });
        }}
      >
        Agregar
      </button>
      <br />
      <h2>10.43 Rescates</h2>
      <label>Tipo de Rescate:</label>
      <InformedSelect field="rescue_type">
        <option value="vivienda">En Vivienda</option>
        <option value="profundidad">Profundidad</option>
        <option value="altura">Altura</option>
        <option value="derrumbe">Derrumbe</option>
        <option value="raudal">Raudal-Naufragio</option>
        <option value="bomba">Amenaza de bomba</option>
        <option value="suicidio">Intento de suidicio</option>
        {/* create constants */}
      </InformedSelect>
      <br />
      <Button type="submit">Crear Servicio</Button>
      <Button href="/services">Volver</Button>
    </div>
  );
};

export default ServiceForm;
