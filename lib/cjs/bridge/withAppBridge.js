"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const QueryManager_1 = __importDefault(require("../components/QueryManager"));
function withAppBridge({ AppComponent, getServerEnvironment, getClientEnvironment, }) {
    return function AppWrapper(props) {
        return (react_1.default.createElement(QueryManager_1.default, { ...props, AppComponent: AppComponent, getServerEnvironment: getServerEnvironment, getClientEnvironment: getClientEnvironment }));
    };
}
exports.default = withAppBridge;
