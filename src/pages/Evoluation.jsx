import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { getListofEvoluation } from "../utilities/pokemonfunctions";

function Evoluation() {
  const spacies = "https://pokeapi.co/api/v2/pokemon-species/lotad";

  async function temp() {
    const data = await axios.get(spacies);
    const evoluation = await axios.get(data.data.evolution_chain.url);

    let evolutionArray = [evoluation.data.chain.species.name];
    let evolutionQueue = evoluation.data.chain.evolves_to;

    console.log("origional", evolutionQueue);
    let oneshift = evolutionQueue.shift();
    evolutionQueue = oneshift;
    // console.log("one down", evolutionQueue);
    evolutionArray.push(evolutionQueue?.species.name);
    // console.log(evolutionQueue?.species.name);

    while (evolutionQueue != undefined) {
      evolutionQueue = evolutionQueue.evolves_to[0];
      // console.log(evolutionQueue?.species.name);
      evolutionArray.push(evolutionQueue?.species.name);
    }
    evolutionArray.pop();
    console.log(evolutionArray);
  }
  async function text() {
    let arr = await getListofEvoluation(spacies);
    console.log(arr);
  }
  useEffect(() => {
    // temp();
    // let arr = getListofEvoluation(spacies);
    text();
  }, []);

  return <div>Evoluation</div>;
}

export default Evoluation;
