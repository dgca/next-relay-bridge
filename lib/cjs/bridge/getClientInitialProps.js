"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const makeRawQuery_1 = __importDefault(require("../utils/makeRawQuery"));
const redirect_1 = __importDefault(require("../utils/redirect"));
const getClientInitialProps = async function getClientInitialProps({ context, userGetInitialProps }) {
    async function preloadQuery(query, variables) {
        return makeRawQuery_1.default(query, variables);
    }
    const initialProps = await userGetInitialProps({
        context,
        preloadQuery,
    });
    if (initialProps.redirect?.destination) {
        const destination = initialProps.redirect.destination;
        redirect_1.default(context, destination);
        return {};
    }
    return initialProps;
};
exports.default = getClientInitialProps;
