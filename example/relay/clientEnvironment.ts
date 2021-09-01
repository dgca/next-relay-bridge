import { Environment, Network, Store, RecordSource } from "relay-runtime";
import fetchGraphQL from "./fetchGraphQL";

export function createClientNetwork() {
  return Network.create(async (params, variables) => (
    await fetchGraphQL(params.text, variables)
  ));
}

let clientEnv: Environment | undefined;

export function getClientEnvironment(initialState: Record<string, any> = {}) {
  return (clientEnv !== undefined)
    ? clientEnv
    : new Environment({
      network: createClientNetwork(),
      store: new Store(new RecordSource(initialState)),
      isServer: false,
    });
}
