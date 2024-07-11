import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './database/schema';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000

const server = new ApolloServer({
  typeDefs,
  resolvers: {},
})

const {url} = await startStandaloneServer(server, {
  listen: {
    port: PORT
  }
})

console.log(`Server ready at port ${PORT}`);
