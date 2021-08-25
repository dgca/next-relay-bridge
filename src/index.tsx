import type { Environment } from "relay-runtime";

import withAppBridge from "./bridge/withAppBridge";
import withPageBridge from "./bridge/withPageBridge";

type CreateNextRelayBridgeArgs = {
  getServerEnvironment: () => Environment;
  getClientEnvironment: () => Environment;
};

type CreateRelayBridgeReturn = {
  withAppBridge: (args: any) => any;
  withPageBridge: (args: any) => any;
};

export function createNextRelayBridge({
  getServerEnvironment,
  getClientEnvironment,
}: CreateNextRelayBridgeArgs): CreateRelayBridgeReturn {
  return {
    withAppBridge: ({ AppComponent }) =>
      withAppBridge({
        AppComponent,
        getServerEnvironment,
        getClientEnvironment,
      }),
    withPageBridge: ({ PageComponent, getInitialProps }) =>
      withPageBridge({
        PageComponent,
        getInitialProps,
        getServerEnvironment,
      }),
  };
}
