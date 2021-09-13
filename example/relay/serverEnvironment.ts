import { Environment, Network, Store, RecordSource, GraphQLResponse } from "relay-runtime";
import fetchGraphQL from "./fetchGraphQL";

export function createServerNetwork() {
  return Network.create(async (params, variables) => {
    const response: GraphQLResponse = await fetchGraphQL(params.text, variables);
    return response;
  });
}

export function getServerEnvironment() {
  return new Environment({
    network: createServerNetwork(),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}
