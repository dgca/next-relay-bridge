<img align="right" width="150" src="https://user-images.githubusercontent.com/3639170/131080946-bd57d4b2-1307-4109-b198-b3c89ef3a71a.png" />

# Next Relay Bridge

Middleware to simplify using Next.js with the Relay GraphQL client.

## What is it?

Next Relay Bridge makes it easy to server-side render Next.js pages that rely on Relay data. With the utilities that Next Relay Bridge provides, you can load Relay queries server-side and use the resultant data to initialize your Relay store on the client.

On the server, we await your queries to create the Relay store's initial state. This initial state is sent to the client, which uses it to hydrate the Relay environment's initial store.

On the client, on first app render, we create the client-side Relay environment with the initial data that was sent by the server. The initial page that was requested can use this hydrated store to get its data, so we can render immediately without any data fetches.

On subsequent client-side page navigations, we fetch the data client-side so that you can use Suspense as necessary for progrsesive loading.

## Adding to an existing project

1. Install Next Relay Bridge with `yarn add next-relay-bridge` or `npm -i next-relay-bridge`.

2. Create a file to initialze Next Relay Bridge. In this example, we'll refer to this file as `"../path/to/bridge"`.

3. In this file, create the `withAppBridge` and `withPageBridge` utilities that you'll use to interface with the system using the `createNextRelayBridge` function. Export `withAppBridge` and `withPageBridge` from this file so we can use it in our application.

```js
// path/to/bridge.js
import { createNextRelayBridge } from "next-relay-bridge";

const { withAppBridge, withPageBridge } = createNextRelayBridge({
  getServerEnvironment: () => {
    /**
     * This function should return the Relay environment that we'll use on the server.
     *
     * @see: /example/relay/serverEnvironment.ts
     */
  },
  getClientEnvironment: (initialStore) => {
    /**
     * This function should return the Relay environment that we'll use on the client.
     * This environment must initialize it's store with the incoming `initialStore` value
     * that this function receives.
     *
     * @see: /example/relay/clientEnvironment.ts
     */
  },
});

export { withAppBridge, withPageBridge };
```

4. Wrap your Next.js `_app` component with `withAppBridge` as seen below. Your app component will now receive an additional `relayEnvironment` prop. Pass this to your `<RelayEnvironmentProvider>`.

```js
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { withAppBridge } from "../path/to/bridge";

function MyApp({ Component, pageProps, relayEnvironment }) {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Component {...pageProps} />
    </RelayEnvironmentProvider>
  );
}

export default withAppBridge({
  AppComponent: MyApp,
});
```

5. To use this on a page component, wrap your page component with `withPageBridge` as seen below. `withPageBridge` takes an object as its argument where `AppComponent` should be your page component, and `getInitialProps` should be an async function that returns your page component's initial props.

`getInitialProps` receives an object as its argument, where `context` is the Next.js [context object](https://nextjs.org/docs/api-reference/data-fetching/getInitialProps#context-object), and `preloadQuery` is an async function that you use to preload any queries that you want to pass to your page component.

```js
import { usePreloadedQuery } from "react-relay";
import { graphql } from "relay-runtime"; //`
import { SafeSuspense } from "next-relay-bridge";
import { withPageBridge } from "../path/to/bridge";

const somePageQuery = graphql`
  query somePageQuery {
    viewer {
      example
    }
  }
`;

function SomePageContent({
  name,
  someQueryReference
}) {
  const data = usePreloadedQuery(
    somePageQuery,
    someQueryReference
  );
  return (
    <div>
      My name is {name} and my data is: {JSON.stringify(data)}
    </div>
  );
}

function SomePage(props) {
  return (
    <SafeSuspense fallback="Loading...">
      <SomePageContent {...props} />
    </SafeSuspense>
  );
}

export default withPageBridge({
  PageComponent: SomePage,
  getInitialProps: async ({ context, preloadQuery }) => {
    // Use the incoming `preloadQuery` function to load queries. You _must_ await these.
    const someQueryReference = await preloadQuery(somePageQuery, {});

    // Return any initial props that your page component needs. Next Relay Bridge will introspect
    // the props and only process props that have been ran through `preloadQuery`.
    return {
      name: 'Friend',
      someQueryReference
    }
  }
});
```

That's it! When a user navigates to `SomePage` directly, we'll wait until the queries have resolved before sending the page up to the client. The client will use the server-side data to initialize its store, and you'll be able to display the whole page without any additional data requests.

When navigating to `SomePage` on the client via client-side routing, the client will fetch the data and your page will suspend while the data is being fetched.

## Creating a new Next.js project with Relay and Next Relay Brdige

Detailed instructions coming soon...

## Additional features

* **`SafeSuspense`**
  * `next-relay-bridge` exports a `SafeSuspense` component that you can use to suspend while data is being fetched on the client. Currently, we can't use `React.Suspense` on the server, so this component wraps its children with a `React.Fragment` if on the server, or a `React.Suspense` if on the client.
  * If your `SafeSuspense` children will suspend on the server (something that is not yet yet supported by ReactDOMServer), pass `SafeSuspense` a `clientOnly={true}` prop so that it will render `null` on the server.
* **Redirects**
  * If you need to redireect from a page component using `withPageBridge`, your `getInitialProps` function can return an object that has a `redirect` value. It should match the shape of `{ destination: string, permanent?: boolean | number }`. If `permanent` is `false`, it will be treated as a 307 redirect. If `permanent` is true, it'll be a 308. You can also pass `permanent` a redirect status code to set it directly.
