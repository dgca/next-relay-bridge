/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type todos_pageQueryVariables = {};
export type todos_pageQueryResponse = {
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
export type todos_pageQuery = {
    readonly response: todos_pageQueryResponse;
    readonly variables: todos_pageQueryVariables;
};



/*
query todos_pageQuery {
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
    "name": "todos_pageQuery",
    "selections": (v1/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "todos_pageQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c5730874bf03a730f60e98ecf17b32c5",
    "id": null,
    "metadata": {},
    "name": "todos_pageQuery",
    "operationKind": "query",
    "text": "query todos_pageQuery {\n  users_connection {\n    edges {\n      node {\n        username\n        pk\n        todos {\n          title\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '528460a1972bc91bda1d4035991c6858';
export default node;
