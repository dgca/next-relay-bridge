import { useLazyLoadQuery } from "react-relay";
import { graphql } from "relay-runtime";
import { SafeSuspense } from "../relay/bridge";
import { UsersListQuery } from "queries/__generated__/UsersListQuery.graphql";

const usersListQuery = graphql`
  query UsersListQuery {
    users_connection {
      edges {
        node {
          username
          email
        }
      }
    }
  }
`;

function UsersListContent() {
  const data = useLazyLoadQuery<UsersListQuery>(usersListQuery, {});
  const users = data.users_connection.edges.map((edge) => edge.node);

  return (
    <table>
      <thead>
        <th>Username</th>
        <th>Email</th>
      </thead>
      <tbody>
        {users.map(({ username, email }) => (
          <tr key={username}>
            <td>{username}</td>
            <td>{email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  return <pre>{JSON.stringify(users, null, 2)}</pre>;
}

export default function UsersList() {
  return (
    <SafeSuspense fallback="Loading..." clientOnly>
      <UsersListContent />
    </SafeSuspense>
  );
}
