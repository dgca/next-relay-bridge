/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UsersListQueryVariables = {};
export type UsersListQueryResponse = {
    readonly users_connection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly username: string;
                readonly email: string | null;
            };
        }>;
    };
};
export type UsersListQuery = {
    readonly response: UsersListQueryResponse;
    readonly variables: UsersListQueryVariables;
};



/*
query UsersListQuery {
  users_connection {
    edges {
      node {
        username
        email
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "UsersListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "usersConnection",
        "kind": "LinkedField",
        "name": "users_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "usersEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "users",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "UsersListQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "usersConnection",
        "kind": "LinkedField",
        "name": "users_connection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "usersEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "users",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "504dfa6cf03b661912403ea7a5173046",
    "id": null,
    "metadata": {},
    "name": "UsersListQuery",
    "operationKind": "query",
    "text": "query UsersListQuery {\n  users_connection {\n    edges {\n      node {\n        username\n        email\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c2067c4fba647ad086c39e6f4a7d6fc7';
export default node;
