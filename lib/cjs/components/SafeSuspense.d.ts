import { SuspenseProps } from "react";
declare type SafeSuspenseProps = SuspenseProps & {
    clientOnly?: boolean;
};
export default function SafeSuspense({ children, fallback, clientOnly, }: SafeSuspenseProps): JSX.Element;
export {};
