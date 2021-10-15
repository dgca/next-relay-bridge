import React, { SuspenseProps } from "react";
declare type SafeSuspenseProps = SuspenseProps & {
    clientOnly?: boolean;
};
export default class SafeSuspense extends React.Component<SafeSuspenseProps> {
    state: {
        isReady: boolean;
    };
    constructor(props: SafeSuspenseProps);
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
