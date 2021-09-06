import type {
  GraphQLTaggedNode,
  Variables as RelayVariables,
} from "relay-runtime";

export const rawQueryKey = "__nextRelayBridgeQuery__";

export default function makeRawQuery(
  query: GraphQLTaggedNode,
  variables: RelayVariables,
  result?: unknown
) {
  return [rawQueryKey, query, variables, result];
}
