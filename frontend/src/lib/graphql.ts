import { gql } from "@/__generated__";

export const USER_QUERY = gql(`
  query GetUserQuery($email: String!) {
    getUser(email: $email) {
      bio
      email
      id
      image
      name
      username
      profile_title
    }
  }
`);

export const ADD_USER_MUTATION = gql(`
  mutation AddUserMutation($user: AddUserInput!) {
    addUser(user: $user) {
      id
      image
      name
    }
  }
`);

export const UPDATE_USER_MUTATION = gql(`
  mutation Mutation($oldValue: UpdateUserInput!, $newValue: UpdateUserInput!) {
    updateUser(oldValue: $oldValue, newValue: $newValue) {
      username
      id
    }
  }
`);
