"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawQueryKey = void 0;
exports.rawQueryKey = "__nextRelayBridgeQuery__";
function makeRawQuery(query, variables, result) {
    return [exports.rawQueryKey, query, variables, result];
}
exports.default = makeRawQuery;
