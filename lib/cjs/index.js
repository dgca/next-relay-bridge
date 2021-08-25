"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeSuspense = exports.createNextRelayBridge = void 0;
var withAppBridge_1 = __importDefault(require("./bridge/withAppBridge"));
var withPageBridge_1 = __importDefault(require("./bridge/withPageBridge"));
var SafeSuspense_1 = __importDefault(require("./components/SafeSuspense"));
exports.SafeSuspense = SafeSuspense_1.default;
function createNextRelayBridge(_a) {
    var getServerEnvironment = _a.getServerEnvironment, getClientEnvironment = _a.getClientEnvironment;
    return {
        withAppBridge: function (_a) {
            var AppComponent = _a.AppComponent;
            return withAppBridge_1.default({
                AppComponent: AppComponent,
                getServerEnvironment: getServerEnvironment,
                getClientEnvironment: getClientEnvironment,
            });
        },
        withPageBridge: function (_a) {
            var PageComponent = _a.PageComponent, getInitialProps = _a.getInitialProps;
            return withPageBridge_1.default({
                PageComponent: PageComponent,
                getInitialProps: getInitialProps,
                getServerEnvironment: getServerEnvironment,
            });
        },
    };
}
exports.createNextRelayBridge = createNextRelayBridge;
