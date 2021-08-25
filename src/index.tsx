import React, { Suspense, Fragment } from "react";
import { loadQuery } from "react-relay";

const rawQueryKey = "__nextRelayBridgeQuery__";

function makeRawQuery(query, variables, result?) {
  return [rawQueryKey, query, variables, result];
}

function isServer() {
  return typeof window === "undefined";
}

function awaitQuery(query) {
  return new Promise((resolve, reject) => {
    query.source.subscribe({
      complete: resolve,
      error: reject,
    });
  });
}

export function SafeSuspense(props) {
  const canSuspend = !isServer();
  const Wrapper = canSuspend ? Suspense : Fragment;
  return <Wrapper {...(canSuspend ? props : {})} />;
}

class QueryManager extends React.Component<{
  pageProps: {
    __nextRelayBridgeProps__: any;
  };
  getServerEnvironment: any;
  getClientEnvironment: any;
  AppComponent: any;
}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps(props, state) {
    Object.values(state).forEach((query) => query.dispose());

    const rawRelayQueryEntries = Object.entries(props.pageProps).filter(
      ([key, value]) => Array.isArray(value) && value[0] === rawQueryKey
    );

    if (!rawRelayQueryEntries.length) {
      return {};
    }

    return rawRelayQueryEntries.reduce((acc, [key, value]) => {
      const [_, query, variables, result] = value;

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

  getRelayEnvironment() {
    const initialStore =
      this.props.pageProps.__nextRelayBridgeProps__?.initialStore ?? {};

    if (!isServer()) {
      return this.props.getClientEnvironment(initialStore);
    }

    return this.props.getServerEnvironment(initialStore);
  }

  render() {
    const { AppComponent, pageProps, ...rest } = this.props;

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

function withAppBridge({
  AppComponent,
  getServerEnvironment,
  getClientEnvironment,
}) {
  function AppWrapper(props) {
    return (
      <QueryManager
        {...props}
        AppComponent={AppComponent}
        getServerEnvironment={getServerEnvironment}
        getClientEnvironment={getClientEnvironment}
      />
    );
  }

  return AppWrapper;
}

async function getServerInitialProps({
  context,
  userGetInitialProps,
  getServerEnvironment,
}) {
  const relayEnvironment = getServerEnvironment({});

  async function preloadQuery(query, variables) {
    const loadedQuery = loadQuery(relayEnvironment, query, variables);

    await awaitQuery(loadedQuery);

    return makeRawQuery(query, variables, loadedQuery);
  }

  const initialProps = await userGetInitialProps({
    context,
    preloadQuery,
  });

  const serializedStore =
    relayEnvironment?.getStore().getSource().toJSON() || null;

  return {
    ...initialProps,
    __nextRelayBridgeProps__: {
      initialStore: serializedStore,
      relayEnvironment,
    },
  };
}

async function getClientInitialProps({
  context,
  userGetInitialProps,
  getClientEnvironment,
}) {
  console.log(`
    
  getClientInitialProps

  `);

  async function preloadQuery(query, variables) {
    return makeRawQuery(query, variables);
  }

  const initialProps = await userGetInitialProps({
    context,
    preloadQuery,
  });

  return initialProps;
}

function withPageBridge({
  PageComponent,
  getInitialProps: userGetInitialProps,
  getServerEnvironment,
  getClientEnvironment,
}) {
  function WrappedPageComponent(props) {
    return <PageComponent {...props} />;
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
      getClientEnvironment,
    });
  };

  return WrappedPageComponent;
}

export function createNextRelayBridge({
  getServerEnvironment,
  getClientEnvironment,
}) {
  return {
    withAppBridge: ({ AppComponent }) =>
      withAppBridge({
        AppComponent,
        getServerEnvironment,
        getClientEnvironment,
      }),
    withPageBridge: ({ PageComponent, getInitialProps }) =>
      withPageBridge({
        PageComponent,
        getInitialProps,
        getServerEnvironment,
        getClientEnvironment,
      }),
  };
}
