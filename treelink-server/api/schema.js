export const typeDefs = `#graphql
  type User {
    id: Int!,
    email: String!,
    username: String,
    name: String!,
    bio: String,
    image: String!,
    profile_title: String!
    links: [Link!]
    themes: [Theme!]
    premium: Boolean
    privacy: String
  }
  type Link {
    id: Int!
    user: User!
    order: Int!
    title: String!
    url: String!
    show_icon: Boolean!
    uploaded_icon: String
  }
  type Theme {
    id: Int!
    user: User!
    background: String
    background_color: String!
    title_color: String!
    bio_color: String!
    frame_active: Boolean!
    frame_color: String!
    frame_blur: String!
    frame_blur_amount: String!
  }
  type Query {
    users: [User],
    user(id: Int!): User,
    link(id: Int!): Link,
    links(id: Int!): [Link],
    themes(id: Int!): [Theme],
    getUser(email: String!): User,
    getUserWithUsername(username: String!): User,
  }
  type Mutation {
    addUser(user: AddUserInput!): User,
    updateUser(value: UpdateUserInput!): User
    updateLink(value: UpdateLinkInput!): Link
    addLink(value: AddLinkInput!): Link
    removeImage(id: Int!): Link
    deleteLink(id: Int!): Link
    editBackground(id: Int!, image: String, action: String!): User
    editTheme(value: EditThemeInput!): Theme
  }
  input EditThemeInput {
    user_id: Int!
    id: Int!
    background_color: String
    title_color: String
    bio_color: String
    frame_active: Boolean
    frame_color: String
    frame_blur: String
    frame_blur_amount: String
  }
  input UpdateLinkInput {
    id: Int!
    order: Int
    title: String
    url: String
    show_icon: Boolean
    uploaded_icon: String
  }
  input AddLinkInput {
    order: Int!
    user_id: Int!
    title: String!
    url: String!
    show_icon: Boolean!
    uploaded_icon: String
  }
  input AddUserInput {
    username: String,
    name: String!,
    bio: String,
    image: String,
    email: String!
  }
  input UpdateUserInput {
    id: Int,
    username: String,
    name: String,
    bio: String,
    image: String,
    email: String
    profile_title: String
  }
`;
