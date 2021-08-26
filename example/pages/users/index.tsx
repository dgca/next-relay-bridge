import React from "react";
import { usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime";
import Link from "next/link";

import { withPageBridge, SafeSuspense } from "relay/bridge";

import { users_pageQuery as users_pageQueryType } from "queries/__generated__/users_pageQuery.graphql";

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

function Users({ usersQuery }) {
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

function UsersWrapper(props: any) {
  return (
    <SafeSuspense fallback="Loading...">
      <Users {...props} />
    </SafeSuspense>
  );
}

export default withPageBridge({
  PageComponent: UsersWrapper,
  getInitialProps: async ({ context, preloadQuery }) => {
    const usersQuery = await preloadQuery(users_pageQuery, {});

    return {
      thinger: "hello",
      usersQuery,
    };
  },
});
