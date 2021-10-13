"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var QueryManager_1 = __importDefault(require("../components/QueryManager"));
function withAppBridge(_a) {
    var AppComponent = _a.AppComponent, getServerEnvironment = _a.getServerEnvironment, getClientEnvironment = _a.getClientEnvironment;
    return function AppWrapper(props) {
        return (react_1.default.createElement(QueryManager_1.default, __assign({}, props, { AppComponent: AppComponent, getServerEnvironment: getServerEnvironment, getClientEnvironment: getClientEnvironment })));
    };
}
exports.default = withAppBridge;
