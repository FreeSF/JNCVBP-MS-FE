import { gql } from "apollo-boost";

const allFieldsFragment = gql`
    fragment rankAllFields on Rank {
        _id, name, isDeletable, description
    }
`;

export const GET_RANKS = gql`
    query getRanks {
        ranks {
            ...rankAllFields
        }
    }
    ${allFieldsFragment}
`;

export const FIND_RANK = gql`
    query findRank($_id: String!) {
        rank(_id: $_id) {
            ...rankAllFields
        }
    }
    ${allFieldsFragment}
`;

export const EDIT_RANK = gql`
    mutation editRank($_id: String!, $name: String!, $isDeletable: Boolean, $description: String){
        editRank(_id: $_id, name: $name, description: $description) {
            ...rankAllFields
        }
    }
    ${allFieldsFragment}
`;

export const CREATE_RANK = gql`
    mutation createRank($input: CreateRankInput!) {
        createRank(createRankInput: $input) {
            ...rankAllFields
        }
    }
    ${allFieldsFragment}
`;

export const DELETE_RANK = gql`
    mutation deleteRank($_id: String!) {
        deleteRank(_id: $_id)
    }
`;
