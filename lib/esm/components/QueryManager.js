import React from "react";
import { loadQuery } from "react-relay";
import isServer from "../utils/isServer";
import { rawQueryKey } from "../utils/makeRawQuery";
export default class QueryManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static getDerivedStateFromProps(props, state) {
        Object.values(state).forEach((query) => query.dispose());
        const rawRelayQueryEntries = Object.entries(props.pageProps).filter(([_, value]) => Array.isArray(value) && value[0] === rawQueryKey);
        if (!rawRelayQueryEntries.length) {
            return {};
        }
        return rawRelayQueryEntries.reduce((acc, [key, value]) => {
            const [_, query, variables, result] = value;
            const loadedQuery = isServer()
                ? result
                : loadQuery(props.getClientEnvironment(props.pageProps.__nextRelayBridgeProps__?.initialStore ?? {}), query, variables);
            acc[key] = loadedQuery;
            return acc;
        }, {});
    }
    componentWillUnmount() {
        Object.values(this.state).forEach((query) => query.dispose());
    }
    getRelayEnvironment() {
        const initialStore = this.props.pageProps.__nextRelayBridgeProps__?.initialStore ?? {};
        if (!isServer()) {
            return this.props.getClientEnvironment(initialStore);
        }
        return (this.props.pageProps.__nextRelayBridgeProps__?.relayEnvironment ??
            this.props.getServerEnvironment(initialStore));
    }
    render() {
        const { AppComponent, pageProps, ...rest } = this.props;
        const { __nextRelayBridgeProps__, ...restPageProps } = pageProps;
        const builtQueries = this.state || {};
        return (React.createElement(AppComponent, { pageProps: {
                ...restPageProps,
                ...builtQueries,
            }, relayEnvironment: this.getRelayEnvironment(), ...rest }));
    }
}
