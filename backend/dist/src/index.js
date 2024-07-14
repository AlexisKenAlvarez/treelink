import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { PrismaClient } from "@prisma/client";
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const prisma = new PrismaClient();
const resolvers = {
    Query: {
        users: () => {
            return prisma.users.findMany();
        },
        getUser: (_, args) => {
            return prisma.users.findUnique({
                where: {
                    email: args.email,
                },
            });
        }
    },
    Mutation: {
        addUser: (_, args) => {
            console.log("args", args);
            return prisma.users.create({
                data: {
                    id: args.user.id,
                    name: args.user.name,
                    email: args.user.email,
                    bio: args.user.bio,
                    image: args.user.image,
                    username: args.user.username
                },
            });
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const { url } = await startStandaloneServer(server, {
    listen: {
        port: PORT,
    },
});
console.log(`Server ready at port ${PORT}`);
