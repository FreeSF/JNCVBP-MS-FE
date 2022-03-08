import React, { useState } from "react";
import { Form, FormApi, Select, Text } from "informed";
import {
  CreateTrainingInput,
  CreateTrainingMutation,
  CreateTrainingMutationVariables,
  GetVolunteersQuery,
} from "../../types";
import { useMutation, useQuery } from "react-apollo";
import { GET_VOLUNTEERS } from "../../queries/volunteers";
import { CREATE_TRAINING, GET_TRAININGS } from "../../queries/Trainings";
import { useHistory } from "react-router-dom";
import Spinner from "../spinner";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";
import _ from "lodash";

const CreateTrainingPage = (props) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateTrainingInput>>(null);
  const [volunteersQuantity, setVolunteersQuantity] = useState<number>(0);
  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  const [createTraining, createdTraining] = useMutation<CreateTrainingMutation, CreateTrainingMutationVariables>(
    CREATE_TRAINING
  );
  const history = useHistory();

  const defaultValues: CreateTrainingInput = {
    date: new Date(),
    description: "",
    volunteers: [],
  };

  const handleSubmit = () => {
    createTraining({
      variables: {
        input: formRefCreate.getState().values,
      },
      refetchQueries: [{ query: GET_TRAININGS }],
    }).then((value) => {
      props.history.push("/trainings");
    });
  };

  if (getVolunteersQuery.loading) return <Spinner />;

  return (
    <div>
      <h1>Crear Práctica</h1>

      <Form
        getApi={(formRef: FormApi<CreateTrainingInput>) => setFormRefCreate(formRef)}
        onSubmit={handleSubmit}
        initialValues={defaultValues}
      >
        {({ formApi, formState }) => (
          <div>
            <label>Descripción:</label>
            <Text field="description" />
            <label>Fecha:</label>
            <Text field="date" />
            <DatePicker
              locale="es"
              onChange={(value) => {
                formApi.setValues({ ...formState.values, date: value });
              }}
              selected={formState.values.date}
            />
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
            <Button type="submit">Crear Práctica</Button>
            <Button onClick={() => history.push("/trainings")}>Volver</Button>
          </div>
        )}
      </Form>
    </div>
  );
};

export default CreateTrainingPage;
