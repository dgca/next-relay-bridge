import type { NextApiRequest, NextApiResponse } from "next";

export default async function graphql(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      method,
      headers: { host, ...restHeaders },
      body,
    } = req;

    const headers = {
      "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
      ...restHeaders,
    };

    const options = {
      method,
      headers,
      body: JSON.stringify({
        query: body.query,
        variables: body.variables,
      }),
    };

    const data = await fetch(
      process.env.HASURA_RELAY_ENDPOINT as string,
      // @ts-ignore
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
