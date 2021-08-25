declare type WithAppBridgeType = (options: {
    AppComponent: any;
    getServerEnvironment: any;
    getClientEnvironment: any;
}) => any;
declare const withAppBridge: WithAppBridgeType;
export default withAppBridge;
