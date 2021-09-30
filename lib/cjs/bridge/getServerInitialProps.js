"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_relay_1 = require("react-relay");
const makeRawQuery_1 = __importDefault(require("../utils/makeRawQuery"));
const redirect_1 = __importDefault(require("../utils/redirect"));
function awaitQuery(query) {
    return new Promise((resolve, reject) => {
        if (!query?.source?.subscribe) {
            return;
        }
        query.source.subscribe({
            complete: resolve,
            error: reject,
        });
    });
}
async function getServerInitialProps({ context, userGetInitialProps, getServerEnvironment, }) {
    const relayEnvironment = getServerEnvironment();
    async function preloadQuery(query, variables) {
        const loadedQuery = react_relay_1.loadQuery(relayEnvironment, query, variables);
        await awaitQuery(loadedQuery);
        return makeRawQuery_1.default(query, variables, loadedQuery);
    }
    const initialProps = await userGetInitialProps({
        context,
        preloadQuery,
    });
    if (initialProps.redirect?.destination) {
        const destination = initialProps.redirect.destination;
        const permanent = !!initialProps.redirect.permanent;
        redirect_1.default(context, destination, permanent);
        return {};
    }
    const serializedStore = relayEnvironment?.getStore().getSource().toJSON() || null;
    return {
        ...initialProps,
        __nextRelayBridgeProps__: {
            initialStore: serializedStore,
            relayEnvironment,
        },
    };
}
exports.default = getServerInitialProps;
