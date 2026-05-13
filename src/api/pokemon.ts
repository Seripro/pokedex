import type { PokemonNameAndUrl } from "../type/pokemon";

export const fetchPokemonList = async (
  query: string,
): Promise<PokemonNameAndUrl[]> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon${query}`);
  const data = await response.json();
  return data.results;
};
