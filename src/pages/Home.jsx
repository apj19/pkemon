import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../Components/Card";

function Home() {
  const [pokemonList, setPokemonList] = useState([]);

  async function showPokemons() {
    // const api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);
    // const data = await api.json();
    const dummyArray = [
      25, 6, 9, 493, 249, 384, 382, 383, 483, 484, 487, 250, 150, 19,
    ];
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
    <div className="pt-14 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center z-0 ">
      {pokemonList.map((pokemon, i) => (
        <Link key={i} to={`/pokemon/${pokemon.id}`} state={pokemon}>
          <Card imgsrc={pokemon?.PokemonImgSrc} name={pokemon.pokemonName} />
        </Link>
      ))}
    </div>
  );
}

export default Home;
