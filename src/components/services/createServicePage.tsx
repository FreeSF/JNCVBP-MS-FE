import React, { useEffect, useRef, useState } from "react";
import { Form, FormApi, Text, Select } from "informed";
import { RouteComponentProps } from "react-router-dom";
import { useLazyQuery, useMutation, useQuery } from "react-apollo";
import {
  CreateServiceInput,
  CreateServiceMutation,
  CreateServiceMutationVariables,
  GetFireCausesQuery,
  GetFireClassesQuery,
  GetFireTypesQuery,
  GetVolunteersQuery,
  Service,
  ServicesAllFieldsFragment,
} from "../../types";
import { CREATE_SERVICE, EDIT_SERVICE, FIND_SERVICE, GET_SERVICES } from "../../queries/services";
import Spinner from "../spinner";
import _ from "lodash";
import { GET_VOLUNTEERS } from "../../queries/volunteers";
import { Button } from "react-bootstrap";
import { GET_FIRE_TYPES } from "../../queries/fireType";
import { GET_FIRE_CAUSES } from "../../queries/fireCause";
import { GET_FIRE_CLASSES } from "../../queries/fireClass";

const CreateServicePage: React.FC<TheProps> = (props) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateServiceInput>>(null);

  const [createService, createdService] = useMutation<CreateServiceMutation, CreateServiceMutationVariables>(
    CREATE_SERVICE
  );

  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);

  const getFireTypesQuery = useQuery<GetFireTypesQuery>(GET_FIRE_TYPES);
  const getFireCausesQuery = useQuery<GetFireCausesQuery>(GET_FIRE_CAUSES);
  const getFireClassesQuery = useQuery<GetFireClassesQuery>(GET_FIRE_CLASSES);

  // Example of how to do it without informed
  const defaultValues: CreateServiceInput = {
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
    fire_type: undefined,
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
  const [input, setInput] = useState<CreateServiceInput>(defaultValues);

  const [volunteersQuantity, setVolunteersQuantity] = useState(0);
  const [fireClassQuantity, setFireClassQuantity] = useState(0);

  if (
    getVolunteersQuery.loading ||
    getFireTypesQuery.loading ||
    getFireCausesQuery.loading ||
    getFireClassesQuery.loading
  )
    return <Spinner />;

  const handleSubmit = () => {
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
        {({ formApi, formState }) => (
          <div>
            <label>Tipo</label>
            <Select field={`type`}>
              <option value="10.40">10.40</option>
              <option value="10.41">10.41</option>
              <option value="10.43">10.43</option>
            </Select>
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
            {_.times(volunteersQuantity, (i) => (
              <React.Fragment>
                <Select
                  field={`volunteers[${i}]._id`}
                  initialValue={_.get(getVolunteersQuery, "data.volunteers[0].id", undefined)}
                >
                  {getVolunteersQuery.data.volunteers.map((volunteer) => (
                    <option value={volunteer.id} key={volunteer.id}>
                      {volunteer.name}
                    </option>
                  ))}
                </Select>
                <br />
              </React.Fragment>
            ))}
            <button
              onClick={(event) => {
                event.preventDefault();
                setVolunteersQuantity(volunteersQuantity + 1);
              }}
            >
              Agregar
            </button>
            <button
              onClick={(event) => {
                event.preventDefault();
                setVolunteersQuantity(volunteersQuantity > 0 ? volunteersQuantity - 1 : 0);
              }}
            >
              Quitar
            </button>
            <br />

            <label>Oficial a cargo:</label>
            <Select field={`officer_in_charge._id`} initialValue={undefined}>
              {getVolunteersQuery.data.volunteers.map((volunteer) => (
                <option value={volunteer.id} key={volunteer.id}>
                  {volunteer.name}
                </option>
              ))}
            </Select>
            <br />

            <label>Tipo de Fuego:</label>
            <Select field={`fire_type._id`} initialValue={undefined}>
              {getFireTypesQuery.data.fireTypes.map((fireType) => (
                <option value={fireType.id} key={fireType.id}>
                  {fireType.name}
                </option>
              ))}
            </Select>
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
            <Select field={`possible_cause._id`} initialValue={undefined}>
              {getFireCausesQuery.data.fireCauses.map((fireCause) => (
                <option value={fireCause.id} key={fireCause.id}>
                  {fireCause.name}
                </option>
              ))}
            </Select>
            <br />
            <label>Causa Posible (otro):</label>
            <Text field="possible_cause_other_description" />
            <br />
            <label>Proporción:</label>
            <Text field="magnitude" />
            <br />
            <label>Fuego Clase:</label>
            {_.times(fireClassQuantity, (i) => (
              <React.Fragment>
                <Select field={`fire_class[${i}]._id`} /*initialValue={getFireClassesQuery.data.fireClasses}*/>
                  {getFireClassesQuery.data.fireClasses.map((fireClass) => (
                    <option value={fireClass.id} key={fireClass.id}>
                      {fireClass.name}
                    </option>
                  ))}
                </Select>
                <br />
              </React.Fragment>
            ))}
            <button
              onClick={(event) => {
                event.preventDefault();
                setFireClassQuantity(fireClassQuantity + 1);
              }}
            >
              Agregar
            </button>
            <button
              onClick={(event) => {
                event.preventDefault();
                setFireClassQuantity(fireClassQuantity > 0 ? fireClassQuantity - 1 : 0);
              }}
            >
              Quitar
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
        )}
      </Form>
    </div>
  );
};

interface MatchParams {
  id: string;
}

interface TheProps extends RouteComponentProps<MatchParams> {}

export default CreateServicePage;
