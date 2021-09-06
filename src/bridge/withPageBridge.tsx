import React from "react";
import isServer from "../utils/isServer";
import getServerInitialProps from "./getServerInitialProps";
import getClientInitialProps from "./getClientInitialProps";

import type { NextPageContext, GetServerSidePropsContext } from "next";
import type {
  IEnvironment,
  GraphQLTaggedNode,
  Variables as RelayVariables,
} from "relay-runtime";
import type { RecordMap } from "relay-runtime/lib/store/RelayStoreTypes";

type WithPageBridgeArgs<T> = {
  PageComponent: React.ComponentType<T>;
  getInitialProps: (args: {
    context: GetServerSidePropsContext;
    preloadQuery: (
      query: GraphQLTaggedNode,
      variables: RelayVariables
    ) => Promise<any>;
  }) => Promise<{ [k: string]: unknown }>;
  getServerEnvironment: (initialStore?: RecordMap) => IEnvironment;
};

type WithPageBridgeReturn<T> = React.ComponentType<T>;

export default function withPageBridge<T>({
  PageComponent,
  getInitialProps: userGetInitialProps,
  getServerEnvironment,
}: WithPageBridgeArgs<T>): WithPageBridgeReturn<T> {
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
