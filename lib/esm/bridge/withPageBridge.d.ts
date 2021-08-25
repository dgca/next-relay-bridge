declare type WithPageBridgeType = (options: {
    PageComponent: any;
    getInitialProps: any;
    getServerEnvironment: any;
}) => any;
declare const withPageBridge: WithPageBridgeType;
export default withPageBridge;
