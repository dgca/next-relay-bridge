import withPageBridge from "./bridge/withPageBridge";
import SafeSuspense from "./components/SafeSuspense";
import type { CreateRelayBridgeArgs, WithAppBridgeAppComponent, WithAppBridgeReturn, WithPageBridgeArgs } from "./types";
declare type CreateRelayBridgeReturn = {
    withAppBridge: (args: {
        AppComponent: WithAppBridgeAppComponent;
    }) => WithAppBridgeReturn;
    withPageBridge: (args: WithPageBridgeArgs) => ReturnType<typeof withPageBridge>;
};
export declare function createNextRelayBridge({ getServerEnvironment, getClientEnvironment, }: CreateRelayBridgeArgs): CreateRelayBridgeReturn;
export { SafeSuspense };
