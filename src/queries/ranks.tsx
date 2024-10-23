import { gql } from "apollo-boost";

/**
 * Ranks-related GraphQL operations.
 *
 * This module contains GraphQL fragments, queries, and mutations related to the "Rank" entity.
 * It allows querying and mutating course data within the application.
 *
 * The fragments are essential for reusability and consistency across various GraphQL operations,
 * ensuring that the same set of fields is queried or mutated as required.
 *
 * Note: This module is a part of the broader GraphQL-based data management strategy in the application,
 * designed to interact with a backend service providing course management features.
 */

export const rankAllFieldsFragment = gql`
  fragment rankAllFields on Rank {
    id
    name
    isDeletable
    description
  }
`;

export const GET_RANKS = gql`
  query getRanks {
    ranks {
      ...rankAllFields
    }
  }
  ${rankAllFieldsFragment}
`;

export const GET_RANKS_DISABLED = gql`
  query getRanksDisabled {
    ranksDisabled {
      ...rankAllFields
    }
  }
  ${rankAllFieldsFragment}
`;

export const FIND_RANK = gql`
  query findRank($id: String!) {
    rank(id: $id) {
      ...rankAllFields
    }
  }
  ${rankAllFieldsFragment}
`;

export const EDIT_RANK = gql`
  mutation editRank($input: UpdateRankInput!) {
    updateRank(updateRankInput: $input) {
      ...rankAllFields
    }
  }
  ${rankAllFieldsFragment}
`;

export const CREATE_RANK = gql`
  mutation createRank($input: CreateRankInput!) {
    createRank(createRankInput: $input) {
      ...rankAllFields
    }
  }
  ${rankAllFieldsFragment}
`;

export const DELETE_RANK = gql`
  mutation deleteRank($id: String!) {
    removeRank(id: $id) {
      id
    }
  }
`;

export const RESTORE_RANK = gql`
  mutation restoreRank($id: String!) {
    restoreRank(id: $id) {
      id
    }
  }
`;
