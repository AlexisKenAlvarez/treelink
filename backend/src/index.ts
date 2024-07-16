import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { PrismaClient } from "@prisma/client";
import { decode } from "next-auth/jwt";

// import jwt from "jsonwebtoken";

type User = {
  id: number;
  name: string;
  email: string;
  picture: string;
};

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
          profile_title: args.user.name,
        },
      });
    },
    updateUser: (_, args, ctx) => {
      const user = ctx.token as User;

      type updateDataType = {
        name?: string;
        email?: string;
        bio?: string;
        image?: string;
        username?: string;
        profile_title?: string;
      };
      const { oldValue, newValue } = args;
      const updateData: updateDataType = {};

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

      if (oldValue.profile_title !== newValue.profile_title) {
        updateData.profile_title = newValue.profile_title;
      }

      if (args.oldValue?.id === user?.id) {
        console.log("This is the correct user that requested it");
      } else {
        console.log("Incorrect user!");
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
      } catch (error) {
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
  context: async ({ req, res }) => {
    // Get the user token from the headers.
    const token = req.headers.authorization || "";

    const secret = process.env.AUTH_SECRET;

    if (!secret) {
      throw new Error("No auth secret");
    }

    const decoded = await decode({
      token,
      secret,
      salt:
        process.env.NODE_ENV === "production"
          ? "__Secure-authjs.session-token"
          : "authjs.session-token",
    });

    console.log("Decoded", decoded);

    // Add the user to the context
    return { token: decoded as User };
  },
});

console.log(`Server ready at port ${PORT}`);
