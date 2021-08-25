import withAppBridge from "./bridge/withAppBridge";
import withPageBridge from "./bridge/withPageBridge";
import SafeSuspense from "./components/SafeSuspense";
export function createNextRelayBridge(_a) {
    var getServerEnvironment = _a.getServerEnvironment, getClientEnvironment = _a.getClientEnvironment;
    return {
        withAppBridge: function (_a) {
            var AppComponent = _a.AppComponent;
            return withAppBridge({
                AppComponent: AppComponent,
                getServerEnvironment: getServerEnvironment,
                getClientEnvironment: getClientEnvironment,
            });
        },
        withPageBridge: function (_a) {
            var PageComponent = _a.PageComponent, getInitialProps = _a.getInitialProps;
            return withPageBridge({
                PageComponent: PageComponent,
                getInitialProps: getInitialProps,
                getServerEnvironment: getServerEnvironment,
            });
        },
    };
}
export { SafeSuspense };
