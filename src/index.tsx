import type { Environment } from "relay-runtime";

import withAppBridge from "./bridge/withAppBridge";
import withPageBridge from "./bridge/withPageBridge";

import SafeSuspense from "./components/SafeSuspense";

type CreateNextRelayBridgeArgs = {
  getServerEnvironment: (initialStore?: Record<string, any>) => Environment;
  getClientEnvironment: (initialStore?: Record<string, any>) => Environment;
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
    withAppBridge: ({ AppComponent }) => {
      return withAppBridge({
        AppComponent,
        getServerEnvironment,
        getClientEnvironment,
      });
    },
    withPageBridge: ({ PageComponent, getInitialProps }) => {
      return withPageBridge({
        PageComponent,
        getInitialProps,
        getServerEnvironment,
      });
    },
  };
}

export { SafeSuspense };
