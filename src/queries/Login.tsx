import { gql } from "apollo-boost";
import { USER_ALL_FIELDS_FRAGMENT } from "./Users";

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
