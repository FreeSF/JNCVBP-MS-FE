import { gql } from "apollo-boost";

/**
 * Fire-Classes-related GraphQL operations.
 *
 * This module contains GraphQL fragments, queries, and mutations related to the "Fire-Class" entity.
 * It allows querying and mutating course data within the application.
 *
 * The fragments are essential for reusability and consistency across various GraphQL operations,
 * ensuring that the same set of fields is queried or mutated as required.
 *
 * Note: This module is a part of the broader GraphQL-based data management strategy in the application,
 * designed to interact with a backend service providing course management features.
 */

export const fireClassAllFieldsFragment = gql`
  fragment fireClassAllFields on FireClass {
    id
    name
  }
`;

export const GET_FIRE_CLASSES = gql`
  query getFireClasses {
    fireClasses {
      ...fireClassAllFields
    }
  }
  ${fireClassAllFieldsFragment}
`;

export const GET_FIRE_CLASSES_DISABLED = gql`
  query getFireClassesDisabled {
    fireClassesDisabled {
      ...fireClassAllFields
    }
  }
  ${fireClassAllFieldsFragment}
`;

export const REMOVE_FIRE_CLASS = gql`
  mutation removeFireClass($id: String!) {
    removeFireClass(id: $id) {
      ...fireClassAllFields
    }
  }
  ${fireClassAllFieldsFragment}
`;

export const RESTORE_FIRE_CLASS = gql`
  mutation restoreFireClass($id: String!) {
    restoreFireClass(id: $id) {
      ...fireClassAllFields
    }
  }
  ${fireClassAllFieldsFragment}
`;
