import React, { Suspense, Fragment } from "react";
import isServer from "../utils/isServer";

export default function SafeSuspense({ children, fallback, clientOnly }: any) {
  if (isServer()) {
    return <Fragment>{clientOnly ? null : children}</Fragment>;
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
}
