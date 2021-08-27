"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_relay_1 = require("react-relay");
var isServer_1 = __importDefault(require("../utils/isServer"));
var makeRawQuery_1 = require("../utils/makeRawQuery");
var QueryManager = /** @class */ (function (_super) {
    __extends(QueryManager, _super);
    function QueryManager(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    QueryManager.getDerivedStateFromProps = function (props, state) {
        Object.values(state).forEach(function (query) { return query.dispose(); });
        var rawRelayQueryEntries = Object.entries(props.pageProps).filter(function (_a) {
            var _ = _a[0], value = _a[1];
            return Array.isArray(value) && value[0] === makeRawQuery_1.rawQueryKey;
        });
        if (!rawRelayQueryEntries.length) {
            return {};
        }
        return rawRelayQueryEntries.reduce(function (acc, _a) {
            var _b, _c;
            var key = _a[0], value = _a[1];
            var _d = value, _ = _d[0], query = _d[1], variables = _d[2], result = _d[3];
            var loadedQuery = isServer_1.default()
                ? result
                : react_relay_1.loadQuery(props.getClientEnvironment((_c = (_b = props.pageProps.__nextRelayBridgeProps__) === null || _b === void 0 ? void 0 : _b.initialStore) !== null && _c !== void 0 ? _c : {}), query, variables);
            acc[key] = loadedQuery;
            return acc;
        }, {});
    };
    QueryManager.prototype.componentWillUnmount = function () {
        Object.values(this.state).forEach(function (query) { return query.dispose(); });
    };
    QueryManager.prototype.getRelayEnvironment = function () {
        var _a, _b, _c, _d;
        var initialStore = (_b = (_a = this.props.pageProps.__nextRelayBridgeProps__) === null || _a === void 0 ? void 0 : _a.initialStore) !== null && _b !== void 0 ? _b : {};
        if (!isServer_1.default()) {
            return this.props.getClientEnvironment(initialStore);
        }
        return ((_d = (_c = this.props.pageProps.__nextRelayBridgeProps__) === null || _c === void 0 ? void 0 : _c.relayEnvironment) !== null && _d !== void 0 ? _d : this.props.getServerEnvironment(initialStore));
    };
    QueryManager.prototype.render = function () {
        var _a = this.props, AppComponent = _a.AppComponent, pageProps = _a.pageProps, rest = __rest(_a, ["AppComponent", "pageProps"]);
        var __nextRelayBridgeProps__ = pageProps.__nextRelayBridgeProps__, restPageProps = __rest(pageProps, ["__nextRelayBridgeProps__"]);
        var builtQueries = this.state || {};
        return (react_1.default.createElement(AppComponent, __assign({ pageProps: __assign(__assign({}, restPageProps), builtQueries), relayEnvironment: this.getRelayEnvironment() }, rest)));
    };
    return QueryManager;
}(react_1.default.Component));
exports.default = QueryManager;
