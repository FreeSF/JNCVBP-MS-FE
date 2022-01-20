import {gql} from "apollo-boost";
import {volunteerAllFieldsFragment} from "./volunteers";

const serviceAllFieldsFragment = gql`
    fragment servicesAllFields on Service {
        id, description, call_time,
        departure_time, arrival_time,
        withdrawal_time, locality, neighborhood,
        address, place, alerted_by, phone,
        received_by, crew, volunteers {
            ...volunteerAllFields
        }, officer_in_charge { ...volunteerAllFields },
        
    }
    ${volunteerAllFieldsFragment}
`;

export const GET_SERVICES = gql`
    query getServices {
        services {
            ...servicesAllFields
        }
    }
    ${serviceAllFieldsFragment}
`

export const FIND_SERVICE = gql`
    query findService($id: String!) {
        service(id: $id){
            ...servicesAllFields
        }
    }
    ${serviceAllFieldsFragment}
`



export const EDIT_SERVICE = gql`
    mutation editService($input: UpdateServiceInput!){
        updateService(updateServiceInput: $input) {
            ...servicesAllFields
        }
    }
    ${serviceAllFieldsFragment}
`;

export const CREATE_SERVICE = gql`
    mutation createService($input: CreateServiceInput!) {
        createService(createServiceInput: $input) {
            ...servicesAllFields
        }
    }
    ${serviceAllFieldsFragment}
`;

export const REMOVE_SERVICE = gql`
    mutation removeService($id: String!) {
        removeService(id: $id) {
            ...servicesAllFields
        }
    }
    ${serviceAllFieldsFragment}
`;
