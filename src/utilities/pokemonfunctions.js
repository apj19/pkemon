import axios from "axios";
async function getListofEvoluation(url) {
    const data = await axios.get(url);
    const evoluation = await axios.get(data.data.evolution_chain.url);

    let evolutionArray = [evoluation.data.chain.species.name];
    let evolutionQueue = evoluation.data.chain.evolves_to;

    // console.log("origional", evolutionQueue);
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
    return evolutionArray;
  }

  export {getListofEvoluation}