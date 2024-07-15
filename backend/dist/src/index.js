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
        },
    },
    Mutation: {
        addUser: (_, args) => {
            return prisma.users.create({
                data: {
                    id: args.user.id,
                    name: args.user.name,
                    email: args.user.email,
                    bio: args.user.bio,
                    image: args.user.image,
                    username: args.user.username,
                },
            });
        },
        updateUser: (_, args) => {
            console.log("🚀 ~ args:", args);
            const { oldValue, newValue } = args;
            const updateData = {};
            if (oldValue.name !== newValue.name) {
                updateData.name = newValue.name;
            }
            if (oldValue.email !== newValue.email) {
                updateData.email = newValue.email;
            }
            if (oldValue.bio !== newValue.bio) {
                updateData.bio = newValue.bio;
            }
            if (oldValue.image !== newValue.image) {
                updateData.image = newValue.image;
            }
            if (oldValue.username !== newValue.username) {
                updateData.username = newValue.username;
            }
            try {
                if (Object.keys(updateData).length > 0) {
                    return prisma.users.update({
                        where: {
                            id: oldValue.id,
                        },
                        data: updateData,
                    });
                }
            }
            catch (error) {
                console.log("Error updating the user");
                console.log(error);
            }
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
