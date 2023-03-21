import React, { useState } from "react";
import { useEffect } from "react";

function Home() {
  const [pokemonList, setPokemonList] = useState([]);

  async function showPokemons() {
    // const api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);
    // const data = await api.json();
    const dummyArray = [1, 6, 9, 12, 15, 18, 21, 29, 35, 10, 150, 19];
    const promises = dummyArray.map(async (pokemon) => {
      //   let num = Math.ceil(Math.random() * 100);
      const result = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
      );
      const res = await result.json();
      //   console.log(res);
      let imagesrc =
        res.sprites.other.dream_world.front_default ||
        res.sprites.other.home.front_default ||
        res.sprites.other.home.front_shiny;
      let name = res.name;
      let returnobj = {
        id: pokemon,
        pokemonName: name,
        PokemonImgSrc: imagesrc,
      };
      return returnobj;
    });

    const results = await Promise.all(promises);
    // let newlist= [...results]
    setPokemonList(results);
    // console.log(results);
  }
  useEffect(() => {
    showPokemons();
  }, []);

  return (
    <div className=" pl-[150px] pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {pokemonList.map((pokemon, i) => (
        <div
          key={i}
          className="flex flex-col justify-center items-center rounded-md w-[200px] h-[200px] bg-[#0c0c0c] drop-shadow-lg "
        >
          <img
            className="w-[150px] h-[150px]"
            src={pokemon?.PokemonImgSrc}
            alt="Not Found"
          />
          <p className="tracking-wider">{pokemon.pokemonName}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
