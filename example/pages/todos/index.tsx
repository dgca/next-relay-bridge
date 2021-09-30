import React, { Suspense } from "react";
import { usePreloadedQuery, PreloadedQuery } from "react-relay";
import { graphql, GraphQLTaggedNode } from "relay-runtime";
import Link from "next/link";

import { withPageBridge, SafeSuspense } from "relay/bridge";

import { todos_pageQuery as todos_pageQueryType } from "queries/__generated__/todos_pageQuery.graphql";
import { NextPageContext } from "next";

const todos_pageQuery = graphql`
  query todos_pageQuery {
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
  todosQuery: PreloadedQuery<todos_pageQueryType, Record<string, unknown>>;
}

function Users({ todosQuery }: UsersProps) {
  const data = usePreloadedQuery(todos_pageQuery, todosQuery);
  return (
    <div>
      <h1>Todos</h1>
      <Link href="/">
        <a>Home</a>
      </Link>

      {data.users_connection?.edges.map(({ node }) => {
        const { username, pk, todos } = node;
        return (
          <div key={pk as string}>
            <h2>{username}&apos;s todos:</h2>
            <ul>
              {todos?.map((todo, i) => (
                <li key={i}>{todo.title}</li>
              ))}
            </ul>
          </div>
        );
      })}
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
  context: NextPageContext;
  preloadQuery: (
    users_pageQuery: GraphQLTaggedNode,
    options: Record<string, unknown>
  ) => unknown;
}

export default withPageBridge({
  PageComponent: UsersWrapper,
  getInitialProps: async ({ preloadQuery }: BridgeWrapperProps) => {
    const todosQuery = await preloadQuery(todos_pageQuery, {});

    return {
      todosQuery,
    };
  },
});
