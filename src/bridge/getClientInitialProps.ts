import makeRawQuery from "../utils/makeRawQuery";

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

    return initialProps;
  };

export default getClientInitialProps;
