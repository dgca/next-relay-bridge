import React from "react";
import type { GetServerSidePropsContext } from "next";
import type { IEnvironment, GraphQLTaggedNode, Variables as RelayVariables } from "relay-runtime";
import type { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";
declare type WithPageBridgeArgs<T> = {
    PageComponent: React.ComponentType<T>;
    getInitialProps: (args: {
        context: GetServerSidePropsContext;
        preloadQuery: (query: GraphQLTaggedNode, variables: RelayVariables) => Promise<any>;
    }) => Promise<{
        [k: string]: unknown;
    }>;
    getServerEnvironment: (initialStore?: RecordMap) => IEnvironment;
};
declare type WithPageBridgeReturn<T> = React.ComponentType<T>;
export default function withPageBridge<T>({ PageComponent, getInitialProps: userGetInitialProps, getServerEnvironment, }: WithPageBridgeArgs<T>): WithPageBridgeReturn<T>;
export {};
