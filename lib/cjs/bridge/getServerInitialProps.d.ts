import type { GetServerInitialPropsArgs } from "../types";
declare function getServerInitialProps({ context, userGetInitialProps, getServerEnvironment, }: GetServerInitialPropsArgs): Promise<Record<string, any>>;
export default getServerInitialProps;
