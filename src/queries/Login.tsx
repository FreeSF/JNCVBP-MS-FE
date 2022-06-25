import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      access_token
    }
  }
`;

export const USER_ALL_FIELDS_FRAGMENT = gql`
  fragment userAllFields on User {
    id
    username
    firstName
    lastName
    email
    isAdmin
  }
`;

export const CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      ...userAllFields
    }
  }
  ${USER_ALL_FIELDS_FRAGMENT}
`;
