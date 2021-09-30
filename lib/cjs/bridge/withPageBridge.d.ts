import React from "react";
import type { NextPageContext } from "next";
import type { IEnvironment, GraphQLTaggedNode, Variables as RelayVariables } from "relay-runtime";
import type { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";
declare type WithPageBridgeArgs<T> = {
    PageComponent: React.ComponentType<T>;
    getInitialProps: (args: {
        context: NextPageContext;
        preloadQuery: (query: GraphQLTaggedNode, variables: RelayVariables) => Promise<any>;
    }) => Promise<Record<string, unknown>>;
    getServerEnvironment: (initialStore?: RecordMap) => IEnvironment;
};
export default function withPageBridge<T extends React.ComponentType>({ PageComponent, getInitialProps: userGetInitialProps, getServerEnvironment, }: WithPageBridgeArgs<T>): {
    (props: T): JSX.Element;
    getInitialProps(context: NextPageContext): Promise<any>;
};
export {};
