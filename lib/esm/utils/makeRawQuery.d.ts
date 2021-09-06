import type { GraphQLTaggedNode, Variables as RelayVariables } from "relay-runtime";
export declare const rawQueryKey = "__nextRelayBridgeQuery__";
export default function makeRawQuery(query: GraphQLTaggedNode, variables: RelayVariables, result?: unknown): unknown[];
