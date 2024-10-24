import { gql } from "apollo-boost";
import { volunteerNameFieldFragment } from "./volunteers";

/**
 * Courses-related GraphQL operations.
 *
 * This module contains GraphQL fragments, queries, and mutations related to the "Course" entity.
 * It allows querying and mutating course data within the application.
 *
 * The fragments are essential for reusability and consistency across various GraphQL operations,
 * ensuring that the same set of fields is queried or mutated as required.
 *
 * Note: This module is a part of the broader GraphQL-based data management strategy in the application,
 * designed to interact with a backend service providing course management features.
 */

const COURSES_ALL_FIELDS_FRAGMENT = gql`
  fragment coursesAllFields on Course {
    id
    description
    date
    details {
      score
      volunteer {
        ...volunteerNameField
      }
    }
  }
  ${volunteerNameFieldFragment}
`;

export const GET_COURSES = gql`
  query getCourses {
    courses {
      ...coursesAllFields
    }
  }
  ${COURSES_ALL_FIELDS_FRAGMENT}
`;

export const GET_PAGINATED_COURSES = gql`
  query getPaginatedCourses(
    $limit: Float
    $offset: Float
    $sortField: String
    $sortOrder: String
    $searchText: String
    $disabled: Boolean
  ) {
    page: paginatedCourses(
      limit: $limit
      offset: $offset
      sortField: $sortField
      sortOrder: $sortOrder
      searchText: $searchText
      disabled: $disabled
    ) {
      items {
        ...coursesAllFields
      }
      totalSize
    }
  }
  ${COURSES_ALL_FIELDS_FRAGMENT}
`;

export const GET_COURSES_DISABLED = gql`
  query getCoursesDisabled {
    coursesDisabled {
      ...coursesAllFields
    }
  }
  ${COURSES_ALL_FIELDS_FRAGMENT}
`;

export const FIND_COURSE = gql`
  query findCourse($id: String!) {
    course(id: $id) {
      ...coursesAllFields
    }
  }
  ${COURSES_ALL_FIELDS_FRAGMENT}
`;

export const EDIT_COURSE = gql`
  mutation editCourse($input: UpdateCourseInput!) {
    updateCourse(updateCourseInput: $input) {
      ...coursesAllFields
    }
  }
  ${COURSES_ALL_FIELDS_FRAGMENT}
`;

export const CREATE_COURSE = gql`
  mutation createCourse($input: CreateCourseInput!) {
    createCourse(createCourseInput: $input) {
      ...coursesAllFields
    }
  }
  ${COURSES_ALL_FIELDS_FRAGMENT}
`;

export const REMOVE_COURSE = gql`
  mutation removeCourse($id: String!) {
    removeCourse(id: $id) {
      ...coursesAllFields
    }
  }
  ${COURSES_ALL_FIELDS_FRAGMENT}
`;

export const RESTORE_COURSE = gql`
  mutation restoreCourse($id: String!) {
    restoreCourse(id: $id) {
      ...coursesAllFields
    }
  }
  ${COURSES_ALL_FIELDS_FRAGMENT}
`;
