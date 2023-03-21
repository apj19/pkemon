import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function Test4() {
  const [list, setlist] = useState([]);
  async function showPokemons() {
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=3`);
    const data = await api.json();
    const promises = await data.results.map(async (pokemon) => {
      let num = Math.ceil(Math.random() * 35);
      //   console.log(pokemon.url);
      const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${num}/`);
      const res = await result.json();
      return res.name;
    });

    const results = await Promise.all(promises);
    // let newlist= [...results]
    setlist(results);
    // console.log(results);
  }
  useEffect(() => {
    showPokemons();
  }, []);

  return (
    <div>
      {list.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
    </div>
  );
}

export default Test4;
