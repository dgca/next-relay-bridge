import type { AppProps } from "next/app";
import { ProviderProps, ReactElement } from "react";
import { RelayContext, RelayEnvironmentProvider } from "react-relay/hooks";
import { IEnvironment } from "relay-runtime";
import { withAppBridge } from "relay/bridge";
import "../styles/globals.css";

interface Props extends AppProps {
  relayEnvironment: IEnvironment
}

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
