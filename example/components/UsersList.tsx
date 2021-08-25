import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { SafeSuspense } from "../relay/bridge";

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
  const data = useLazyLoadQuery(UsersListQuery, {});
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default function UsersList() {
  return (
    <SafeSuspense fallback="Loading...">
      <UsersListContent />
    </SafeSuspense>
  );
}
