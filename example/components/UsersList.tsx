import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { SafeSuspense } from "../relay/bridge";

import { UsersListQuery as UsersListQueryType } from "../queries/__generated__/UsersListQuery.graphql";

const UsersListQuery = graphql`
  query UsersListQuery {
    users_connection {
      edges {
        node {
          username
        }
      }
    }
  }
`;

function UsersListContent() {
  const data = useLazyLoadQuery<UsersListQueryType>(UsersListQuery, {});
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default function UsersList() {
  return (
    <SafeSuspense fallback="Loading..." clientOnly>
      <UsersListContent />
    </SafeSuspense>
  );
}
