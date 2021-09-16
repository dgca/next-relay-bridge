import withAppBridge from "./bridge/withAppBridge";
import withPageBridge from "./bridge/withPageBridge";
import SafeSuspense from "./components/SafeSuspense";

import type {
  CreateRelayBridgeArgs,
  WithAppBridgeAppComponent,
  WithAppBridgeReturn,
  WithPageBridgeArgs,
} from "./types";

type CreateRelayBridgeReturn = {
  withAppBridge: (args: {
    AppComponent: WithAppBridgeAppComponent;
  }) => WithAppBridgeReturn;
  withPageBridge: (
    args: WithPageBridgeArgs
  ) => ReturnType<typeof withPageBridge>;
};

export function createNextRelayBridge({
  getServerEnvironment,
  getClientEnvironment,
}: CreateRelayBridgeArgs): CreateRelayBridgeReturn {
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
