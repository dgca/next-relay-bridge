import React, { Suspense, Fragment } from "react";
import isServer from "../utils/isServer";
export default function SafeSuspense(_a) {
    var children = _a.children, fallback = _a.fallback, clientOnly = _a.clientOnly;
    if (isServer()) {
        return React.createElement(Fragment, null, clientOnly ? null : children);
    }
    return React.createElement(Suspense, { fallback: fallback }, children);
}
