import {gql} from "apollo-boost";

export const fireCauseAllFieldsFragment = gql`
    fragment fireCauseAllFields on FireCause {
        id, name
    }
`;

export const GET_FIRE_CAUSES = gql`
    query getFireCauses {
        fireCauses {
            ...fireCauseAllFields
        }
    }
    ${fireCauseAllFieldsFragment}  
`