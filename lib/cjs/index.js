"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeSuspense = exports.createNextRelayBridge = void 0;
const withAppBridge_1 = __importDefault(require("./bridge/withAppBridge"));
const withPageBridge_1 = __importDefault(require("./bridge/withPageBridge"));
const SafeSuspense_1 = __importDefault(require("./components/SafeSuspense"));
exports.SafeSuspense = SafeSuspense_1.default;
function createNextRelayBridge({ getServerEnvironment, getClientEnvironment, }) {
    return {
        withAppBridge: ({ AppComponent }) => {
            return withAppBridge_1.default({
                AppComponent,
                getServerEnvironment,
                getClientEnvironment,
            });
        },
        withPageBridge: ({ PageComponent, getInitialProps }) => {
            return withPageBridge_1.default({
                PageComponent,
                getInitialProps,
                getServerEnvironment,
            });
        },
    };
}
exports.createNextRelayBridge = createNextRelayBridge;
