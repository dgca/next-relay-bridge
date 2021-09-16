import React from "react";
import isServer from "../utils/isServer";
import getServerInitialProps from "./getServerInitialProps";
import getClientInitialProps from "./getClientInitialProps";
export default function withPageBridge({ PageComponent, getInitialProps: userGetInitialProps, getServerEnvironment, }) {
    function WrappedPageComponent(props) {
        return React.createElement(PageComponent, { ...props });
    }
    WrappedPageComponent.getInitialProps = async (context) => {
        if (isServer()) {
            return getServerInitialProps({
                context,
                userGetInitialProps,
                getServerEnvironment,
            });
        }
        return getClientInitialProps({
            context,
            userGetInitialProps,
        });
    };
    return WrappedPageComponent;
}
