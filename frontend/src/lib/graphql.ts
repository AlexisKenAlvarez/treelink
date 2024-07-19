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

export const USER_QUERY_WITH_LINK = gql(`
  query GetUserWithLink($email: String!) {
    getUser(email: $email) {
      links {
        id
        title
        order
        url
        uploaded_icon
        show_icon
      }
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

export const ADD_LINK_MUTATION = gql(`
  mutation AddLinkMutation($value: AddLinkInput!) {
  addLink(value: $value) {
    order
    show_icon
    title
    uploaded_icon
    url
  }
}
  `);

export const UPDATE_LINK_MUTATION = gql(`
  mutation UpdateLinkMutation($value: UpdateLinkInput!) {
  updateLink(value: $value) {
    id
  }
}`);
