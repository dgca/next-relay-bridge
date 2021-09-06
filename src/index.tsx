import withAppBridge from "./bridge/withAppBridge";
import withPageBridge from "./bridge/withPageBridge";

import SafeSuspense from "./components/SafeSuspense";

import type {
  WithAppBridgeAppComponent,
  WithAppBridgeReturn,
} from "./bridge/withAppBridge";
import type { CreateRelayBridgeArgs } from "./bridge/types";

type CreateRelayBridgeReturn = {
  withAppBridge: (args: {
    AppComponent: WithAppBridgeAppComponent;
  }) => WithAppBridgeReturn;
  withPageBridge: (args: { PageComponent: any; getInitialProps: any }) => any;
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
