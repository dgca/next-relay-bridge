import React from "react";
import { QueryManagerPropTypes } from "../types";
export default class QueryManager extends React.Component<QueryManagerPropTypes> {
    constructor(props: QueryManagerPropTypes);
    static getDerivedStateFromProps(props: any, state: any): {};
    componentWillUnmount(): void;
    getRelayEnvironment(): any;
    render(): JSX.Element;
}
