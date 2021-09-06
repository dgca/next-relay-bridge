import React from "react";

import QueryManager from "../components/QueryManager";

import type { AppProps } from "next/app";
import type { IEnvironment } from "relay-runtime";
import type { CreateRelayBridgeArgs } from "./types";

type AppWrapperProps = AppProps & {
  relayEnvironment: IEnvironment;
};

export type WithAppBridgeAppComponent = React.ComponentType<AppWrapperProps>;

type WithAppBridgeArgs = CreateRelayBridgeArgs & {
  AppComponent: WithAppBridgeAppComponent;
};

export type WithAppBridgeReturn = (
  props: AppWrapperProps
) => React.ReactElement<QueryManager>;

export default function withAppBridge({
  AppComponent,
  getServerEnvironment,
  getClientEnvironment,
}: WithAppBridgeArgs): WithAppBridgeReturn {
  return function AppWrapper(props: AppWrapperProps) {
    return (
      <QueryManager
        {...props}
        AppComponent={AppComponent}
        getServerEnvironment={getServerEnvironment}
        getClientEnvironment={getClientEnvironment}
      />
    );
  };
}
