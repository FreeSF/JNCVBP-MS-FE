import { gql } from "apollo-boost";

/**
 * SubType queries
 *
 * This file contains GraphQL queries related to Sub-Types.
 */

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
