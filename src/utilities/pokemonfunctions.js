import axios from "axios";
async function getListofEvoluation(url) {
  // console.log(url);
  let data;
  try {
     data = await axios.get(url);
  } catch (error) {
    // console.log(error);
    return [];
  }
    // const data = await axios.get(url);
    // console.log(data.status);

    const evoluation = await axios.get(data.data.evolution_chain.url);
    if(evoluation.status == 404){
      console.log("not found");
      return null;
    }

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
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`
      );
      if(result.status == 404){
        return null;
      }else{
        const res = result.data;
      
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

      }
      
    });

    const results = await Promise.all(promises).catch((err) =>{
      // log that I have an error, return the entire array;
      console.log('A promise failed to resolve', err);
      return [];
  });
    
    return results
    
    
  }

  export {getListofEvoluation,showPokemons}