export default async function fetchGraphQL(
  query: string | null | undefined,
  variables: {
    [k: string]: unknown;
  }
) {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return response.json();
}
