import React, { Suspense, Fragment, SuspenseProps } from "react";
import isServer from "../utils/isServer";

type SafeSuspenseProps = SuspenseProps & {
  clientOnly?: boolean;
};

let isClient = !isServer();

export default class SafeSuspense extends React.Component<SafeSuspenseProps> {
  state: {
    isReady: boolean;
  };

  constructor(props: SafeSuspenseProps) {
    super(props);
    this.state = {
      isReady: isClient,
    };
  }

  componentDidMount() {
    if (!isClient) {
      isClient = true;
      this.setState({
        isReady: true,
      });
    }
  }

  render() {
    const { clientOnly, children, fallback } = this.props;

    if (isClient) {
      return <Suspense fallback={fallback}>{children}</Suspense>;
    }

    return <Fragment>{clientOnly ? null : children}</Fragment>;
  }
}
