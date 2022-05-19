import { gql } from "apollo-boost";

export const subTypeAllFieldsFragment = gql`
  fragment subTypeAllFields on SubType {
    id
    name
    code
  }
`;

export const GET_SUB_TYPES = gql`
  query getSubTypes {
    subTypes {
      ...subTypeAllFields
    }
  }
  ${subTypeAllFieldsFragment}
`;

export const GET_SUB_TYPES_DISABLED = gql`
  query getSubTypesDisabled {
    subTypesDisabled {
      ...subTypeAllFields
    }
  }
  ${subTypeAllFieldsFragment}
`;
