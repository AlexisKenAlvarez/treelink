"use client";
// ^ this file needs the "use client" pragma

import { ApolloLink, HttpLink, from } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { setContext } from "@apollo/client/link/context";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

// have a function to create a client for you
function makeClient() {
  const httpLink = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: "no-store" },
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  });

  const authMiddleware = setContext(async (operation, { headers }) => {
    try {
      const { token } = await fetch("/api/token").then((res) => res.json());

      return {
        headers: {
          ...headers,
          authorization: `${token}`,
        },
      };
    } catch (error) {
      return {
        headers: {
          ...headers,
          authorization: ``,
        },
      };
    }
  });

  // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    link: authMiddleware.concat(httpLink),
    // link: httpLink,
    cache: new InMemoryCache(),
  });
}

// you need to create a component to wrap your app in
export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <>
        {children}
        <ProgressBar
          height="4px"
          color="#1D4DC9"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </>
    </ApolloNextAppProvider>
  );
}
