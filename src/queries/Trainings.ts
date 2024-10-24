import { gql } from "apollo-boost";
import { volunteerAllFieldsFragment } from "./volunteers";

/**
 * Trainings-related GraphQL operations.
 *
 * This module contains GraphQL fragments, queries, and mutations related to the "Trainings" entity.
 * It allows querying and mutating course data within the application.
 *
 * The fragments are essential for reusability and consistency across various GraphQL operations,
 * ensuring that the same set of fields is queried or mutated as required.
 *
 * Note: This module is a part of the broader GraphQL-based data management strategy in the application,
 * designed to interact with a backend service providing course management features.
 */

const TRAINING_ALL_FIELDS_FRAGMENT = gql`
  fragment trainingAllFields on Training {
    id
    description
    date
    volunteers {
      ...volunteerAllFields
    }
  }
  ${volunteerAllFieldsFragment}
`;

export const GET_TRAININGS = gql`
  query getTrainings {
    trainings {
      ...trainingAllFields
    }
  }
  ${TRAINING_ALL_FIELDS_FRAGMENT}
`;

export const GET_PAGINATED_TRAININGS = gql`
  query getPaginatedTrainings(
    $limit: Float
    $offset: Float
    $sortField: String
    $sortOrder: String
    $searchText: String
    $disabled: Boolean
  ) {
    page: paginatedTrainings(
      limit: $limit
      offset: $offset
      sortField: $sortField
      sortOrder: $sortOrder
      searchText: $searchText
      disabled: $disabled
    ) {
      items {
        ...trainingAllFields
      }
      totalSize
    }
  }
  ${TRAINING_ALL_FIELDS_FRAGMENT}
`;

export const GET_TRAININGS_DISABLED = gql`
  query getTrainingsDisabled {
    trainingsDisabled {
      ...trainingAllFields
    }
  }
  ${TRAINING_ALL_FIELDS_FRAGMENT}
`;

export const FIND_TRAINING = gql`
  query findTraining($id: String!) {
    training(id: $id) {
      ...trainingAllFields
    }
  }
  ${TRAINING_ALL_FIELDS_FRAGMENT}
`;

export const EDIT_TRAINING = gql`
  mutation editTraining($input: UpdateTrainingInput!) {
    updateTraining(updateTrainingInput: $input) {
      ...trainingAllFields
    }
  }
  ${TRAINING_ALL_FIELDS_FRAGMENT}
`;

export const CREATE_TRAINING = gql`
  mutation createTraining($input: CreateTrainingInput!) {
    createTraining(createTrainingInput: $input) {
      ...trainingAllFields
    }
  }
  ${TRAINING_ALL_FIELDS_FRAGMENT}
`;

export const REMOVE_TRAINING = gql`
  mutation removeTraining($id: String!) {
    removeTraining(id: $id) {
      ...trainingAllFields
    }
  }
  ${TRAINING_ALL_FIELDS_FRAGMENT}
`;

export const RESTORE_TRAINING = gql`
  mutation restoreTraining($id: String!) {
    restoreTraining(id: $id) {
      ...trainingAllFields
    }
  }
  ${TRAINING_ALL_FIELDS_FRAGMENT}
`;
