"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var isClient = false;
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
            return react_1.default.createElement(react_1.Suspense, { fallback: fallback }, children);
        }
        return react_1.default.createElement(react_1.Fragment, null, clientOnly ? null : children);
    };
    return SafeSuspense;
}(react_1.default.Component));
exports.default = SafeSuspense;
