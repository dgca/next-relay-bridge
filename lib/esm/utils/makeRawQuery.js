var rawQueryKey = "__nextRelayBridgeQuery__";
export default function makeRawQuery(query, variables, result) {
    return [rawQueryKey, query, variables, result];
}
export { rawQueryKey };
