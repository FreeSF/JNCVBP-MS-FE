import { gql } from "apollo-boost";

export const REPORT_ALL_FIELDS_FRAGMENT = gql`
  fragment reportAllFields on Report {
    date
    subTypeCount {
      id
      name
      count
    }
    damageCount {
      id
      count
    }
    quantities1044Count {
      id
      count
    }
    possibleCausesCount {
      id
      name
      count
    }
  }
`;

export const GET_REPORT = gql`
  query getReport($startDate: Float!, $endDate: Float!) {
    report(startDate: $startDate, endDate: $endDate) {
      ...reportAllFields
    }
  }
  ${REPORT_ALL_FIELDS_FRAGMENT}
`;
