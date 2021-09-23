import { gql } from "apollo-boost";

const allFieldsFragment = gql`
    fragment dutyAllFields on Duty {
        id, name, isDeletable, description
    }
`;

export const GET_DUTIES = gql`
    query getDuties {
        duties {
            ...dutyAllFields
        }
    }
    ${allFieldsFragment}
`;

export const FIND_DUTY = gql`
    query findDuty($id: String!) {
        duty(id: $id) {
            ...dutyAllFields
        }
    }
    ${allFieldsFragment}
`;

export const EDIT_DUTY = gql`
    mutation editDuty($id: String!, $name: String!, $isDeletable: Boolean, $description: String){
        updateDuty(updateDutyInput: {id: $id, name: $name, description: $description}) {
            ...dutyAllFields
        }
    }
    ${allFieldsFragment}
`;

export const CREATE_DUTY = gql`
    mutation createDuty($input: CreateDutyInput!) {
        createDuty(createDutyInput: $input) {
            ...dutyAllFields
        }
    }
    ${allFieldsFragment}
`;

export const DELETE_DUTY = gql`
    mutation deleteDuty($id: String!) {
        removeDuty(id: $id) {id}
    }
`;
