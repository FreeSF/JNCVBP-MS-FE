import { gql } from "apollo-boost";

export const fireCauseAllFieldsFragment = gql`
  fragment fireCauseAllFields on FireCause {
    id
    name
  }
`;

export const GET_FIRE_CAUSES = gql`
  query getFireCauses {
    fireCauses {
      ...fireCauseAllFields
    }
  }
  ${fireCauseAllFieldsFragment}
`;

export const GET_FIRE_CAUSES_DISABLED = gql`
  query getFireCausesDisabled {
    fireCausesDisabled {
      ...fireCauseAllFields
    }
  }
  ${fireCauseAllFieldsFragment}
`;

export const REMOVE_FIRE_CAUSE = gql`
  mutation removeFireCause($id: String!) {
    removeFireCause(id: $id) {
      ...fireCauseAllFields
    }
  }
  ${fireCauseAllFieldsFragment}
`;

export const RESTORE_FIRE_CAUSE = gql`
  mutation restoreFireCause($id: String!) {
    restoreFireCause(id: $id) {
      ...fireCauseAllFields
    }
  }
  ${fireCauseAllFieldsFragment}
`;
