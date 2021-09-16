import { loadQuery } from "react-relay";
import makeRawQuery from "../utils/makeRawQuery";
import redirect from "../utils/redirect";
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
        const loadedQuery = loadQuery(relayEnvironment, query, variables);
        await awaitQuery(loadedQuery);
        return makeRawQuery(query, variables, loadedQuery);
    }
    const initialProps = await userGetInitialProps({
        context,
        preloadQuery,
    });
    if (initialProps.redirect?.destination) {
        const destination = initialProps.redirect.destination;
        const permanent = !!initialProps.redirect.permanent;
        redirect(context, destination, permanent);
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
export default getServerInitialProps;
