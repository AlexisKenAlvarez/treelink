import { typeDefs } from "./schema.js";
import { decode } from "next-auth/jwt";

import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: () => {
      return prisma.users.findMany();
    },
    getUser: (_, args) => {
      console.log("🚀 ~ args:", args);
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
      const user = ctx.token;

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

const secret = process.env.AUTH_SECRET;

const startApolloServer = async (app, httpServer) => {
  const server = new ApolloServer({
    introspection: true,
    cors: false,
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req, res }) => {
      // Get the user token from the headers.
      const token = req.headers.authorization || "";

      console.log("🚀 ~ secret:", secret);

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
      return { token: decoded };
    },
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });
};

startApolloServer(app, httpServer);

export default httpServer;
