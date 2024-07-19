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
    users: async () => {
      return await prisma.users.findMany();
    },
    user: async (_, args) => {
      console.log("🚀 ~ user: ~ args:", args);
      return await prisma.users.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    link: async (_, args) => {
      return await prisma.links.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    links: async (_, args) => {
      return await prisma.links.findMany({
        where: {
          id: args.id,
        },
      });
    },
    getUser: async (_, args) => {
      return prisma.users.findUnique({
        where: {
          email: args.email,
        },
      });
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      return await prisma.users.create({
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
    updateUser: async (_, args, ctx) => {
      const user = ctx.token;

      if (!user) {
        return new Error("You are not authorized");
      }

      if (args.oldValue?.id !== user?.id) {
        return new Error("You are not authorized");
      }

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

      try {
        if (Object.keys(updateData).length > 0) {
          return await prisma.users.update({
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
    addLink: async (_, args) => {
      return await prisma.links.create({
        data: {
          order: args.value.order,
          title: args.value.title,
          url: args.value.url,
          show_icon: args.value.show_icon,
          uploaded_icon: args.value.uploaded_icon,
          user_id: args.value.user_id,
        },
      });
    },
    updateLink: async (_, args, ctx) => {
      const user = ctx.token;

      const data = await prisma.links.findUnique({
        where: {
          id: args.value.id,
        },
      });

      if (!user) {
        console.log("Hindi lumagpas as authorization");
        return new Error("You are not authorized");
      }

      if (data.user_id !== user.id) {
        return new Error("You are not authorized");
      }

      if (!data) {
        return new Error("Link not found");
      }

      const updateData = {};

      if (args.value?.order !== data.order) {
        updateData.order = args.value.order;
      }

      if (args.value.title !== data.title) {
        updateData.title = args.value.title;
      }

      if (args.value.url !== data.url) {
        updateData.url = args.value.url;
      }

      if (args.value.show_icon !== data.show_icon) {
        updateData.show_icon = args.value.show_icon;
      }

      if (args.value.uploaded_icon !== data.uploaded_icon) {
        updateData.uploaded_icon = args.value.uploaded_icon;
      }

      return await prisma.links.update({
        where: {
          id: args.value.id,
        },
        data: updateData,
      });
    },
  },
  User: {
    links: async (parent) => {
      return await prisma.links.findMany({
        where: {
          user_id: parent.id,
        },
        orderBy: {
          order: "asc",
        },
      });
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
