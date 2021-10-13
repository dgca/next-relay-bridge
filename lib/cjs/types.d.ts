import type { IEnvironment, GraphQLTaggedNode, Variables as RelayVariables } from "relay-runtime";
import type { RecordMap, RecordSource } from "relay-runtime/lib/store/RelayStoreTypes";
import type { NextPageContext } from "next";
import type { AppProps } from "next/app";
import QueryManager from "./components/QueryManager";
import React from "react";
export declare type CreateRelayBridgeArgs = {
    getServerEnvironment: (initialStore?: RecordMap) => IEnvironment;
    getClientEnvironment: (initialStore?: RecordMap) => IEnvironment;
};
/**
 * withPageBridge
 */
declare type MakeRawQueryReturn = [
    "__nextRelayBridgeQuery__",
    GraphQLTaggedNode,
    RelayVariables,
    unknown
];
export declare type MakeRawQueryType = (query: GraphQLTaggedNode, variables: RelayVariables, result?: unknown) => MakeRawQueryReturn;
export declare type GetInitialPropsType = (args: {
    context: NextPageContext;
    preloadQuery: (query: GraphQLTaggedNode, variables: RelayVariables) => Promise<MakeRawQueryReturn>;
}) => Promise<Record<string, any>>;
export declare type WithPageBridgeArgs = {
    PageComponent: React.ComponentType<any>;
    getInitialProps: GetInitialPropsType;
};
export declare type GetClientInitialPropsArgs = {
    context: NextPageContext;
    userGetInitialProps: GetInitialPropsType;
};
export declare type GetServerInitialPropsArgs = {
    context: NextPageContext;
    userGetInitialProps: GetInitialPropsType;
    getServerEnvironment: () => IEnvironment;
};
/**
 * withAppBridge
 */
export declare type AppWrapperProps = AppProps & {
    relayEnvironment: IEnvironment;
};
export declare type WithAppBridgeAppComponent = React.ComponentType<AppWrapperProps>;
export declare type WithAppBridgeArgs = CreateRelayBridgeArgs & {
    AppComponent: WithAppBridgeAppComponent;
};
export declare type WithAppBridgeReturn = (props: AppWrapperProps) => React.ReactElement<QueryManager>;
export declare type RelayRecordSourceJSON = ReturnType<RecordSource["toJSON"]>;
export declare type QueryManagerPropTypes = AppWrapperProps & {
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
export {};
