import React from "react";
import QueryManager from "../components/QueryManager";

import type {
  WithAppBridgeArgs,
  WithAppBridgeReturn,
  AppWrapperProps,
} from "../types";

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
