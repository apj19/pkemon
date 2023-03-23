import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../Components/Card";

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const getPokemonApi = `https://pokeapi.co/api/v2/pokemon?limit=12&offset=`;
  function callAPI(pagenumber) {
    console.log("api called with page", pagenumber);
  }
  function handleclick(pagenumber) {
    if (pagenumber == "prv") {
      if (currentPage == 1) {
      } else {
        setCurrentPage(currentPage - 1);
      }
    } else if (pagenumber == "nxt") {
      if (currentPage == 4) {
      } else {
        setCurrentPage(currentPage + 1);
      }
    } else {
      setCurrentPage(pagenumber);
    }

    // console.log(pagenumber);
  }

  async function getPageData(offset) {
    const rawdata = await axios.get(getPokemonApi + offset);
    const rawpokemonList = rawdata.data.results;
    // console.log(rawdata.data.results);
    let pokemonNamesarray = [];
    rawpokemonList.forEach((e) => {
      pokemonNamesarray.push(e.name);
    });

    return pokemonNamesarray;
  }

  // const IntailArray = [25, 6, 9, 493, 249, 384, 382, 383, 483, 484, 487, 150];

  async function showPokemons(latestPage) {
    // const api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);
    // const data = await api.json();
    if (latestPage == 1) {
      latestPage = 0;
    }
    let dummyArray = await getPageData(latestPage * 5);

    const promises = dummyArray.map(async (pokemon) => {
      //   let num = Math.ceil(Math.random() * 100);
      const result = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
      );
      const res = await result.json();
      //   console.log(res);
      let imagesrc =
        res.sprites.other.dream_world.front_default ||
        res.sprites.other.home.front_default ||
        res.sprites.other.home.front_shiny;
      let name = res.name;
      let returnobj = {
        id: res.id,
        pokemonName: name,
        PokemonImgSrc: imagesrc,
      };
      return returnobj;
    });

    const results = await Promise.all(promises);
    // let newlist= [...results]
    setPokemonList(results);
    // console.log(results);
  }
  useEffect(() => {
    showPokemons(currentPage);
    // callAPI(currentPage);
    // getPageData(5);
  }, [currentPage]);

  return (
    <div>
      <div className="pt-14 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center z-0 ">
        {pokemonList.map((pokemon, i) => (
          <Link key={i} to={`/pokemon/${pokemon.id}`} state={pokemon}>
            <Card imgsrc={pokemon?.PokemonImgSrc} name={pokemon.pokemonName} />
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center mt-8">
        <div className="flex">
          <button
            onClick={(event) => handleclick("prv")}
            className="flex items-center px-4 py-2 mx-1 text-white border border-gray-400 dark:border-gray-800 rounded-md  dark:text-gray-400 hover:scale-105 "
            disabled={currentPage == 1 ? true : false}
          >
            Previous
          </button>

          <button
            onClick={(event) => handleclick(1)}
            className="flex items-center px-4 py-2 mx-1 text-white border border-gray-400 dark:border-gray-800 rounded-md dark:text-gray-400 hover:scale-105"
          >
            1
          </button>
          <button
            onClick={(event) => handleclick(2)}
            className="flex items-center px-4 py-2 mx-1 text-white border border-gray-400 dark:border-gray-800 rounded-md dark:text-gray-400 hover:scale-105"
          >
            2
          </button>
          <button
            onClick={(event) => handleclick(3)}
            className="flex items-center px-4 py-2 mx-1 text-white border border-gray-400 dark:border-gray-800 rounded-md dark:text-gray-400 hover:scale-105"
          >
            3
          </button>
          <button
            onClick={(event) => handleclick(4)}
            className="flex items-center px-4 py-2 mx-1 text-white border border-gray-400 dark:border-gray-800 rounded-md dark:text-gray-400 hover:scale-105"
          >
            4
          </button>

          <button
            onClick={(event) => handleclick("nxt")}
            className="flex items-center px-4 py-2 mx-1 text-white border border-gray-400 dark:border-gray-800 rounded-md dark:text-gray-400 hover:scale-105"
            disabled={currentPage == 4 ? true : false}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
