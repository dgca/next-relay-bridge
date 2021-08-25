require("dotenv-flow").config();
const { execSync } = require("child_process");

console.log(
  `Fetching GraphQL Schema from ${process.env.HASURA_RELAY_ENDPOINT}`
);

execSync(
  `get-graphql-schema -h "X-Hasura-Admin-Secret=${process.env.HASURA_ADMIN_SECRET}" ${process.env.HASURA_RELAY_ENDPOINT} > schema.graphql`
);
