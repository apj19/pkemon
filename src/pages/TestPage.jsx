import React, { useState } from "react";
import axios from "axios";
import { top20pokemons } from "../utilities/mainApi";
import { useEffect } from "react";
import { homepageData, data2 } from "../utilities/mainData";
function TestPage() {
  let data;
  let pdata = [];

  const [pokemonData, setPokemonData] = useState(data2);
  async function fetchpokemons(link) {
    data = await axios.get(link);
    // data = await axios.get("https://pokeapi.co/api/v2/pokemon/1/");
    // console.log(data.data.sprites.other.dream_world.front_default);

    let firstpokemonlist = data.data.results;
    // console.log(firstpokemonlist);
    // console.log(data.data.results);
    firstpokemonlist.map(async (p) => {
      let rawdata = await axios.get(p.url);
      // console.log(data.data.sprites.other.dream_world.front_default);
      let name = p.name;
      let imagesrc = rawdata.data.sprites.other.dream_world.front_default;
      pdata.push({ pname: name, pimg: imagesrc });
      console.log({ pname: name, pimg: imagesrc });
      // setPokemonData([...pokemonData, { pname: name, pimg: imagesrc }]);
    });
    // setPokemonData(pdata);
    // console.log(pdata);
  }
  useEffect(() => {
    fetchpokemons(top20pokemons);
  }, []);

  return (
    <div>
      {pokemonData.map((p, i) => (
        <div key={i}>
          <img src={p.pimg} alt="" />
          <p>{p.pname}</p>
        </div>
      ))}
    </div>
  );
}

export default TestPage;
