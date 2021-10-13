import type {
  IEnvironment,
  GraphQLTaggedNode,
  Variables as RelayVariables,
} from "relay-runtime";
import type {
  RecordMap,
  RecordSource,
} from "relay-runtime/lib/store/RelayStoreTypes";
import type { NextPageContext } from "next";
import type { AppProps } from "next/app";

import QueryManager from "./components/QueryManager";
import React from "react";

export type CreateRelayBridgeArgs = {
  getServerEnvironment: (initialStore?: RecordMap) => IEnvironment;
  getClientEnvironment: (initialStore?: RecordMap) => IEnvironment;
};

/**
 * withPageBridge
 */

type MakeRawQueryReturn = [
  "__nextRelayBridgeQuery__",
  GraphQLTaggedNode,
  RelayVariables,
  unknown
];

export type MakeRawQueryType = (
  query: GraphQLTaggedNode,
  variables: RelayVariables,
  result?: unknown
) => MakeRawQueryReturn;

export type GetInitialPropsType = (args: {
  context: NextPageContext;
  preloadQuery: (
    query: GraphQLTaggedNode,
    variables: RelayVariables
  ) => Promise<MakeRawQueryReturn>;
}) => Promise<Record<string, any>>;

export type WithPageBridgeArgs = {
  PageComponent: React.ComponentType<any>;
  getInitialProps: GetInitialPropsType;
};

export type GetClientInitialPropsArgs = {
  context: NextPageContext;
  userGetInitialProps: GetInitialPropsType;
};

export type GetServerInitialPropsArgs = {
  context: NextPageContext;
  userGetInitialProps: GetInitialPropsType;
  getServerEnvironment: () => IEnvironment;
};

/**
 * withAppBridge
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

// QueryManager

export type RelayRecordSourceJSON = ReturnType<RecordSource["toJSON"]>;

export type QueryManagerPropTypes = AppWrapperProps & {
  pageProps: {
    __nextRelayBridgeProps__: {
      initialStore: RelayRecordSourceJSON;
      relayEnvironment: IEnvironment;
    };
  };
  getServerEnvironment: () => IEnvironment;
  getClientEnvironment: (initialStore?: RelayRecordSourceJSON) => IEnvironment;
  AppComponent: WithAppBridgeAppComponent;
};
