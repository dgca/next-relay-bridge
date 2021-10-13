import { MakeRawQueryType } from "../types";

export const rawQueryKey = "__nextRelayBridgeQuery__";

const makeRawQuery: MakeRawQueryType = function makeRawQuery(
  query,
  variables,
  result
) {
  return [rawQueryKey, query, variables, result];
};

export default makeRawQuery;
