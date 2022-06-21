import { gql } from "apollo-boost";

export const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(loginInput: { username: $username, password: $password }) {
      access_token
    }
  }
`;
