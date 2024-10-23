import { gql } from "apollo-boost";

/**
 * Fire-causes-related GraphQL operations.
 *
 * This module contains GraphQL fragments, queries, and mutations related to the "Fire Cause" entity.
 * It allows querying and mutating course data within the application.
 *
 * The fragments are essential for reusability and consistency across various GraphQL operations,
 * ensuring that the same set of fields is queried or mutated as required.
 *
 * Note: This module is a part of the broader GraphQL-based data management strategy in the application,
 * designed to interact with a backend service providing course management features.
 */

export const fireCauseAllFieldsFragment = gql`
  fragment fireCauseAllFields on FireCause {
    id
    name
  }
`;

export const GET_FIRE_CAUSES = gql`
  query getFireCauses {
    fireCauses {
      ...fireCauseAllFields
    }
  }
  ${fireCauseAllFieldsFragment}
`;

export const GET_FIRE_CAUSES_DISABLED = gql`
  query getFireCausesDisabled {
    fireCausesDisabled {
      ...fireCauseAllFields
    }
  }
  ${fireCauseAllFieldsFragment}
`;

export const REMOVE_FIRE_CAUSE = gql`
  mutation removeFireCause($id: String!) {
    removeFireCause(id: $id) {
      ...fireCauseAllFields
    }
  }
  ${fireCauseAllFieldsFragment}
`;

export const RESTORE_FIRE_CAUSE = gql`
  mutation restoreFireCause($id: String!) {
    restoreFireCause(id: $id) {
      ...fireCauseAllFields
    }
  }
  ${fireCauseAllFieldsFragment}
`;
