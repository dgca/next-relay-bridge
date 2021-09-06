import React from "react";
import QueryManager from "../components/QueryManager";
import type { AppProps } from "next/app";
import type { IEnvironment } from "relay-runtime";
import type { CreateRelayBridgeArgs } from "./types";
declare type AppWrapperProps = AppProps & {
    relayEnvironment: IEnvironment;
};
export declare type WithAppBridgeAppComponent = React.ComponentType<AppWrapperProps>;
declare type WithAppBridgeArgs = CreateRelayBridgeArgs & {
    AppComponent: WithAppBridgeAppComponent;
};
export declare type WithAppBridgeReturn = (props: AppWrapperProps) => React.ReactElement<QueryManager>;
export default function withAppBridge({ AppComponent, getServerEnvironment, getClientEnvironment, }: WithAppBridgeArgs): WithAppBridgeReturn;
export {};
