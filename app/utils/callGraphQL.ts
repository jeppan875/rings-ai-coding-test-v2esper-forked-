export const callGraphQL = async <TVariables>(
  query: string,
  variables: TVariables
) => {
  const res = await fetch("https://rickandmortyapi.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  return json;
};
