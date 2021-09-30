import React from "react";
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
  console.log(data);
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
              {todos.map((todo, i) => (
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
  getInitialProps: async ({ context, preloadQuery }: BridgeWrapperProps) => {
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

    const todosQuery = await preloadQuery(todos_pageQuery, {});

    return {
      todosQuery,
    };
  },
});
