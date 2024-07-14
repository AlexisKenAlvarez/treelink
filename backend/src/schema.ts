

export const typeDefs = `#graphql
  type User {
    id: ID,
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
  }
  input AddUserInput {
    id: ID
    username: String,
    name: String!,
    bio: String,
    image: String,
    email: String!
  }
`