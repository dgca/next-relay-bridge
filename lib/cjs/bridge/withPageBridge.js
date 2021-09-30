"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const isServer_1 = __importDefault(require("../utils/isServer"));
const getServerInitialProps_1 = __importDefault(require("./getServerInitialProps"));
const getClientInitialProps_1 = __importDefault(require("./getClientInitialProps"));
function withPageBridge({ PageComponent, getInitialProps: userGetInitialProps, getServerEnvironment, }) {
    function WrappedPageComponent(props) {
        return react_1.default.createElement(PageComponent, { ...props });
    }
    WrappedPageComponent.getInitialProps = async (context) => {
        if (isServer_1.default()) {
            return getServerInitialProps_1.default({
                context,
                userGetInitialProps,
                getServerEnvironment,
            });
        }
        return getClientInitialProps_1.default({
            context,
            userGetInitialProps,
        });
    };
    return WrappedPageComponent;
}
exports.default = withPageBridge;
