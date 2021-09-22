import {gql} from "apollo-boost";

const allFieldsFragment = gql`
    fragment volunteerAllFields on Volunteer {
        id, name
    }
`;

export const GET_VOLUNTEERS = gql`
    query getVolunteers {
        volunteers {
            ...volunteerAllFields
        }
    }
    ${allFieldsFragment}
`;

export const FIND_VOLUNTEER = gql`
    query findVolunteer($id: String!) {
        volunteer(id: $id) {
            ...volunteerAllFields
        }
    }
    ${allFieldsFragment}
`;

export const EDIT_VOLUNTEER = gql`
    mutation editVolunteer($id: String!, $name: String){
        updateVolunteer(updateVolunteerInput: {id: $id, name: $name}) {
            ...volunteerAllFields
        }
    }
    ${allFieldsFragment}
`;

export const CREATE_VOLUNTEER = gql`
    mutation createVolunteer($input: CreateVolunteerInput!) {
        createVolunteer(createVolunteerInput: $input) {
            ...volunteerAllFields
        }
    }
    ${allFieldsFragment}
`;

export const DELETE_VOLUNTEER = gql`
    mutation deleteVolunteer($id: String!) {
        removeVolunteer(id: $id) {id}
    }
`;
