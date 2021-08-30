import React, { Suspense, Fragment } from "react";
import isServer from "../utils/isServer";

export default function SafeSuspense({
  children,
  key,
  fallback,
  clientOnly,
}: any) {
  if (isServer()) {
    return <Fragment key={key}>{clientOnly ? null : children}</Fragment>;
  }

  return <Suspense fallback={fallback}>{children}</Suspense>;
}
