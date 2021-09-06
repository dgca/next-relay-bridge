import type { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { withAppBridge } from "relay/bridge";
import "../styles/globals.css";

import type { IEnvironment } from "relay-runtime";

type Props = AppProps & {
  relayEnvironment: IEnvironment;
};

function MyApp({ Component, pageProps, relayEnvironment }: Props) {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
}

export default withAppBridge({
  AppComponent: MyApp,
});
