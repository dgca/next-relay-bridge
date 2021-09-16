import React from "react";
import QueryManager from "../components/QueryManager";
export default function withAppBridge({ AppComponent, getServerEnvironment, getClientEnvironment, }) {
    return function AppWrapper(props) {
        return (React.createElement(QueryManager, { ...props, AppComponent: AppComponent, getServerEnvironment: getServerEnvironment, getClientEnvironment: getClientEnvironment }));
    };
}
