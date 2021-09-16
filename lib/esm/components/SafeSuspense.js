import React, { Suspense, Fragment } from "react";
import isServer from "../utils/isServer";
export default function SafeSuspense({ children, fallback, clientOnly, }) {
    if (isServer()) {
        return React.createElement(Fragment, null, clientOnly ? null : children);
    }
    return React.createElement(Suspense, { fallback: fallback }, children);
}
