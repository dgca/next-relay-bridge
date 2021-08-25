import type { Environment } from "relay-runtime";
import SafeSuspense from "./components/SafeSuspense";
declare type CreateNextRelayBridgeArgs = {
    getServerEnvironment: () => Environment;
    getClientEnvironment: () => Environment;
};
declare type CreateRelayBridgeReturn = {
    withAppBridge: (args: any) => any;
    withPageBridge: (args: any) => any;
};
export declare function createNextRelayBridge({ getServerEnvironment, getClientEnvironment, }: CreateNextRelayBridgeArgs): CreateRelayBridgeReturn;
export { SafeSuspense };
