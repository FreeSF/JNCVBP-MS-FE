import { gql } from "apollo-boost";
import { rankAllFieldsFragment } from "./ranks";

/**
 * Volunteers-related GraphQL operations.
 *
 * This module contains GraphQL fragments, queries, and mutations related to the "Volunteer" entity.
 * It allows querying and mutating course data within the application.
 *
 * The fragments are essential for reusability and consistency across various GraphQL operations,
 * ensuring that the same set of fields is queried or mutated as required.
 *
 * Note: This module is a part of the broader GraphQL-based data management strategy in the application,
 * designed to interact with a backend service providing course management features.
 */

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
export const volunteerNameFieldFragment = gql`
  fragment volunteerNameField on Volunteer {
    id
    name
  }
`;

// Not the best solution, but it works for small amount of data.
export const GET_VOLUNTEERS = gql`
  query getVolunteers {
    volunteers {
      ...volunteerNameField
    }
  }
  ${volunteerNameFieldFragment}
`;

export const GET_PAGINATED_VOLUNTEERS = gql`
  query getPaginatedVolunteers(
    $limit: Float
    $offset: Float
    $sortField: String
    $sortOrder: String
    $searchText: String
    $disabled: Boolean
  ) {
    page: paginatedVolunteers(
      limit: $limit
      offset: $offset
      sortField: $sortField
      sortOrder: $sortOrder
      searchText: $searchText
      disabled: $disabled
    ) {
      items {
        ...volunteerAllFields
      }
      totalSize
    }
  }
  ${volunteerAllFieldsFragment}
`;

export const GET_VOLUNTEERS_DISABLED = gql`
  query getVolunteersDisabled {
    volunteersDisabled {
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

export const RESTORE_VOLUNTEER = gql`
  mutation restoreVolunteer($id: String!) {
    restoreVolunteer(id: $id) {
      id
    }
  }
`;
