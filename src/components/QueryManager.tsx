import React from "react";
import { loadQuery } from "react-relay";
import isServer from "../utils/isServer";
import { rawQueryKey } from "../utils/makeRawQuery";
import { QueryManagerPropTypes } from "../types";

export default class QueryManager extends React.Component<QueryManagerPropTypes> {
  constructor(props: QueryManagerPropTypes) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props: any, state: any) {
    Object.values(state).forEach((query: any) => query.dispose());

    const rawRelayQueryEntries = Object.entries(props.pageProps).filter(
      ([_, value]) => Array.isArray(value) && value[0] === rawQueryKey
    );

    if (!rawRelayQueryEntries.length) {
      return {};
    }

    return rawRelayQueryEntries.reduce((acc, [key, value]) => {
      const [_, query, variables, result] = value as any;

      const loadedQuery = isServer()
        ? result
        : loadQuery(
            props.getClientEnvironment(
              props.pageProps.__nextRelayBridgeProps__?.initialStore ?? {}
            ),
            query,
            variables
          );

      acc[key] = loadedQuery;

      return acc;
    }, {});
  }

  componentWillUnmount() {
    Object.values(this.state).forEach((query: any) => query.dispose());
  }

  getRelayEnvironment() {
    const initialStore =
      this.props.pageProps.__nextRelayBridgeProps__?.initialStore ?? {};

    if (!isServer()) {
      return this.props.getClientEnvironment(initialStore);
    }

    return (
      this.props.pageProps.__nextRelayBridgeProps__?.relayEnvironment ??
      this.props.getServerEnvironment()
    );
  }

  render() {
    const {
      AppComponent,
      pageProps,
      getServerEnvironment,
      getClientEnvironment,
      relayEnvironment,
      ...rest
    } = this.props;

    const { __nextRelayBridgeProps__, ...restPageProps } = pageProps;

    const builtQueries = this.state || {};

    return (
      <AppComponent
        pageProps={{
          ...restPageProps,
          ...builtQueries,
        }}
        relayEnvironment={this.getRelayEnvironment()}
        {...rest}
      />
    );
  }
}
