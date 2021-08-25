"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawQueryKey = void 0;
var rawQueryKey = "__nextRelayBridgeQuery__";
exports.rawQueryKey = rawQueryKey;
function makeRawQuery(query, variables, result) {
    return [rawQueryKey, query, variables, result];
}
exports.default = makeRawQuery;
