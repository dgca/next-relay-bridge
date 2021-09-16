/// <reference types="react" />
import type { IEnvironment, GraphQLTaggedNode, Variables as RelayVariables } from "relay-runtime";
import type { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";
import type { NextPageContext } from "next";
import type { AppProps } from "next/app";
import QueryManager from "./components/QueryManager";
export declare type CreateRelayBridgeArgs = {
    getServerEnvironment: (initialStore?: RecordMap) => IEnvironment;
    getClientEnvironment: (initialStore?: RecordMap) => IEnvironment;
};
/**
 * withAppBridgeTypes
 */
export declare type AppWrapperProps = AppProps & {
    relayEnvironment: IEnvironment;
};
export declare type WithAppBridgeAppComponent = React.ComponentType<AppWrapperProps>;
export declare type WithAppBridgeArgs = CreateRelayBridgeArgs & {
    AppComponent: WithAppBridgeAppComponent;
};
export declare type WithAppBridgeReturn = (props: AppWrapperProps) => React.ReactElement<QueryManager>;
/**
 * withPageBridgeTypes
 */
export declare type MakeRawQueryType = (query: GraphQLTaggedNode, variables: RelayVariables, result?: unknown) => ["__nextRelayBridgeQuery__", GraphQLTaggedNode, RelayVariables, unknown];
export declare type WithPageBridgeArgs = {
    PageComponent: React.ComponentType<any>;
    getInitialProps: (args: {
        context: NextPageContext;
        preloadQuery: any;
    }) => Promise<Record<string, any>>;
};
export declare type GetServerInitialPropsArgs = {
    context: NextPageContext;
    userGetInitialProps: any;
    getServerEnvironment: any;
};
export declare type GetInitialPropsReturn = Promise<Record<string, unknown>>;
