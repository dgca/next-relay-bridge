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
import React, { Suspense, Fragment } from "react";
import isServer from "../utils/isServer";
export default function SafeSuspense(props) {
    var canSuspend = !isServer();
    var Wrapper = canSuspend ? Suspense : Fragment;
    return React.createElement(Wrapper, __assign({}, (canSuspend ? props : {})));
}
