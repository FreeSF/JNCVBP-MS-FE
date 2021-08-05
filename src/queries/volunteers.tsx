import {gql} from "apollo-boost";

const allFieldsFragment = gql`
    fragment volunteerAllFields on Volunteer {
        _id, name
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
    query findVolunteer($_id: String!) {
        volunteer(_id: $_id) {
            ...volunteerAllFields
        }
    }
    ${allFieldsFragment}
`;

export const EDIT_VOLUNTEER = gql`
    mutation editVolunteer($_id: String!, $name: String){
        editVolunteer(_id: $_id, name: $name) {
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
    mutation deleteVolunteer($_id: String!) {
        deleteVolunteer(_id: $_id)
    }
`;
