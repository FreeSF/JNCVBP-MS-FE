import { gql } from "apollo-boost";
import { volunteerAllFieldsFragment } from "./volunteers";
import { fireTypeAllFieldsFragment } from "./fireType";
import { fireCauseAllFieldsFragment } from "./fireCause";
import { fireClassAllFieldsFragment } from "./fireClass";

const serviceAllFieldsFragment = gql`
  fragment servicesAllFields on Service {
    id
    type
    description
    call_time
    departure_time
    arrival_time
    withdrawal_time
    locality
    neighborhood
    address
    place
    alerted_by
    phone
    received_by
    crew
    volunteers {
      ...volunteerAllFields
    }
    officer_in_charge {
      ...volunteerAllFields
    }
    fire_type {
      ...fireTypeAllFields
    }
    fire_type_total_surface
    fire_type_burned_surface
    fire_type_description
    affected_owner
    affected_owner_description
    possible_cause {
      ...fireCauseAllFields
    }
    possible_cause_other_description
    fire_class {
      ...fireClassAllFields
    }
    magnitude
    damage
    vehicles_used
    other_units
    other_occurrences
    police_force_in_charge
    judge_in_charge

    damage1041
    quantities1044 {
      type
      quantity
    }
    involved_elements
    magnitude1041
    resources_used {
      resource
      quantity
    }

    rescue_type
  }
  ${volunteerAllFieldsFragment}
  ${fireTypeAllFieldsFragment}
  ${fireCauseAllFieldsFragment}
  ${fireClassAllFieldsFragment}
`;

export const GET_SERVICES = gql`
  query getServices {
    services {
      ...servicesAllFields
    }
  }
  ${serviceAllFieldsFragment}
`;

export const FIND_SERVICE = gql`
  query findService($id: String!) {
    service(id: $id) {
      ...servicesAllFields
    }
  }
  ${serviceAllFieldsFragment}
`;

export const EDIT_SERVICE = gql`
  mutation editService($input: UpdateServiceInput!) {
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
