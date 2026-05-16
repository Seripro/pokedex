import { useEffect, useState } from "react";
import { PokemonCard } from "../components/PokemonCard";
import type { PokemonDetailType } from "../type/pokemon";
import { getPokemonsDetail } from "../api/pokemon";
import { Link } from "react-router-dom";
import { Modal } from "../components/Modal";

export const Home = () => {
  const [data, setData] = useState<PokemonDetailType[]>();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  useEffect(() => {
    const fetchData = async () => {
      const allData = await getPokemonsDetail(1, 151);
      setData(allData);
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
        <Link key={poke.id} to={`/detail/${poke.id}`} state={poke}>
          <PokemonCard data={poke ?? null} />
        </Link>
      ))}
    </>
  );
};
