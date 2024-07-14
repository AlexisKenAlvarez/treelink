import NextAuth, { type DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
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
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, token }) {
      const client = getClient();

      const { data } = await client.query({
        query: USER_QUERY,
        variables: {
          email: token.email,
        },
      });

      if (data.getUser === null) {
        const { errors } = await client.mutate({
          mutation: ADD_USER_MUTATION,
          variables: {
            user: {
              name: token.name,
              email: token.email,
              image: token.picture,
            },
          },
        });

        if (errors) {
          console.error(errors);
        }
      } else {
        session.user.username = data.getUser.username;
      }

      return session;
    },
    async jwt({ token, user, account, profile, session }) {
      return token;
    },
  },
});
