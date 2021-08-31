import React from "react";
import { usePreloadedQuery, PreloadedQuery } from "react-relay";
import { graphql, GraphQLTaggedNode } from "relay-runtime";
import Link from "next/link";

import { withPageBridge, SafeSuspense } from "relay/bridge";

import { users_pageQuery as users_pageQueryType } from "queries/__generated__/users_pageQuery.graphql";
import { NextPageContext } from "next";

const users_pageQuery = graphql`
  query users_pageQuery {
    users_connection {
      edges {
        node {
          username
          pk
          todos {
            title
            id
          }
          id
        }
      }
    }
  }
`;

interface UsersProps {
  usersQuery: PreloadedQuery<users_pageQueryType, Record<string, unknown>>;
  thinger?: string;
}

function Users({ usersQuery }: UsersProps) {
  console.log(usersQuery)
  const data = usePreloadedQuery<users_pageQueryType>(
    users_pageQuery,
    usersQuery
  );
  return (
    <div>
      <h1>Users</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

function UsersWrapper(props: UsersProps) {
  return (
    <SafeSuspense fallback="Loading...">
      <Users {...props} />
    </SafeSuspense>
  );
}

interface BridgeWrapperProps {
  context: NextPageContext,
  preloadQuery: (
    users_pageQuery: GraphQLTaggedNode,
    options: Record<string, unknown>
  ) => unknown
}

export default withPageBridge({
  PageComponent: UsersWrapper,
  getInitialProps: async ({ context, preloadQuery }: BridgeWrapperProps ) => {

    // If we needed to redirect from this page, we can return an object
    // like the one below. If the returned props have a `redirect` key of type
    // `{ destination: string, permanent?: boolean | number }`, we'll redirect the user
    // to the destination. `permanent` defaults to `false`. If permanent is `false`,
    // we'll treat it as a 307 redirect. If it's true, it'll be a 308. You can also pass
    // `permanent` a redirect status code to set it directly.
    // return {
    //   redirect: {
    //   destination: "/",
    //     permanent: false,
    //   },
    // };

    const usersQuery = await preloadQuery(users_pageQuery, {});

    return {
      thinger: "hello",
      usersQuery,
    };
  },
});
