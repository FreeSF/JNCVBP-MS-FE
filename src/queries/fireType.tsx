import {gql} from "apollo-boost";

export const fireTypeAllFieldsFragment = gql`
    fragment fireTypeAllFields on FireType {
        id, name
    }
`;