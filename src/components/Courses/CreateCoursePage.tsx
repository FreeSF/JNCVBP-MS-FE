import React, { useState } from "react";
import { Form, FormApi, Select, Text } from "informed";
import {
  CreateCourseInput,
  CreateCourseMutation,
  CreateCourseMutationVariables,
  CreateGuardInput,
  GetVolunteersQuery,
} from "../../types";
import { useMutation, useQuery } from "react-apollo";
import { GET_VOLUNTEERS } from "../../queries/volunteers";
import { useHistory } from "react-router-dom";
import { CREATE_COURSE, GET_COURSES } from "../../queries/Courses";
import Spinner from "../spinner";
import _ from "lodash";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

const CreateCoursePage = (props) => {
  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateCourseInput>>(null);
  const [volunteersQuantity, setVolunteersQuantity] = useState<number>(0);
  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);
  const [createCourse, createdCourse] = useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CREATE_COURSE);
  const history = useHistory();

  const defaultValues: CreateCourseInput = {
    date: new Date(),
    description: "",
    details: [],
  };

  if (getVolunteersQuery.loading) return <Spinner />;

  const handleSubmit = () => {
    console.log({ values: formRefCreate.getState().values });
    createCourse({
      variables: {
        input: formRefCreate.getState().values,
      },
      refetchQueries: [{ query: GET_COURSES }],
    }).then((value) => {
      props.history.push("/courses");
    });
  };

  return (
    <div>
      <h1>Crear Curso</h1>

      <Form
        getApi={(formRef: FormApi<CreateCourseInput>) => setFormRefCreate(formRef)}
        onSubmit={handleSubmit}
        initialValues={defaultValues}
      >
        {({ formApi, formState }) => (
          <div>
            <label>Descripción: </label>
            <Text field="description" />
            <br />
            <label>Fecha: </label>
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
                <label>Nota: </label>
                <Text field={`details[${i}].score`} />
                <Select
                  field={`details[${i}].volunteer._id`}
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

export default CreateCoursePage;
