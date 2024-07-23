import { typeDefs } from "./schema.js";
import { decode } from "next-auth/jwt";
import { UTApi } from "uploadthing/server";

import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { getFileKey } from "../lib/ut.js";

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);
const utapi = new UTApi();
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
    themes: async (_, args) => {
      return await prisma.themes.findMany({
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
    getUserWithUsername: async (_, args) => {
      console.log("🚀 ~ getUserWithUsername: ~ args:", args);
      return prisma.users.findUnique({
        where: {
          username: args.username ?? "",
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
      const { value } = args;

      const updateUserQuery = async () => {
        const updateData = {};

        const values = [
          "name",
          "email",
          "bio",
          "image",
          "username",
          "profile_title",
        ];

        const userData = await prisma.users.findUnique({
          where: {
            id: value.id,
          },
        });

        values.forEach((value_key) => {
          if (value[value_key] !== userData[values]) {
            updateData[value_key] = value[value_key];
          }
        });

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
      };

      const user = ctx.token;
      const service_role = ctx.token.service_role;

      if (service_role) {
        return updateUserQuery();
      }

      if (!user) {
        return new Error("You are not authorized");
      }

      if (args.oldValue?.id !== user?.id) {
        return new Error("You are not authorized");
      }

      return updateUserQuery();
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
      const service_role = ctx.token.service_role;

      const updateLinkQuery = async () => {
        const data = await prisma.links.findUnique({
          where: {
            id: args.value.id,
          },
        });

        const values = ["order", "title", "url", "show_icon", "uploaded_icon"];
        const updateData = {};

        values.forEach(async (value) => {
          if (args.value[value] !== null && args.value[value] !== data[value]) {
            updateData[value] = args.value[value];

            if (
              value === "uploaded_icon" &&
              args.value[value] &&
              data.uploaded_icon
            ) {
              console.log("To delete 1");
              await utapi.delete(getFileKey(data.uploaded_icon ?? "") ?? "");
            }
          }
        });

        return await prisma.links.update({
          where: {
            id: args.value.id,
          },
          data: updateData,
        });
      };

      if (service_role) return updateLinkQuery();

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

      return updateLinkQuery();
    },
    removeImage: async (_, args, ctx) => {
      console.log("🚀 ~ removeImage: ~ args:", args);
      const user = ctx.token;

      const data = await prisma.links.findUnique({
        where: {
          id: args.id,
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
      console.log("To delete 2");
      await utapi.deleteFiles(getFileKey(data.uploaded_icon ?? "") ?? "");
      const updateData = {
        uploaded_icon: null,
      };

      return await prisma.links.update({
        where: {
          id: args.id,
        },
        data: updateData,
      });
    },
    deleteLink: async (_, args, ctx) => {
      const user = ctx.token;

      const data = await prisma.links.findUnique({
        where: {
          id: args.id,
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

      if (data.uploaded_icon) {
        await utapi.deleteFiles(getFileKey(data.uploaded_icon ?? "") ?? "");
      }

      return await prisma.links.delete({
        where: {
          id: args.id,
        },
      });
    },
    editBackground: async (_, args, ctx) => {
      console.log("🚀 ~ editBackground: ~ args:", args);
      const user = ctx.token;

      if (!user) {
        return new Error("You are not authorized");
      }

      if (args.id !== user.id) {
        return new Error("You are not authorized");
      }

      const user_query = await prisma.users.findUnique({
        where: {
          id: args.id,
        },
      });

      if (args.action === "ADD") {
        if (user_query.background) {
          await utapi.deleteFiles(
            getFileKey(user_query.background_image) ?? ""
          );
        }
        return await prisma.themes.update({
          where: {
            id: args.id,
          },
          data: {
            background: args.image,
          },
        });
      }

      if (args.action === "REMOVE") {
        if (data.background_image) {
          await utapi.deleteFiles(getFileKey(data.background_image) ?? "");
        }

        return await prisma.themes.update({
          where: {
            id: args.id,
          },
          data: {
            background: null,
          },
        });
      }
    },
    editTheme: async (_, args, ctx) => {
      const user = ctx.token;

      if (!user) {
        return new Error("You are not authorized");
      }

      if (args.value.user_id !== user.id) {
        return new Error("You are not authorized");
      }

      const values = [
        "background_color",
        "title_color",
        "bio_color",
        "frame_active",
        "frame_color",
        "frame_blur",
        "frame_blur_amount",
      ];

      const updateData = {};

      values.forEach(async (value) => {
        if (args.value[value] !== null && args.value[value] !== data[value]) {
          updateData[value] = args.value[value];
        }
      });

      return await prisma.themes.update({
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
    themes: async (parent) => {
      return await prisma.themes.findMany({
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
      const headers = req.headers;
      const token = headers.authorization || "";
      const service_role = headers["x-service-role-key"];

      if (service_role) {
        return { token: { service_role } };
      }

      const decoded = await decode({
        token,
        secret,
        salt:
          process.env.NODE_ENV === "production"
            ? "__Secure-authjs.session-token"
            : "authjs.session-token",
      });

      // Add the user to the context
      return { token: decoded };
    },
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });
};

startApolloServer(app, httpServer);

export default httpServer;
