import type { NextApiRequest, NextApiResponse } from "next";

export default async function graphql(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { method, headers, body } = req;

    const newHeaders = { ...headers } as Record<string, string>;
    delete newHeaders.host; // the fetch fails if this is present

    const adminSecret = process.env.HASURA_ADMIN_SECRET;
    if (typeof adminSecret === 'undefined') {
      throw new Error('HASURA_ADMIN_SECRET must define in the env file');
    }
    newHeaders['x-hasura-admin-secret'] = adminSecret;

    const options = {
      method,
      headers: newHeaders,
      body: JSON.stringify({
        query: body.query,
        variables: body.variables,
      }),
    };

    const endpoint = process.env.HASURA_RELAY_ENDPOINT;
    if (typeof endpoint === 'undefined') {
      throw new Error('HASURA_RELAY_ENDPOINT must be defined in env file');
    }

    const data = await fetch(
      endpoint,
      options
    ).then((res) => res.json());

    res.status(200).send(data);
  } catch (error) {
    res.status(error.status || 500).json({
      code: error.code,
      error: error.message,
    });
  }
}