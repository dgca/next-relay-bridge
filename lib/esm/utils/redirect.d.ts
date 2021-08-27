import type { NextPageContext } from "next";
declare type RedirectCodes = 301 | 302 | 303 | 307 | 308;
export default function redirect({ res }: NextPageContext, path: string, permanent?: boolean | RedirectCodes): void;
export {};
