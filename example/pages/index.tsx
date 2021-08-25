import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import UsersList from "components/UsersList";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>next-relay-bridge</h1>
        <Link href="/users">
          <a>Users page</a>
        </Link>
        <br />
        <UsersList />
      </main>
    </div>
  );
};

export default Home;
