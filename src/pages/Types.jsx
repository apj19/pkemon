import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import CircleLoader from "react-spinners/CircleLoader";
import { pokemontypeColor } from "../utilities/pokemonTypes";
import Card from "../Components/Card";
import axios from "axios";

function Types() {
  const { typeName } = useParams();
  const [typePokemon, setTypePokemon] = useState([]);
  const [showLoder, setShowLoader] = useState(false);
  const [textColor, setTextColor] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  // console.log(typeName);
  // console.log("currentPage", currentPage);
  const typApi = "https://pokeapi.co/api/v2/type/";

  async function loadAllPokemons(start) {
    let api;
    try {
      api = await axios.get(`${typApi}${typeName}/`);
    } catch (error) {
      // console.log(error);
      navigate("/notfound");
      return [];
    }
    // const data = await api.json();
    let typespokemons = api.data.pokemon;
    return typespokemons.slice(start, start + 12);
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

  async function showPokemons(start) {
    setShowLoader(true);
    if (start == 1) {
      start == 0;
    } else {
      start = (start - 1) * 12;
    }

    let inputlist = await loadAllPokemons(start);
    // console.log(inputlist);
    if (inputlist.length != 0) {
      let randomPokemons = [];
      for (let i = 0; i < 12; i++) {
        randomPokemons.push(inputlist[i].pokemon);
      }
      // console.log(randomPokemons);
      const promises = randomPokemons.map(async (pokemon) => {
        //   let num = Math.ceil(Math.random() * 100);
        const result = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}/`
        );
        const res = await result.json();
        //   console.log(res);
        // let imagesrc = res.sprites.other.dream_world.front_default;
        let imagesrc =
          res.sprites.other.dream_world.front_default ||
          res.sprites.other.home.front_default ||
          res.sprites.other.home.front_shiny ||
          res.sprites.front_shiny ||
          res.sprites.front_default;

        let name = res.name;
        let returnobj = {
          id: res.id,
          pokemonName: name,
          PokemonImgSrc: imagesrc,
        };
        return returnobj;
      });

      const results = await Promise.all(promises);
      // console.log("checkthis", results);
      setTypePokemon(results);
      setShowLoader(false);
    }

    // console.log(results);
  }
  let orignaltype = typeName;
  // console.log(orignaltype);
  // console.log(currentPage);
  useEffect(() => {
    window.scrollTo(0, 0);
    showPokemons(currentPage);
    setTextColor(`${pokemontypeColor[`${typeName}`]}`);
  }, [currentPage, typeName]);

  // console.log(textColor);
  //  text-[${
  // pokemontypeColor[`${typeName}`]
  return (
    <div>
      {showLoder && (
        <div className="absolute w-full h-full backdrop-blur-lg   flex justify-center items-center z-10 left-0 top-0">
          {/* <ClockLoader color="#ff0500" /> */}
          <CircleLoader color="#36d7b7" />
        </div>
      )}
      <div className="mx-auto max-w-xl text-center pt-20">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          <strong
            className="font-extrabold  sm:block uppercase tracking-widest"
            style={{ color: textColor }}
          >
            {typeName}
          </strong>
        </h1>

        <p className="mt-4 sm:text-xl sm:leading-relaxed">Type Pokemon</p>
      </div>

      <div className="pt-14  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
        {typePokemon.map((pokemon, i) => (
          <Link key={i} to={`/pokemon/${pokemon.id}`} state={pokemon}>
            <Card
              imgsrc={pokemon?.PokemonImgSrc}
              name={pokemon.pokemonName}
              textColor={textColor}
            />
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
            className={`flex items-center px-4 py-2 mx-1 text-white border border-gray-400 dark:border-gray-800 rounded-md dark:text-gray-400 hover:scale-105 
            ${currentPage == 1 ? "border-red-500" : "border-gray-400 "}`}
          >
            1
          </button>
          <button
            onClick={(event) => handleclick(2)}
            className={`flex items-center px-4 py-2 mx-1 text-white border border-gray-400 dark:border-gray-800 rounded-md dark:text-gray-400 hover:scale-105${
              currentPage == 2 ? "border-red-500" : "border-gray-400 "
            }`}
          >
            2
          </button>
          <button
            onClick={(event) => handleclick(3)}
            className={`flex items-center px-4 py-2 mx-1 text-white border border-gray-400 dark:border-gray-800 rounded-md dark:text-gray-400 hover:scale-105 ${
              currentPage == 3 ? "border-red-500" : "border-gray-400 "
            }`}
          >
            3
          </button>
          <button
            onClick={(event) => handleclick(4)}
            className={`flex items-center px-4 py-2 mx-1 text-white border border-gray-400 dark:border-gray-800 rounded-md dark:text-gray-400 hover:scale-105 ${
              currentPage == 4 ? "border-red-500" : "border-gray-400 "
            }`}
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

export default Types;
