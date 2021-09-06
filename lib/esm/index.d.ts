import SafeSuspense from "./components/SafeSuspense";
import type { WithAppBridgeAppComponent, WithAppBridgeReturn } from "./bridge/withAppBridge";
import type { CreateRelayBridgeArgs } from "./bridge/types";
declare type CreateRelayBridgeReturn = {
    withAppBridge: (args: {
        AppComponent: WithAppBridgeAppComponent;
    }) => WithAppBridgeReturn;
    withPageBridge: (args: {
        PageComponent: any;
        getInitialProps: any;
    }) => any;
};
export declare function createNextRelayBridge({ getServerEnvironment, getClientEnvironment, }: CreateRelayBridgeArgs): CreateRelayBridgeReturn;
export { SafeSuspense };
