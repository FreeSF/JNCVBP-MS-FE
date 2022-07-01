import { gql } from "apollo-boost";

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
