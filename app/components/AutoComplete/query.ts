// Lets only fetch what we need, which is id and name
export const gqlQuery = `
  query GetCharactersLocationsEpisodes($name: String!) {
    characters(page: 1, filter: { name: $name }) {
      results {
        id
        name
      }
    }
  }
`;

export type GetCharactersVariables = {
  name: string;
};

export type GetCharactersResponse = {
  characters: {
    results: { name: string; id: string }[];
  };
};

export type Character = GetCharactersResponse["characters"]["results"][0];
