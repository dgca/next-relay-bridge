import type { NextApiRequest, NextApiResponse } from "next";

export default async function graphql(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      method,
      headers: { ...restHeaders },
      body,
    } = req;

    const moreHeaders = {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
      ...restHeaders,
    };

    const options = {
      method,
      moreHeaders,
      body: JSON.stringify({
        query: body.query,
        variables: body.variables,
      }),
    };

    const endpoint = process.env.HASURA_RELAY_ENDPOINT;
    if (endpoint === undefined) throw new Error('HASURA_RELAY_ENDPOINT not found in env file');

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
