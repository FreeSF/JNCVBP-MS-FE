import { gql } from "apollo-boost";

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
