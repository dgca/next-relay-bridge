import { Environment, Network, Store, RecordSource } from "relay-runtime";
import fetchGraphQL from "./fetchGraphQL";

export function createServerNetwork() {
  return Network.create(async (params, variables) => {
    const response = await fetchGraphQL(params.text, variables);
    return response;
  });
}

export function getServerEnvironment(initialState: any) {
  return new Environment({
    network: createServerNetwork(),
    store: new Store(new RecordSource(initialState)),
    isServer: true,
  });
}
