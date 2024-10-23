import { gql } from "apollo-boost";

/**
 * Users-related GraphQL operations.
 *
 * This module contains GraphQL fragments, queries, and mutations related to the "User" entity.
 * It allows querying and mutating course data within the application.
 *
 * The fragments are essential for reusability and consistency across various GraphQL operations,
 * ensuring that the same set of fields is queried or mutated as required.
 *
 * Note: This module is a part of the broader GraphQL-based data management strategy in the application,
 * designed to interact with a backend service providing course management features.
 */

export const USER_ALL_FIELDS_FRAGMENT = gql`
  fragment userAllFields on User {
    id
    isAdmin
    email
    lastName
    firstName
    username
  }
`;

export const GET_USERS = gql`
  query getUsers {
    users {
      ...userAllFields
    }
  }
  ${USER_ALL_FIELDS_FRAGMENT}
`;

export const GET_PAGINATED_USERS = gql`
  query getPaginatedUsers(
    $limit: Float
    $offset: Float
    $sortField: String
    $sortOrder: String
    $searchText: String
    $disabled: Boolean
  ) {
    page: paginatedUsers(
      limit: $limit
      offset: $offset
      sortField: $sortField
      sortOrder: $sortOrder
      searchText: $searchText
      disabled: $disabled
    ) {
      items {
        ...userAllFields
      }
      totalSize
    }
  }
  ${USER_ALL_FIELDS_FRAGMENT}
`;

export const GET_USERS_DISABLED = gql`
  query getUsersDisabled {
    usersDisabled {
      ...userAllFields
    }
  }
  ${USER_ALL_FIELDS_FRAGMENT}
`;

export const FIND_USER = gql`
  query findUser($id: String!) {
    user(id: $id) {
      ...userAllFields
    }
  }
  ${USER_ALL_FIELDS_FRAGMENT}
`;

export const EDIT_USER = gql`
  mutation editUser($input: UpdateUserInput!) {
    updateUser(updateUserInput: $input) {
      ...userAllFields
    }
  }
  ${USER_ALL_FIELDS_FRAGMENT}
`;

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      ...userAllFields
    }
  }
  ${USER_ALL_FIELDS_FRAGMENT}
`;

export const REMOVE_USER = gql`
  mutation removeUser($id: String!) {
    removeUser(id: $id) {
      ...userAllFields
    }
  }

  ${USER_ALL_FIELDS_FRAGMENT}
`;

export const RESTORE_USER = gql`
  mutation restoreUser($id: String!) {
    restoreUser(id: $id) {
      ...userAllFields
    }
  }

  ${USER_ALL_FIELDS_FRAGMENT}
`;
