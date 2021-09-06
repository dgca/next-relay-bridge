import type { IEnvironment } from "relay-runtime";
import type { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";

export type CreateRelayBridgeArgs = {
  getServerEnvironment: (initialStore?: RecordMap) => IEnvironment;
  getClientEnvironment: (initialStore?: RecordMap) => IEnvironment;
};
