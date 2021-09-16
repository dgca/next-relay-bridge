export const rawQueryKey = "__nextRelayBridgeQuery__";
const makeRawQuery = function makeRawQuery(query, variables, result) {
    return [rawQueryKey, query, variables, result];
};
export default makeRawQuery;
