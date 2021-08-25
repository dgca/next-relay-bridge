import type { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { withAppBridge } from "relay/bridge";

import "../styles/globals.css";

function MyApp({ Component, pageProps, relayEnvironment }: AppProps) {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
}

export default withAppBridge({
  AppComponent: MyApp,
});
