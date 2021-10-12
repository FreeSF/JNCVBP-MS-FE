import {gql} from "apollo-boost";

export const volunteerAllFieldsFragment = gql`
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
    ${volunteerAllFieldsFragment}
`;

export const FIND_VOLUNTEER = gql`
    query findVolunteer($id: String!) {
        volunteer(id: $id) {
            ...volunteerAllFields
        }
    }
    ${volunteerAllFieldsFragment}
`;

export const EDIT_VOLUNTEER = gql`
    mutation editVolunteer($id: String!, $name: String){
        updateVolunteer(updateVolunteerInput: {id: $id, name: $name}) {
            ...volunteerAllFields
        }
    }
    ${volunteerAllFieldsFragment}
`;

export const CREATE_VOLUNTEER = gql`
    mutation createVolunteer($input: CreateVolunteerInput!) {
        createVolunteer(createVolunteerInput: $input) {
            ...volunteerAllFields
        }
    }
    ${volunteerAllFieldsFragment}
`;

export const DELETE_VOLUNTEER = gql`
    mutation deleteVolunteer($id: String!) {
        removeVolunteer(id: $id) {id}
    }
`;
