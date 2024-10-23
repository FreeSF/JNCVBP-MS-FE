import { gql } from "apollo-boost";
import { volunteerAllFieldsFragment, volunteerNameFieldFragment } from "./volunteers";

/**
 * Guards-related GraphQL operations.
 *
 * This module contains GraphQL fragments, queries, and mutations related to the "Guard" entity.
 * It allows querying and mutating course data within the application.
 *
 * The fragments are essential for reusability and consistency across various GraphQL operations,
 * ensuring that the same set of fields is queried or mutated as required.
 *
 * Note: This module is a part of the broader GraphQL-based data management strategy in the application,
 * designed to interact with a backend service providing course management features.
 */

const GUARDS_ALL_FIELDS_FRAGMENT = gql`
  fragment guardAllFields on Guard {
    id
    start_time
    end_time
    observations
    volunteers {
      ...volunteerNameField
    }
  }
  ${volunteerNameFieldFragment}
`;

// Inefficient
export const GET_GUARDS = gql`
  query getGuards {
    guards {
      ...guardAllFields
    }
  }
  ${GUARDS_ALL_FIELDS_FRAGMENT}
`;

export const GET_PAGINATED_GUARDS = gql`
  query getPaginatedGuards(
    $limit: Float
    $offset: Float
    $sortField: String
    $sortOrder: String
    $searchText: String
    $disabled: Boolean
  ) {
    page: paginatedGuards(
      limit: $limit
      offset: $offset
      sortField: $sortField
      sortOrder: $sortOrder
      searchText: $searchText
      disabled: $disabled
    ) {
      items {
        ...guardAllFields
      }
      totalSize
    }
  }
  ${GUARDS_ALL_FIELDS_FRAGMENT}
`;

export const CURRENT_GUARD = gql`
  query currentGuard {
    currentGuard {
      ...guardAllFields
    }
  }
  ${GUARDS_ALL_FIELDS_FRAGMENT}
`;

export const NEXT_GUARD = gql`
  query nextGuard {
    nextGuard {
      ...guardAllFields
    }
  }
  ${GUARDS_ALL_FIELDS_FRAGMENT}
`;

export const GET_GUARDS_DISABLED = gql`
  query getGuardsDisabled {
    guardsDisabled {
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

export const RESTORE_GUARD = gql`
  mutation restoreGuard($id: String!) {
    restoreGuard(id: $id) {
      ...guardAllFields
    }
  }
  ${GUARDS_ALL_FIELDS_FRAGMENT}
`;
