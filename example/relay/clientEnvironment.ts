import { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";
import { Environment, Network, Store, RecordSource } from "relay-runtime";
import fetchGraphQL from "./fetchGraphQL";

export function createClientNetwork() {
  return Network.create(async (params, variables) => {
    const response = await fetchGraphQL(params.text, variables);
    return response;
  });
}

let clientEnv: Environment | undefined;

export function getClientEnvironment(initialState: RecordMap | undefined = {}) {
  if (clientEnv === undefined) {
    clientEnv = new Environment({
      network: createClientNetwork(),
      store: new Store(new RecordSource(initialState)),
      isServer: false,
    });
  }

  return clientEnv;
}
