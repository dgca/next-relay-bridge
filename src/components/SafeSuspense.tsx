import React, { Suspense, Fragment } from "react";
import isServer from "../utils/isServer";

export default function SafeSuspense(props: any) {
  const canSuspend = !isServer();
  const Wrapper = canSuspend ? Suspense : Fragment;
  return <Wrapper {...(canSuspend ? props : {})} />;
}
