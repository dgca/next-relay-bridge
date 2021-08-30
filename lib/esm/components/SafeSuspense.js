import React, { Suspense, Fragment } from "react";
import isServer from "../utils/isServer";
export default function SafeSuspense(_a) {
    var children = _a.children, key = _a.key, fallback = _a.fallback, clientOnly = _a.clientOnly;
    if (isServer()) {
        return React.createElement(Fragment, { key: key }, clientOnly ? null : children);
    }
    return React.createElement(Suspense, { fallback: fallback }, children);
}
