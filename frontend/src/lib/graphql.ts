import { gql } from "@apollo/client";

export const USER_QUERY = gql`
  query GetUser($email: String!) {
    getUser(email: $email) {
      username
      id
    }
  }
`;

export const ADD_USER_MUTATION = gql`
  mutation Mutation($user: AddUserInput!) {
    addUser(user: $user) {
      id
      image
      name
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation Mutation($oldValue: UpdateUserInput!, $newValue: UpdateUserInput!) {
    updateUser(oldValue: $oldValue, newValue: $newValue) {
      username
      id
    }
  }
`;
