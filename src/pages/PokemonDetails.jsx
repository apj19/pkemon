import React from "react";
import { useParams } from "react-router-dom";
import { getListofEvoluation } from "../utilities/pokemonfunctions";
import { useEffect } from "react";

function PokemonDetails() {
  let { pokemonname } = useParams();
  // let text = "urshifu-rapid-strike-gmax";
  let newpokemonname;
  if (pokemonname.includes("-")) {
    let indx = pokemonname.indexOf("-");
    newpokemonname = pokemonname.slice(0, indx);
  }

  const evoluationApi = `https://pokeapi.co/api/v2/pokemon-species/${newpokemonname.toLowerCase()}`;

  async function loadAllData() {
    const evoluationList = await getListofEvoluation(evoluationApi);
    console.log(evoluationList);
  }

  useEffect(() => {
    loadAllData();
  }, []);

  return <div className="pt-14 pl-[200px] ">PokemonDetails {pokemonname}</div>;
}

export default PokemonDetails;
