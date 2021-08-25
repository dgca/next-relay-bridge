import React from "react";
export default class QueryManager extends React.Component<{
    pageProps: {
        __nextRelayBridgeProps__: any;
    };
    getServerEnvironment: any;
    getClientEnvironment: any;
    AppComponent: any;
}> {
    constructor(props: any);
    static getDerivedStateFromProps(props: any, state: any): {};
    getRelayEnvironment(): any;
    render(): JSX.Element;
}
