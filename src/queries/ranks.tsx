import { gql } from "apollo-boost";

const allFieldsFragment = gql`
    fragment rankAllFields on Rank {
        id, name, isDeletable, description
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
    query findRank($id: String!) {
        rank(id: $id) {
            ...rankAllFields
        }
    }
    ${allFieldsFragment}
`;

export const EDIT_RANK = gql`
    mutation editRank($id: String!, $name: String!, $isDeletable: Boolean, $description: String){
        updateRank(updateRankInput: {id: $id, name: $name, description: $description}) {
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
    mutation deleteRank($id: String!) {
        removeRank(id: $id) {id}
    }
`;
