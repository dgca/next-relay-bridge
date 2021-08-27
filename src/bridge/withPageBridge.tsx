import React from "react";
import isServer from "../utils/isServer";
import getServerInitialProps from "./getServerInitialProps";
import getClientInitialProps from "./getClientInitialProps";

import type { NextPageContext } from "next";

type WithPageBridgeType = (options: {
  PageComponent: any;
  getInitialProps: any;
  getServerEnvironment: any;
}) => any;

const withPageBridge: WithPageBridgeType = function withPageBridge({
  PageComponent,
  getInitialProps: userGetInitialProps,
  getServerEnvironment,
}) {
  function WrappedPageComponent(props: AnimationPlaybackEvent) {
    return <PageComponent {...props} />;
  }

  WrappedPageComponent.getInitialProps = async (context: NextPageContext) => {
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
};

export default withPageBridge;
