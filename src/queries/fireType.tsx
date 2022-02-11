import {gql} from "apollo-boost";

export const fireTypeAllFieldsFragment = gql`
    fragment fireTypeAllFields on FireType {
        id, name
    }
`;

export const GET_FIRE_TYPES = gql`
    query getFireTypes {
        fireTypes {
            ...fireTypeAllFields
        }
    }
    ${fireTypeAllFieldsFragment}
`;
