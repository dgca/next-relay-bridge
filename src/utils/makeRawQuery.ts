const rawQueryKey = "__nextRelayBridgeQuery__";

export default function makeRawQuery(query: any, variables: any, result?: any) {
  return [rawQueryKey, query, variables, result];
}

export { rawQueryKey };
