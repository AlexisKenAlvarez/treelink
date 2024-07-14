export const typeDefs = `#graphql
  type User {
    id: ID!,
    username: String,
    name: String!,
    bio: String,
    image: String,
  }
  type Query {
    users: [User],
  }
  type Mutation {
    addUser(id: ID!, username: String, name: String!, bio: String, image: String): User,
  }
`;
