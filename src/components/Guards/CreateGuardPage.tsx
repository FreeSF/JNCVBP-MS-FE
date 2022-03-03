import React, { useState } from "react";
import { Form, FormApi, Select, Text } from "informed";
import { CreateGuardInput, CreateGuardMutation, CreateGuardMutationVariables, GetVolunteersQuery } from "../../types";
import DateTimePicker from "react-datetime-picker";
import _ from "lodash";
import { useMutation, useQuery } from "react-apollo";
import { GET_VOLUNTEERS } from "../../queries/volunteers";
import { CREATE_GUARD, GET_GUARDS } from "../../queries/Guards";
import { Button } from "react-bootstrap";
import Spinner from "../spinner";
import { useHistory } from "react-router-dom";

const CreateGuardPage = (props) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateGuardInput>>(null);
  const [volunteersQuantity, setVolunteersQuantity] = useState<number>(0);
  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  const [createGuard, createdGuard] = useMutation<CreateGuardMutation, CreateGuardMutationVariables>(CREATE_GUARD);
  const history = useHistory();

  const defaultValues: CreateGuardInput = {
    start_time: new Date().getTime(),
    end_time: new Date().getTime(),
    volunteers: [],
  };

  const handleSubmit = () => {
    createGuard({
      variables: {
        input: formRefCreate.getState().values,
      },
      refetchQueries: [{ query: GET_GUARDS }],
    }).then((value) => {
      props.history.push("/guards");
    });
  };

  if (getVolunteersQuery.loading) return <Spinner />;

  return (
    <div>
      <h1>Crear Guardia</h1>

      <Form
        getApi={(formRef: FormApi<CreateGuardInput>) => setFormRefCreate(formRef)}
        onSubmit={handleSubmit}
        initialValues={defaultValues}
      >
        {({ formApi, formState }) => (
          <div>
            <label>Inicio:</label>
            <Text field="start_time" />
            <DateTimePicker
              locale="es"
              onChange={(value: Date) => {
                formApi.setValues({ ...formState.values, start_time: value.getTime() });
              }}
              value={formState.values.start_time && new Date(formState.values.start_time)}
              maxDetail="minute"
              minDetail="month"
            />
            <br />
            <label>Fin:</label>
            <Text field="end_time" />
            <DateTimePicker
              locale="es"
              onChange={(value: Date) => {
                formApi.setValues({ ...formState.values, end_time: value.getTime() });
              }}
              value={formState.values.end_time && new Date(formState.values.end_time)}
              maxDetail="minute"
              minDetail="month"
            />
            <br />
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
            <Button type="submit">Crear Guardia</Button>
            <Button onClick={() => history.push("/guards")}>Volver</Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default CreateGuardPage;
