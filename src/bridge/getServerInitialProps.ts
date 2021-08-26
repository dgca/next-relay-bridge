import { loadQuery } from "react-relay";
import makeRawQuery from "../utils/makeRawQuery";

import type { PreloadedQuery } from "react-relay";

function awaitQuery(query: PreloadedQuery<any, any>) {
  return new Promise<void>((resolve, reject) => {
    if (!query?.source?.subscribe) {
      return;
    }

    query.source.subscribe({
      complete: resolve,
      error: reject,
    });
  });
}

type GetServerInitialPropsType = (options: {
  context: any;
  userGetInitialProps: any;
  getServerEnvironment: any;
}) => any;

const getServerInitialProps: GetServerInitialPropsType =
  async function getServerInitialProps({
    context,
    userGetInitialProps,
    getServerEnvironment,
  }) {
    const relayEnvironment = getServerEnvironment();

    async function preloadQuery(query: any, variables: any) {
      const loadedQuery = loadQuery(relayEnvironment, query, variables);

      await awaitQuery(loadedQuery);

      return makeRawQuery(query, variables, loadedQuery);
    }

    const initialProps = await userGetInitialProps({
      context,
      preloadQuery,
    });

    const serializedStore =
      relayEnvironment?.getStore().getSource().toJSON() || null;

    return {
      ...initialProps,
      __nextRelayBridgeProps__: {
        initialStore: serializedStore,
        relayEnvironment,
      },
    };
  };

export default getServerInitialProps;
