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
import React, { Suspense, Fragment } from "react";
import isServer from "../utils/isServer";
var isClient = !isServer();
var SafeSuspense = /** @class */ (function (_super) {
    __extends(SafeSuspense, _super);
    function SafeSuspense(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isReady: isClient,
        };
        return _this;
    }
    SafeSuspense.prototype.componentDidMount = function () {
        if (!isClient) {
            isClient = true;
            this.setState({
                isReady: true,
            });
        }
    };
    SafeSuspense.prototype.render = function () {
        var _a = this.props, clientOnly = _a.clientOnly, children = _a.children, fallback = _a.fallback;
        if (isClient) {
            return React.createElement(Suspense, { fallback: fallback }, children);
        }
        return React.createElement(Fragment, null, clientOnly ? null : children);
    };
    return SafeSuspense;
}(React.Component));
export default SafeSuspense;
