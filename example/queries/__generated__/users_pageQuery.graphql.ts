/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type users_pageQueryVariables = {};
export type users_pageQueryResponse = {
    readonly users_connection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly username: string;
                readonly pk: unknown;
                readonly todos: ReadonlyArray<{
                    readonly title: string;
                    readonly id: string;
                }>;
                readonly id: string;
            };
        }>;
    };
};
export type users_pageQuery = {
    readonly response: users_pageQueryResponse;
    readonly variables: users_pageQueryVariables;
};



/*
query users_pageQuery {
  users_connection {
    edges {
      node {
        username
        pk
        todos {
          title
          id
        }
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
  "name": "id",
  "storageKey": null
},
v1 = [
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "username",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "pk",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "todos",
                "kind": "LinkedField",
                "name": "todos",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  (v0/*: any*/)
                ],
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "users_pageQuery",
    "selections": (v1/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "users_pageQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3f6fa1c0a3dc73c86f18fe247cd86b7d",
    "id": null,
    "metadata": {},
    "name": "users_pageQuery",
    "operationKind": "query",
    "text": "query users_pageQuery {\n  users_connection {\n    edges {\n      node {\n        username\n        pk\n        todos {\n          title\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '65d1a24abe9d3fc6b7dcf7eb7dc9d634';
export default node;
