import type { IEnvironment } from "relay-runtime";
import type { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";
export declare type CreateRelayBridgeArgs = {
    getServerEnvironment: (initialStore?: RecordMap) => IEnvironment;
    getClientEnvironment: (initialStore?: RecordMap) => IEnvironment;
};
