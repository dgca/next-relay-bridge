import React from "react";
import type { NextPageContext } from "next";
import type { IEnvironment } from "relay-runtime";
import type { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";
import type { GetInitialPropsType } from "../types";
declare type WithPageBridgeArgs<T> = {
    PageComponent: React.ComponentType<T>;
    getInitialProps: GetInitialPropsType;
    getServerEnvironment: (initialStore?: RecordMap) => IEnvironment;
};
export default function withPageBridge<T extends React.ComponentType>({ PageComponent, getInitialProps: userGetInitialProps, getServerEnvironment, }: WithPageBridgeArgs<T>): {
    (props: T): JSX.Element;
    getInitialProps(context: NextPageContext): Promise<Record<string, any>>;
};
export {};
