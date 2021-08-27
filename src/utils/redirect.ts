import Router from "next/router";
import type { NextPageContext } from "next";

type RedirectCodes = 301 | 302 | 303 | 307 | 308;

function getRedirectCode(
  codeOrPermanent: RedirectCodes | boolean
): RedirectCodes {
  if (typeof codeOrPermanent === "boolean") {
    return codeOrPermanent ? 308 : 307;
  }
  return codeOrPermanent;
}

export default function redirect(
  { res }: NextPageContext,
  path: string,
  permanent: boolean | RedirectCodes = false
) {
  if (res) {
    res.writeHead(getRedirectCode(permanent), {
      Location: path,
    });
    res.end();
  } else {
    Router.replace(path);
  }
}
