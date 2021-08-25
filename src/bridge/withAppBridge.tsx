import React from "react";
import QueryManager from "../components/QueryManager";

type WithAppBridgeType = (options: {
  AppComponent: any;
  getServerEnvironment: any;
  getClientEnvironment: any;
}) => any;

const withAppBridge: WithAppBridgeType = function withAppBridge({
  AppComponent,
  getServerEnvironment,
  getClientEnvironment,
}) {
  function AppWrapper(props: any) {
    return (
      <QueryManager
        {...props}
        AppComponent={AppComponent}
        getServerEnvironment={getServerEnvironment}
        getClientEnvironment={getClientEnvironment}
      />
    );
  }

  return AppWrapper;
};

export default withAppBridge;
