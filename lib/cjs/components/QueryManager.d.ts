import React from "react";
export default class QueryManager extends React.Component<{
    pageProps: {
        __nextRelayBridgeProps__: {
            initialStore: any;
            relayEnvironment: any;
        };
    };
    getServerEnvironment: any;
    getClientEnvironment: any;
    AppComponent: any;
}> {
    constructor(props: any);
    static getDerivedStateFromProps(props: any, state: any): {};
    componentWillUnmount(): void;
    getRelayEnvironment(): any;
    render(): JSX.Element;
}
