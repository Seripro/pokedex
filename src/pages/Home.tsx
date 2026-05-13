import { useEffect, useState } from "react";
import { PokemonCard } from "../components/PokemonCard";
import type { Pokemon, PokemonNameAndUrl } from "../type/pokemon";
import { fetchPokemonList, getIdFromUrl } from "../api/pokemon";

export const Home = () => {
  const [data, setData] = useState<Pokemon[]>();
  useEffect(() => {
    const fetchData = async () => {
      const allData: PokemonNameAndUrl[] = await fetchPokemonList("?limit=100");
      const data = allData.map((poke) => {
        const id = getIdFromUrl(poke.url);
        return {
          id: id,
          name: poke.name,
          sprites: {
            front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          },
        };
      });
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      {data?.map((poke) => (
        <PokemonCard key={poke.id} data={poke ?? null} />
      ))}
    </>
  );
};
