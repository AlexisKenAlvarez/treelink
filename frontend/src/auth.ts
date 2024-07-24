import { getClient } from "@/lib/client";
import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import {
  ADD_USER_MUTATION,
  UPDATE_USER_MUTATION,
  USER_QUERY,
} from "./lib/graphql";

const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY;

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      username: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async session({ session, token, trigger }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;

      return session;
    },
    async jwt({ token, trigger, session, profile, account, user }) {
      const client = getClient();
      const { data } = await client.query({
        query: USER_QUERY,
        variables: {
          email: token.email ?? "",
        },
      });

      if (data.getUser) {
        token.id = data.getUser.id;
        token.username = data.getUser.username as string;

        if (data.getUser.image !== profile?.picture) {
          await client.mutate({
            mutation: UPDATE_USER_MUTATION,
            variables: {
              value: {
                id: data.getUser.id,
                image: profile?.picture,
              },
            },
            context: {
              headers: {
                "x-service-role-key": SERVICE_ROLE_KEY,
              },
            },
          });
        }
      } else {

        const { data } = await client.mutate({
          mutation: ADD_USER_MUTATION,
          variables: {
            user: {
              name: token.name!,
              email: token.email!,
              image: token.picture!,
            },
          },
        });

        token.id = data?.addUser?.id;
      }

      if (trigger === "update") {
        token.username = session.username;
      }

      return token;
    },
  },
});
