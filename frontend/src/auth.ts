import { getClient } from "@/lib/client";
import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { ADD_USER_MUTATION, USER_QUERY } from "./lib/graphql";

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

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn() {
      return true;
    },
    async session({ session, token, trigger }) {
      const client = getClient();

      const { data } = await client.query({
        query: USER_QUERY,
        variables: {
          email: token.email,
        },
      });

      if (data.getUser === null) {
        const { data, errors } = await client.mutate({
          mutation: ADD_USER_MUTATION,
          variables: {
            user: {
              name: token.name,
              email: token.email,
              image: token.picture,
            },
          },
        });

        session.user.id = data.addUser.id;

        if (errors) {
          console.error(errors);
        }
      } else {
        session.user.username = data.getUser.username;
        session.user.id = data.getUser.id;
      }

      if (token.username) {
        console.log("token.username", token.username);
        session.user.username === token.username;
      }

      return session;
    },
    async jwt({ token, trigger, session }) {
      if (trigger === "update") {
        token.username = session.username;
      }
      return token;
    },
  },
});
