import withAppBridge from "./bridge/withAppBridge";
import withPageBridge from "./bridge/withPageBridge";
import SafeSuspense from "./components/SafeSuspense";
export function createNextRelayBridge({ getServerEnvironment, getClientEnvironment, }) {
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
