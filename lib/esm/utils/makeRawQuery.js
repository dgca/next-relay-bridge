export var rawQueryKey = "__nextRelayBridgeQuery__";
var makeRawQuery = function makeRawQuery(query, variables, result) {
    return [rawQueryKey, query, variables, result];
};
export default makeRawQuery;
