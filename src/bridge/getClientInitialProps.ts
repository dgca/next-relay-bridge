import type {
  GraphQLTaggedNode,
  Variables as RelayVariables,
} from "relay-runtime";

import { GetClientInitialPropsArgs } from "../types";

import makeRawQuery from "../utils/makeRawQuery";
import redirect from "../utils/redirect";

export default async function getClientInitialProps({
  context,
  userGetInitialProps,
}: GetClientInitialPropsArgs): Promise<Record<string, any>> {
  async function preloadQuery(
    query: GraphQLTaggedNode,
    variables: RelayVariables
  ) {
    return makeRawQuery(query, variables);
  }

  const initialProps = await userGetInitialProps({
    context,
    preloadQuery,
  });

  if (initialProps.redirect?.destination) {
    const destination = initialProps.redirect.destination;
    redirect(context, destination);
    return {};
  }

  return initialProps;
}
