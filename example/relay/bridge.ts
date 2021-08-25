import { createNextRelayBridge, SafeSuspense } from "next-relay-bridge";

import { getClientEnvironment } from "./clientEnvironment";
import { getServerEnvironment } from "./serverEnvironment";

const { withAppBridge, withPageBridge } = createNextRelayBridge({
  getServerEnvironment,
  getClientEnvironment,
});

export { withAppBridge, withPageBridge, SafeSuspense };
