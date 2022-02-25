import { gql } from "apollo-boost";
import { volunteerAllFieldsFragment } from "./volunteers";

const GUARDS_ALL_FIELDS_FRAGMENT = gql`
  fragment guardAllFields on Guard {
    id
    start_time
    end_time
    volunteers {
      ...volunteerAllFields
    }
  }
  ${volunteerAllFieldsFragment}
`;

export const GET_GUARDS = gql`
  query getGuards {
    guards {
      ...guardAllFields
    }
  }
  ${GUARDS_ALL_FIELDS_FRAGMENT}
`;

export const FIND_GUARD = gql`
  query findGuard($id: String!) {
    guard(id: $id) {
      ...guardAllFields
    }
  }
  ${GUARDS_ALL_FIELDS_FRAGMENT}
`;

export const EDIT_GUARD = gql`
  mutation editGuard($input: UpdateGuardInput!) {
    updateGuard(updateGuardInput: $input) {
      ...guardAllFields
    }
  }
  ${GUARDS_ALL_FIELDS_FRAGMENT}
`;

export const CREATE_GUARD = gql`
  mutation createGuard($input: CreateGuardInput!) {
    createGuard(createGuardInput: $input) {
      ...guardAllFields
    }
  }
  ${GUARDS_ALL_FIELDS_FRAGMENT}
`;

export const REMOVE_GUARD = gql`
  mutation removeGuard($id: String!) {
    removeGuard(id: $id) {
      ...guardAllFields
    }
  }
  ${GUARDS_ALL_FIELDS_FRAGMENT}
`;
