import { gql } from "apollo-boost";
import { fireCauseAllFieldsFragment } from "./fireCause";

export const fireClassAllFieldsFragment = gql`
  fragment fireClassAllFields on FireClass {
    id
    name
  }
`;

export const GET_FIRE_CLASSES = gql`
  query getFireClasses {
    fireClasses {
      ...fireClassAllFields
    }
  }
  ${fireClassAllFieldsFragment}
`;

export const GET_FIRE_CLASSES_DISABLED = gql`
  query getFireClassesDisabled {
    fireClassesDisabled {
      ...fireClassAllFields
    }
  }
  ${fireClassAllFieldsFragment}
`;

export const REMOVE_FIRE_CLASS = gql`
  mutation removeFireClass($id: String!) {
    removeFireClass(id: $id) {
      ...fireClassAllFields
    }
  }
  ${fireClassAllFieldsFragment}
`;

export const RESTORE_FIRE_CLASS = gql`
  mutation restoreFireClass($id: String!) {
    restoreFireClass(id: $id) {
      ...fireClassAllFields
    }
  }
  ${fireClassAllFieldsFragment}
`;
