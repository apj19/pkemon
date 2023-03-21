import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, additem } from "../features/counterSlice";
import { data2 } from "../utilities/mainData";
import { top20pokemons } from "../utilities/mainApi";
import axios from "axios";
import { useEffect } from "react";

function Test2() {
  const count = useSelector((state) => state.counter.value);
  const list1 = useSelector((state) => state.counter.list);
  const [list, setlist] = useState(useSelector((state) => state.counter.list));

  const dispatch = useDispatch();
  const [pokemonData, setPokemonData] = useState([]);
  const data2 = [
    {
      pname: "bulbasaur",
      pimg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg",
    },
    {
      pname: "ivysaur",
      pimg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg",
    },
    {
      pname: "venusaur",
      pimg: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg",
    },
  ];

  let data;
  async function fetchpokemons(link) {
    // data = await axios.get(link);

    let firstpokemonlist = data2;
    // console.log(firstpokemonlist);
    firstpokemonlist.map(async (p) => {
      let rawdata = await axios.get(p.pname);
      let name = p.pname;
      let imagesrc = rawdata.data.sprites.other.dream_world.front_default;
      console.log(rawdata);
      //   dispatch(additem({ pname: name, pimg: imagesrc }));
      //   setPokemonData([...pokemonData, { pname: name, pimg: imagesrc }]);
    });

    // firstpokemonlist.map(async (p) => {
    //   let rawdata = await axios.get(p.url);
    //   let name = p.name;
    //   let imagesrc = rawdata.data.sprites.other.dream_world.front_default;
    //   dispatch(additem({ pname: name, pimg: imagesrc }));
    //   //   pdata.push({ pname: name, pimg: imagesrc });
    //   console.log({ pname: name, pimg: imagesrc });
    //   // setPokemonData([...pokemonData, { pname: name, pimg: imagesrc }]);
    // });
  }
  useEffect(() => {
    fetchpokemons("https://pokeapi.co/api/v2/pokemon/?limit=3");
  }, []);

  return (
    <div>
      {pokemonData.map((m, i) => (
        <div key={i}>
          <p>{m.pname}</p>
        </div>
      ))}
    </div>
  );
}

export default Test2;
