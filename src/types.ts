import type {
  IEnvironment,
  GraphQLTaggedNode,
  Variables as RelayVariables,
} from "relay-runtime";
import type { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";
import type { NextPageContext } from "next";
import type { AppProps } from "next/app";

import QueryManager from "./components/QueryManager";

export type CreateRelayBridgeArgs = {
  getServerEnvironment: (initialStore?: RecordMap) => IEnvironment;
  getClientEnvironment: (initialStore?: RecordMap) => IEnvironment;
};

/**
 * withAppBridgeTypes
 */

export type AppWrapperProps = AppProps & {
  relayEnvironment: IEnvironment;
};

export type WithAppBridgeAppComponent = React.ComponentType<AppWrapperProps>;

export type WithAppBridgeArgs = CreateRelayBridgeArgs & {
  AppComponent: WithAppBridgeAppComponent;
};

export type WithAppBridgeReturn = (
  props: AppWrapperProps
) => React.ReactElement<QueryManager>;

/**
 * withPageBridgeTypes
 */

export type MakeRawQueryType = (
  query: GraphQLTaggedNode,
  variables: RelayVariables,
  result?: unknown
) => ["__nextRelayBridgeQuery__", GraphQLTaggedNode, RelayVariables, unknown];

export type WithPageBridgeArgs = {
  PageComponent: React.ComponentType<any>;
  getInitialProps: (args: {
    context: NextPageContext;
    preloadQuery: any;
  }) => Promise<Record<string, any>>;
};

export type GetServerInitialPropsArgs = {
  context: NextPageContext;
  userGetInitialProps: any;
  getServerEnvironment: any;
};

export type GetInitialPropsReturn = Promise<Record<string, unknown>>;
