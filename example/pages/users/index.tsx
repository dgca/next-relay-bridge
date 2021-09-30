import React from "react";
import Link from "next/link";

import UsersList from "components/UsersList";

export default function Users() {
  return (
    <div>
      <h1>Users table</h1>
      <Link href="/">
        <a>Home</a>
      </Link>
      <br />
      <br />
      <UsersList />
    </div>
  );
}
