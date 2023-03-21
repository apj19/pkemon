import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

function Test3() {
  const list = [];
  const [pokemonData, setPokemonData] = useState([]);

  async function fetchData(number) {
    let data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`);
    return data.data;
  }

  async function test() {
    for (let i = 1; i < 3; i++) {
      let d1 = await fetchData(i);
      let d2 = d1.sprites.other.dream_world.front_default;
      console.log(d2);
      //   list.push(d2);

      //   let imagesrc = d1.data.sprites.other.dream_world.front_default;
      //   console.log(imagesrc);
    }
    // console.log(list);
    // setPokemonData(list);
  }

  //   useEffect(() => {
  //     test();
  //   }, []);
  const apiURL = "https://pokeapi.co/api/v2/pokemon";
  async function getAllPokemon(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  }
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonGet = await getPokemon(pokemon);
        return pokemonGet;
      })
    );
  };
  function getPokemon({ url }) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  }
  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(apiURL);
      await loadPokemon(response.results);
      //   isLoading(false)
      console.log(response);
    }
    fetchData();
  }, []);

  test();

  return <div>{/* {pokemonData.map((m) => console.log(m))} */}</div>;
}

export default Test3;
