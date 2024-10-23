import { gql } from "apollo-boost";
import { USER_ALL_FIELDS_FRAGMENT } from "./Users";

/**
 * This file contains the GraphQL queries for the login functionality.
 *
 * The login query takes a username and a password as input and returns an access token if the login is successful.
 * The getCurrentUser query takes an access token as input and returns the user corresponding to the token.
 *
 * The queries are defined using the gql tag from the apollo-boost library.
 */

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      access_token
    }
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
