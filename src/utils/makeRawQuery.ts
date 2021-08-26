export const rawQueryKey = "__nextRelayBridgeQuery__";

export default function makeRawQuery(
  query: any,
  variables: Record<string, any>,
  result?: any
) {
  return [rawQueryKey, query, variables, result];
}
