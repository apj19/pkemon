import React from "react";
import { useParams } from "react-router-dom";
import {
  getListofEvoluation,
  showPokemons,
} from "../utilities/pokemonfunctions";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../Components/Card";
import { ClimbingBoxLoader } from "react-spinners";
import axios from "axios";

function PokemonDetails() {
  let { pokemonname } = useParams();
  const [pokemonList, setPokemonList] = useState([]);
  const [showLoder, setShowLoader] = useState(false);
  const statesData = [];

  if (pokemonname.includes("-")) {
    let indx = pokemonname.indexOf("-");
    pokemonname = pokemonname.slice(0, indx);
  }

  const evoluationApi = `https://pokeapi.co/api/v2/pokemon-species/${pokemonname.toLowerCase()}`;
  const pokemonDetailsApi = `https://pokeapi.co/api/v2/pokemon/${pokemonname.toLowerCase()}`;

  async function loadAllData() {
    // setShowLoader(true);
    const pdata = await axios.get(pokemonDetailsApi);
    const pstates = pdata.data.stats;
    pstates.forEach((e) => {
      // console.log(e.stat.name, e.base_stat);
      statesData.push({ stateName: e.stat.name, stateValue: e.base_stat });
    });
    console.log(statesData);
    // console.log(pstates);
    // const evoluationList = await getListofEvoluation(evoluationApi);
    // console.log(evoluationList);
    // const evoluationPokemonData = await showPokemons(evoluationList);
    // setShowLoader(false);
    // console.log(evoluationPokemonData);
    // setPokemonList(evoluationPokemonData);
  }

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <div className="pt-14 ">
      {/* {showLoder && (
        <div className="absolute w-full h-full backdrop-blur-lg   flex justify-center items-center z-10 left-0 top-0">
          
          <ClimbingBoxLoader color="#36d7b7" />
        </div>
      )} */}
      PokemonDetails {pokemonname}
      {/* <div className="flex flex-col md:flex-row gap-4">
        {pokemonList.map((pokemon, i) => (
          // <Link key={i} to={`/pokemon/${pokemon.pokemonName}`}>
          //   <Card imgsrc={pokemon?.PokemonImgSrc} name={pokemon.pokemonName} />
          // </Link>
          <Card
            key={i}
            imgsrc={pokemon?.PokemonImgSrc}
            name={pokemon.pokemonName}
          />
        ))}
      </div> */}
    </div>
  );
}

export default PokemonDetails;
