"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_relay_1 = require("react-relay");
const isServer_1 = __importDefault(require("../utils/isServer"));
const makeRawQuery_1 = require("../utils/makeRawQuery");
class QueryManager extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static getDerivedStateFromProps(props, state) {
        Object.values(state).forEach((query) => query.dispose());
        const rawRelayQueryEntries = Object.entries(props.pageProps).filter(([_, value]) => Array.isArray(value) && value[0] === makeRawQuery_1.rawQueryKey);
        if (!rawRelayQueryEntries.length) {
            return {};
        }
        return rawRelayQueryEntries.reduce((acc, [key, value]) => {
            const [_, query, variables, result] = value;
            const loadedQuery = isServer_1.default()
                ? result
                : react_relay_1.loadQuery(props.getClientEnvironment(props.pageProps.__nextRelayBridgeProps__?.initialStore ?? {}), query, variables);
            acc[key] = loadedQuery;
            return acc;
        }, {});
    }
    componentWillUnmount() {
        Object.values(this.state).forEach((query) => query.dispose());
    }
    getRelayEnvironment() {
        const initialStore = this.props.pageProps.__nextRelayBridgeProps__?.initialStore ?? {};
        if (!isServer_1.default()) {
            return this.props.getClientEnvironment(initialStore);
        }
        return (this.props.pageProps.__nextRelayBridgeProps__?.relayEnvironment ??
            this.props.getServerEnvironment(initialStore));
    }
    render() {
        const { AppComponent, pageProps, ...rest } = this.props;
        const { __nextRelayBridgeProps__, ...restPageProps } = pageProps;
        const builtQueries = this.state || {};
        return (react_1.default.createElement(AppComponent, { pageProps: {
                ...restPageProps,
                ...builtQueries,
            }, relayEnvironment: this.getRelayEnvironment(), ...rest }));
    }
}
exports.default = QueryManager;
