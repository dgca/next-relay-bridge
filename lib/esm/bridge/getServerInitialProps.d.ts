declare type GetServerInitialPropsType = (options: {
    context: any;
    userGetInitialProps: any;
    getServerEnvironment: any;
}) => any;
declare const getServerInitialProps: GetServerInitialPropsType;
export default getServerInitialProps;
