import type { NextApiRequest, NextApiResponse } from "next";

export default async function graphql(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      method,
      headers: { host, ...requestHeaders},
      body,
    } = req;

    const adminSecret = process.env.HASURA_ADMIN_SECRET;
    if (typeof adminSecret === 'undefined') {
      throw new Error('must define your admin secret in the env file');
    }
    requestHeaders['x-hasura-admin-secret'] = adminSecret;

    const options = {
      method,
      headers: requestHeaders as HeadersInit, // fetch needs HeadersInit
      body: JSON.stringify({
        query: body.query,
        variables: body.variables,
      }),
    };

    const endpoint = process.env.HASURA_RELAY_ENDPOINT;
    if (typeof endpoint === 'undefined') {
      throw new Error('endpoint must be in env file');
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