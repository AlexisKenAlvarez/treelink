export const typeDefs = `#graphql
  type User {
    id: ID!,
    username: String!,
    name: String!,
    bio: String,
    image: String,
  }
  type Socials {
    id: ID!,
    name: String!,
    link: String!,
  }
  type Query {
    users: [User],
    socials: [Socials],
  }
`