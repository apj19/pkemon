import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../Components/Card";
import CircleLoader from "react-spinners/CircleLoader";
import { allpokemons } from "../utilities/Allpokemos";
import { Combobox } from "@headlessui/react";
import { showPokemons as findsinglePokemon } from "../utilities/pokemonfunctions";

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoder, setShowLoader] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [searchPokemon, setSearchPokemon] = useState({});
  const [error, setError] = useState(false);
  const getPokemonApi = `https://pokeapi.co/api/v2/pokemon?limit=12&offset=`;
  const [selectedPerson, setSelectedPerson] = useState("");
  const [query, setQuery] = useState("");
  const filteredPeople =
    query === ""
      ? []
      : allpokemons.filter((person) => {
          return person.toLowerCase().startsWith(query.toLowerCase());
        });

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

  // const legendaryPokemons = [ 493, 249, 384, 382, 383, 483, 484, 487, 150,250];

  async function showPokemons(latestPage) {
    setShowLoader(true);
    // const api = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`);
    // const data = await api.json();
    if (latestPage == 1) {
      latestPage = 0;
    }
    let dummyArray = await getPageData(latestPage * 12);

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
    setShowLoader(false);
    // console.log(results);
  }

  async function findpokemon() {
    setError(false);
    let searchvalue;
    if (selectedPerson.length > query.length) {
      // console.log(selectedPerson);
      searchvalue = selectedPerson;
    } else {
      // console.log(query);
      searchvalue = query;
    }
    // console.log("Search Value", searchvalue);
    if (searchvalue != "") {
      const result = await findsinglePokemon([searchvalue]);
      if (result.length == 0) {
        // console.log("not found");
        setError(true);
        setTimeout(() => setError(false), 2000);
      } else {
        setSearchPokemon(result[0]);
        setShowResult(true);

        // console.log(result);
      }
    } else {
      // console.log("Please enter value");
      setError("true");
    }

    setSelectedPerson("");
    setQuery("");
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    showPokemons(currentPage);
    // callAPI(currentPage);
    // getPageData(5);
  }, [currentPage]);

  return (
    <div>
      {showLoder && (
        <div className="absolute w-full h-full backdrop-blur-lg   flex justify-center items-center z-10 left-0 top-0">
          {/* <ClockLoader color="#ff0500" /> */}
          <CircleLoader color="#36d7b7" />
        </div>
      )}
      <div>
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex  lg:items-center">
            <div className="mx-auto max-w-xl text-center">
              <h1 className="text-3xl font-extrabold sm:text-4xl">
                <strong className="font-extrabold text-red-700 sm:block">
                  PokeDex
                </strong>
              </h1>

              <p className="mt-4 sm:text-xl sm:leading-relaxed">
                Find all about Pokemons.......
              </p>

              <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
                <div className="w-full md:w-auto ">
                  <Combobox value={selectedPerson} onChange={setSelectedPerson}>
                    <Combobox.Input
                      onChange={(event) => setQuery(event.target.value)}
                      className="text-white border
                       border-blue-500 bg-transparent h-[45px] backdrop-blur-sm rounded placeholder-white w-full md:w-auto "
                      placeholder="Search with Name"
                    />
                    <Combobox.Options className="h-[150px] absolute z-10 overflow-y-scroll text-white scrollbar-thin scrollbar-thumb-red-500 mt-4 flex flex-col justify-start items-start backdrop-blur-lg md:backdrop-blur-none w-[280px] md:w-auto">
                      {filteredPeople.map((person) => (
                        <Combobox.Option
                          className="py-1 cursor-pointer"
                          key={person}
                          value={person}
                        >
                          {person}
                        </Combobox.Option>
                      ))}
                    </Combobox.Options>
                  </Combobox>
                </div>
                <button
                  onClick={findpokemon}
                  className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 md:w-auto"
                >
                  Search
                </button>
              </div>
              {error && (
                <p className="mt-4 ">
                  Pokemon not found...please use drop down list
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      {!showResult && (
        <div>
          <div className="mt-4">
            <h2 className="text-center text-red-500 py-4 text-[1.3rem] md:text-[2rem]">
              Random Pokemons
            </h2>
          </div>

          <div className="pt-14 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center z-0 ">
            {pokemonList.map((pokemon, i) => (
              <Link key={i} to={`/pokemon/${pokemon.id}`} state={pokemon}>
                <Card
                  imgsrc={pokemon?.PokemonImgSrc}
                  name={pokemon.pokemonName}
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
                className={`flex items-center px-4 py-2 mx-1 text-white border border-gray-400 dark:border-gray-800 rounded-md dark:text-gray-400 hover:scale-105 ${
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
      )}

      {showResult && (
        <div className="w-full flex justify-center items-center mt-6">
          <div className="flex flex-col justify-center items-center">
            <Link to={`/pokemon/${searchPokemon.id}`} state={searchPokemon}>
              <Card
                imgsrc={searchPokemon?.PokemonImgSrc}
                name={searchPokemon.pokemonName}
              />
            </Link>
            <button
              onClick={() => setShowResult(false)}
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto mt-4"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
