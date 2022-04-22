import { gql } from "apollo-boost";

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
