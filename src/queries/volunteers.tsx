import { gql } from "apollo-boost";
import { rankAllFieldsFragment } from "./ranks";

export const volunteerAllFieldsFragment = gql`
  fragment volunteerAllFields on Volunteer {
    id
    name
    code
    address
    blood_type
    status
    incorporation_date
    birth_date
    rank {
      ...rankAllFields
    }
  }
  ${rankAllFieldsFragment}
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
  mutation editVolunteer($input: UpdateVolunteerInput!) {
    updateVolunteer(updateVolunteerInput: $input) {
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
    removeVolunteer(id: $id) {
      id
    }
  }
`;
