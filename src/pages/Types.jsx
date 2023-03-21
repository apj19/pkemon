import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { ClockLoader } from "react-spinners";
import CircleLoader from "react-spinners/CircleLoader";
import { pokemontypeColor } from "../utilities/pokemonTypes";
import Card from "../Components/Card";

function Types() {
  const { typeName } = useParams();
  const [typePokemon, setTypePokemon] = useState([]);
  const [showLoder, setShowLoader] = useState(false);
  const [textColor, setTextColor] = useState();

  const typApi = "https://pokeapi.co/api/v2/type/";
  async function showPokemons() {
    setShowLoader(true);
    const api = await fetch(`${typApi}${typeName}/`);
    const data = await api.json();
    let typespokemons = data.pokemon;
    let randomPokemons = [];
    for (let i = 0; i < 12; i++) {
      let generateNumber = [];
      let tempnum = Math.ceil(Math.random() * (typespokemons.length - 1));
      if (generateNumber.includes(tempnum)) {
        tempnum = Math.ceil(Math.random() * (typespokemons.length - 1));
        generateNumber.push(tempnum);
        randomPokemons.push(typespokemons[tempnum].pokemon);
      } else {
        generateNumber.push(tempnum);
        randomPokemons.push(typespokemons[tempnum].pokemon);
      }
    }

    // console.log(randomPokemons);
    // console.log();
    // const dummyArray = [1, 6, 9, 12, 15, 18, 21, 29, 35, 10, 150, 19];
    const promises = randomPokemons.map(async (pokemon) => {
      //   let num = Math.ceil(Math.random() * 100);
      const result = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`
      );
      const res = await result.json();
      //   console.log(res);
      // let imagesrc = res.sprites.other.dream_world.front_default;
      let imagesrc =
        res.sprites.other.dream_world.front_default ||
        res.sprites.other.home.front_default ||
        res.sprites.other.home.front_shiny ||
        res.sprites.front_shiny ||
        res.sprites.front_default;

      let name = res.name;
      let returnobj = {
        pokemonName: name,
        PokemonImgSrc: imagesrc,
      };
      return returnobj;
    });

    const results = await Promise.all(promises);
    // let newlist= [...results]
    setTypePokemon(results);
    setShowLoader(false);
    // console.log(results);
  }
  useEffect(() => {
    showPokemons();
    setTextColor(`${pokemontypeColor[`${typeName}`]}`);
  }, [typeName]);

  // console.log(textColor);
  //  text-[${
  // pokemontypeColor[`${typeName}`]
  return (
    <div className="pt-14 pl-[200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 place-items-center">
      {showLoder && (
        <div className="absolute w-full h-full backdrop-blur-lg   flex justify-center items-center z-10 left-0 top-0">
          {/* <ClockLoader color="#ff0500" /> */}
          <CircleLoader color="#36d7b7" />
        </div>
      )}
      {typePokemon.map((pokemon, i) => (
        <Link key={i} to={`/pokemon/${pokemon.pokemonName}`}>
          <Card
            imgsrc={pokemon?.PokemonImgSrc}
            name={pokemon.pokemonName}
            textColor={textColor}
          />
        </Link>
      ))}
    </div>
  );
}

export default Types;
