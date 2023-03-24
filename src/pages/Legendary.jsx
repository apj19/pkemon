import React, { useState } from "react";
import { showPokemons as legendaryPokemons } from "../utilities/pokemonfunctions";
import { useEffect } from "react";
import { Link } from "react-router-dom";
function Legendary() {
  const legendaryPokemonsList = [
    493, 249, 384, 382, 383, 483, 484, 487, 150, 250,
  ];
  const [legendPokemons, setLegendPokemons] = useState([]);

  async function legendaryokemons(array) {
    const result = await legendaryPokemons(array);
    setLegendPokemons(result);
  }
  useEffect(() => {
    legendaryokemons(legendaryPokemonsList);
  }, []);

  return (
    <div>
      <div className="mx-auto max-w-xl text-center pt-20">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          <strong className="font-extrabold  sm:block uppercase tracking-widest text-red-500">
            LEGENDARY POKEMONS
          </strong>
        </h1>
      </div>

      <div className="pt-14  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
        {legendPokemons.map((p, i) => (
          <Link key={i} to={`/pokemon/${p.id}`} state={p}>
            <div className="animate-scale-up-hor-center flex flex-col justify-center items-center rounded-md w-[200px] h-[200px] backdrop-blur-sm border border-yellow-500 drop-shadow-lg hover:drop-shadow-2xl cursor-pointer">
              <img
                className="w-[150px] h-[150px]"
                src={p.PokemonImgSrc == null ? "../ball.png" : p.PokemonImgSrc}
                alt="Not Found"
              />
              <p className="text-[1.3rem] tracking-wider text-yellow-500">
                {p.pokemonName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Legendary;
