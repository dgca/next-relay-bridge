import React from "react";
import isServer from "../utils/isServer";
import getServerInitialProps from "./getServerInitialProps";
import getClientInitialProps from "./getClientInitialProps";

import type { NextPageContext } from "next";
import type { IEnvironment } from "relay-runtime";
import type { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";
import type { GetInitialPropsType } from "../types";

type WithPageBridgeArgs<T> = {
  PageComponent: React.ComponentType<T>;
  getInitialProps: GetInitialPropsType;
  getServerEnvironment: (initialStore?: RecordMap) => IEnvironment;
};

export default function withPageBridge<T extends React.ComponentType>({
  PageComponent,
  getInitialProps: userGetInitialProps,
  getServerEnvironment,
}: WithPageBridgeArgs<T>) {
  function WrappedPageComponent(props: T) {
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
}
