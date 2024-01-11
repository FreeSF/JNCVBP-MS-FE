import { gql } from "apollo-boost";

export const REPORT_ALL_FIELDS_FRAGMENT = gql`
  fragment reportAllFields on Report {
    date
    startDate
    endDate
    subTypeCount1040 {
      id
      name
      count
    }
    subTypeCount1041 {
      id
      name
      count
    }
    subTypeCount1043 {
      id
      name
      count
    }
    count1040
    count1041
    count1043
    damageCount {
      id
      count
    }
    quantities1044Count1040 {
      id
      count
    }
    quantities1044Count1041 {
      id
      count
    }
    quantities1044Count1043 {
      id
      count
    }
    involvedElementsCount {
      id
      count
    }
    magnitude1041Count {
      id
      count
    }
    possibleCausesCount {
      id
      name
      count
    }
    possibleCausesCount {
      id
      name
      count
    }
    resourcesUsedCount1040 {
      id
      name
      count
    }
    resourcesUsedCount1041 {
      id
      name
      count
    }
    rescueTypeCount {
      id
      name
      count
    }
    damage1041Count {
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
