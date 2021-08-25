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
import React from "react";
import QueryManager from "../components/QueryManager";
var withAppBridge = function withAppBridge(_a) {
    var AppComponent = _a.AppComponent, getServerEnvironment = _a.getServerEnvironment, getClientEnvironment = _a.getClientEnvironment;
    function AppWrapper(props) {
        return (React.createElement(QueryManager, __assign({}, props, { AppComponent: AppComponent, getServerEnvironment: getServerEnvironment, getClientEnvironment: getClientEnvironment })));
    }
    return AppWrapper;
};
export default withAppBridge;
