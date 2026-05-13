import { useEffect, useState } from "react";
import type { PokemonDetailType } from "../type/pokemon";
import type { StatName } from "../type/stats";
import { getPokemonById } from "../api/pokemon";
import { useParams } from "react-router-dom";

export const PokemonDetail = () => {
  const [data, setData] = useState<PokemonDetailType>();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          setData(await getPokemonById(id));
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <img src={data?.sprites.front_default} />
        <p>No.{data?.id}</p>
        <p>{data?.name}</p>
      </div>
      <div>
        {data?.types.map((item) => {
          return <p>{item.type.name}</p>;
        })}
        <p>
          高さ：{data ? `${data.height / 10} m` : "情報が存在しません"} 重さ：
          {data ? `${data.weight / 10} kg` : "情報が存在しません"}
        </p>
        {data?.abilities.map((item) => {
          return (
            <>
              {item.is_hidden ? (
                <p>隠れ特性：{item.ability.name}</p>
              ) : (
                <p>特性：{item.ability.name}</p>
              )}
            </>
          );
        })}
      </div>
      <div>
        {data?.stats.map((item) => {
          const statLabels = {
            hp: "HP",
            attack: "こうげき",
            defense: "ぼうぎょ",
            "special-attack": "とくこう",
            "special-defense": "とくぼう",
            speed: "すばやさ",
          };
          return (
            <p>
              {statLabels[item.stat.name as StatName]}：{item.base_stat}
            </p>
          );
        })}
      </div>
    </div>
  );
};
