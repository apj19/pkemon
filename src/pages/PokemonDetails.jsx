import React from "react";
import { useParams } from "react-router-dom";
import {
  getListofEvoluation,
  showPokemons,
} from "../utilities/pokemonfunctions";
import { useEffect } from "react";

function PokemonDetails() {
  let { pokemonname } = useParams();
  // let text = "urshifu-rapid-strike-gmax";

  // console.log(pokemonname.includes("-"));
  if (pokemonname.includes("-")) {
    let indx = pokemonname.indexOf("-");
    pokemonname = pokemonname.slice(0, indx);
  }

  const evoluationApi = `https://pokeapi.co/api/v2/pokemon-species/${pokemonname.toLowerCase()}`;

  async function loadAllData() {
    const evoluationList = await getListofEvoluation(evoluationApi);
    console.log(evoluationList);
    const evoluationPokemonData = await showPokemons(evoluationList);
    console.log(evoluationPokemonData);
  }

  useEffect(() => {
    loadAllData();
  }, []);

  return <div className="pt-14 pl-[200px] ">PokemonDetails {pokemonname}</div>;
}

export default PokemonDetails;
