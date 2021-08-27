import makeRawQuery from "../utils/makeRawQuery";
import redirect from "../utils/redirect";

type GetClientInitialPropsType = (options: {
  context: any;
  userGetInitialProps: any;
}) => any;

const getClientInitialProps: GetClientInitialPropsType =
  async function getClientInitialProps({ context, userGetInitialProps }) {
    async function preloadQuery(query: any, variables: any) {
      return makeRawQuery(query, variables);
    }

    const initialProps = await userGetInitialProps({
      context,
      preloadQuery,
    });

    if (initialProps.redirect?.destination) {
      const destination = initialProps.redirect.destination;
      redirect(context, destination);
      return {};
    }

    return initialProps;
  };

export default getClientInitialProps;
