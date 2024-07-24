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
      premium
      privacy
    }
  }
`);

export const GET_USER_WITH_USERNAME = gql(`
  query GetUsernameUser($username: String!) {
  getUserWithUsername(username: $username) {
    id
    email
    username
    name
    bio
    image
    profile_title
    links {
      id
      order
      title
      url
      show_icon
      uploaded_icon
    }
    premium
    privacy
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
  mutation Mutation($value: UpdateUserInput!) {
    updateUser(value: $value) {
    id
    email
    username
  }
}

`);

export const ADD_LINK_MUTATION = gql(`
  mutation AddLinkMutation($value: AddLinkInput!) {
  addLink(value: $value) {
    id
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

export const REMOVE_IMAGE_MUTATION = gql(`
  mutation RemoveImageMutation($removeImageId: Int!) {
  removeImage(id: $removeImageId) {
    id
  }
}
  `);

export const DELETE_LINK_MUTATION = gql(`
  mutation DeleteLinkMutation($removeImageId: Int!) {
  deleteLink(id: $removeImageId) {
    id
  }
}
  `);

export const EDIT_BACKGROUND_MUTATION = gql(`
  mutation EditBackgroundMutation($editBackgroundId: Int!, $action: String!, $image: String) {
  editBackground(id: $editBackgroundId, action: $action, image: $image) {
    id
  }
}
  `);
