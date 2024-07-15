

export const typeDefs = `#graphql
  type User {
    id: Int,
    email: String!,
    username: String,
    name: String!,
    bio: String,
    image: String,
  }
  type Query {
    users: [User],
    getUser(email: String!): User,
  }
  type Mutation {
    addUser(user: AddUserInput!): User,
    updateUser(oldValue: UpdateUserInput!, newValue: UpdateUserInput!): User
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
  }
`