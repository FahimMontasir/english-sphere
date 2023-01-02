import { gql } from '@apollo/client';

export const QUERY_ALL_DATA = gql`
  query GetAllUser {
    users {
      ... on UserSuccessResult {
        users {
          id
          name
          username
        }
      }
      ... on UserErrorResult {
        message
      }
    }
  }
`;

export const QUERY_USER = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      name
      id
      username
    }
  }
`;

export const MUTATION_CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      age
      username
    }
  }
`;
