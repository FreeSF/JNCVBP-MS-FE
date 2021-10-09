import React, {useEffect, useState} from "react";
import {Form, FormApi, Text, Select} from "informed";
import {RouteComponentProps} from "react-router-dom";
import {useLazyQuery, useMutation, useQuery} from "react-apollo";
import {
  CreateServiceInput, CreateServiceMutation, CreateServiceMutationVariables,
  GetVolunteersQuery,
  Service
} from "../../types";
import {CREATE_SERVICE, EDIT_SERVICE, FIND_SERVICE, GET_SERVICES} from "../../queries/services";
import Spinner from "../spinner";
import _ from "lodash";
import {GET_VOLUNTEERS} from "../../queries/volunteers";

const CreateServicePage:React.FC<TheProps> = props => {


  const [formRefCreate, setFormRefCreate] = useState<FormApi<CreateServiceInput>>(null);

  const [createService, createdService] = useMutation<CreateServiceMutation, CreateServiceMutationVariables>(CREATE_SERVICE);

  const getVolunteersQuery = useQuery<GetVolunteersQuery>(GET_VOLUNTEERS);

  const [volunteersQuantity, setVolunteersQuantity] = useState(0);

  if(getVolunteersQuery.loading)
    return <Spinner/>


  const handleSubmit = () => {
      createService({
        variables: {
          input: formRefCreate.getState().values
        }, refetchQueries: [{ query: GET_SERVICES }]
      }).then(value => {
        props.history.push('/services');
      });
  };

  return (
    <div>
      <h2>Create Service</h2>
      <Form
        getApi={(formRef: FormApi<CreateServiceInput>) => setFormRefCreate(formRef)}
        onSubmit={handleSubmit}
      >
        {({ formApi, formState }) => (

          <div>
            <label>Descripción:</label>
            <Text field="description"/>
            <br/>
            <label>Asistencia de Voluntarios</label>
            <br/>
            {
              _.times(volunteersQuantity, i => (
                <React.Fragment>
                  <Select field={`volunteers[${i}].id`} initialValue={undefined}>
                    {
                      getVolunteersQuery.data.volunteers.map(volunteer =>
                          <option value={volunteer.id} key={volunteer.id}>{volunteer.name}</option>
                      )
                    }
                  </Select>
                  <br/>
                </React.Fragment>
              ))
            }
            <button onClick={event => {
              event.preventDefault();
              setVolunteersQuantity(volunteersQuantity + 1)
            }}>Agregar</button>
            <button onClick={event => {
              event.preventDefault();
              setVolunteersQuantity(volunteersQuantity > 0 ? volunteersQuantity - 1 : 0)
            }}>Quitar</button>
            <button type="submit">Crear</button>
          </div>

          )}
      </Form>
    </div>
  )
}

interface MatchParams {
  id: string;
}

interface TheProps extends RouteComponentProps<MatchParams> {

}

export default CreateServicePage;