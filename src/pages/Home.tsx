import { useEffect, useState } from "react";
import { PokemonCard } from "../components/PokemonCard";
import type { Pokemon, PokemonNameAndUrl } from "../type/pokemon";
import { fetchPokemonList, getIdFromUrl } from "../api/pokemon";
import { Link } from "react-router-dom";
import { Modal } from "../components/Modal";

export const Home = () => {
  const [data, setData] = useState<Pokemon[]>();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
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
      <div>
        <button onClick={openModal}>モーダルを開く</button>
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </div>
      {data?.map((poke) => (
        <Link key={poke.id} to={`/detail/${poke.id}`}>
          <PokemonCard data={poke ?? null} />
        </Link>
      ))}
    </>
  );
};
