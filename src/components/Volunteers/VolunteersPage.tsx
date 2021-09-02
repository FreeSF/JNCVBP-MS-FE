import React from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { useQuery, useMutation } from '@apollo/react-hooks';
import { DeleteVolunteerMutation, DeleteVolunteerMutationVariables, GetVolunteersQuery } from "../../types";
import { DELETE_VOLUNTEER, GET_VOLUNTEERS } from "../../queries/volunteers";
import Spinner from "../spinner";
import { gql } from "apollo-boost";

const fieldsFragmeent = gql`
    fragment volunteerfields on Volunteer {
        _id, name, __typename
    }
`;

const getVolunteeers = gql`
    query getVolunteeers {
    volunteers {
    ...volunteerfields
    }
    }
    ${fieldsFragmeent}
`;

const VolunteersPage = (props: RouteComponentProps) => {

  const { loading, data } = useQuery<GetVolunteersQuery>(getVolunteeers);

  const [deleteClient, deletedClient] = useMutation<
    DeleteVolunteerMutation,
    DeleteVolunteerMutationVariables
  >(DELETE_VOLUNTEER, {
    refetchQueries: [{ query: GET_VOLUNTEERS }]
  });

  const handleCreate = () => props.history.push('/volunteers/create')
  const handleEdit = (id: string) => props.history.push('/volunteers/' + id + '/edit')
  const handleShow = (id: string) => props.history.push('/volunteers/' + id)
  const handleDelete = (id: string) => deleteClient({ variables: { _id: id } });

  return loading ? <Spinner /> : (
    <div>
      <h1>The Volunteers Page</h1>
      <h2>List</h2><button onClick={handleCreate}>Create</button>
      {data.volunteers.map(volunteer =>
        <li>{volunteer._id + ' ' + volunteer.name}
          <button onClick={() => handleShow(volunteer._id)}>Show</button>
          <button onClick={() => handleEdit(volunteer._id)}>Edit</button>
          <button onClick={() => handleDelete(volunteer._id)}>Delete</button>
        </li>)
      }
    </div>
  )

}

export default VolunteersPage
