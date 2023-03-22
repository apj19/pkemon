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


  async function showPokemons(pokemonArray) {
  
    // const dummyArray = [25, 6, 9, 12, 15, 18, 21, 29, 35, 1, 150, 19];
    const promises = pokemonArray.map(async (pokemon) => {
      const result = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
      );
      const res = await result.json();
      
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
    return results
    
    
  }

  export {getListofEvoluation,showPokemons}