import React, { Suspense, Fragment, SuspenseProps } from "react";
import isServer from "../utils/isServer";

type SafeSuspenseProps = SuspenseProps & {
  clientOnly: boolean;
};

export default function SafeSuspense({
  children,
  fallback,
  clientOnly,
}: SafeSuspenseProps) {
  if (isServer()) {
    return <Fragment>{clientOnly ? null : children}</Fragment>;
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
}
