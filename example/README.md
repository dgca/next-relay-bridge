
# Description

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Then a simple example of next-relay-bridge was added.


## Getting Started

Relay consumes a GraphQL endpoint. If you don't already have an one available, [Hasura](https://hasura.io/) is an easy way to set up a free GraphQL endpoint. Follow their instructions for setting up Hasura with [a free Heroku database](https://hasura.io/docs/latest/graphql/cloud/getting-started/index.html#step-3-connect-new-existing-database), or [using a Docker image](https://hasura.io/docs/latest/graphql/core/getting-started/docker-simple.html).

Once a database is connected, create two tables.

```
todos
  title - text, not null
  pk - UUID, unique
  created_by - UUID

users
  username - text, not null
  pk - UUID, unique
```

Then add a Foreign Key to todos matching created_by to users.pk.

Then modify the users table relationships and add the recommended relationship as the name `todos`.

Create some users and some todos. You can use [UUIDTools](https://www.uuidtools.com/v4) to generate random UUIDs.

Then, in the code, rename `EXAMPLE.env.local` to `.env.local`.

Then run the development server.

```bash
yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
