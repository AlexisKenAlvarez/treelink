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
  type Query {
    users: [User],
    user(id: Int!): User,
    link(id: Int!): Link,
    links(id: Int!): [Link],
    getUser(email: String!): User,
  }
  type Mutation {
    addUser(user: AddUserInput!): User,
    updateUser(oldValue: UpdateUserInput!, newValue: UpdateUserInput!): User
    updateLink(value: UpdateLinkInput!): Link
    addLink(value: AddLinkInput!): Link
  }
  input UpdateLinkInput {
    id: Int!
    order: Int
    title: String!
    url: String!
    show_icon: Boolean!
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
