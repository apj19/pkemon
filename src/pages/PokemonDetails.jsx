import React from "react";
import { useLocation, useParams, Link, useNavigate } from "react-router-dom";
import {
  getListofEvoluation,
  showPokemons,
} from "../utilities/pokemonfunctions";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../Components/Card";
import { ClimbingBoxLoader } from "react-spinners";
import axios from "axios";
import { pokemontypeColor, stateicons } from "../utilities/pokemonTypes";
import { Tooltip } from "@material-tailwind/react";

function PokemonDetails() {
  let { pokemonname } = useParams();
  const [pokemonMasterData, setPokemonMaterData] = useState({
    states: [],
    moves: [],
    strength: [],
    weakness: [],
    abilities: [],
  });
  const [pokemonList, setPokemonList] = useState([]);
  const [showLoder, setShowLoader] = useState(false);
  const [textColor, setTextColor] = useState();
  const urlState = useLocation();
  const navigate = useNavigate();
  // console.log(urlState);
  let urlstateName = "";
  if (urlState.state != null) {
    urlstateName = urlState.state.pokemonName;
  }
  // console.log(pokemonname);
  // console.log(urlState.state);

  let pokemonAllData = {};
  let evoluationPokemonData;
  let nameForspecisapi = pokemonname;
  if (urlstateName.includes("-")) {
    let indx = urlstateName.indexOf("-");
    nameForspecisapi = urlstateName.slice(0, indx);
  }

  const evoluationApi = `https://pokeapi.co/api/v2/pokemon-species/${nameForspecisapi.toLowerCase()}`;
  const pokemonDetailsApi = `https://pokeapi.co/api/v2/pokemon/${pokemonname.toLowerCase()}`;

  async function loadAllData() {
    setShowLoader(true);
    let pdata;
    try {
      pdata = await axios.get(pokemonDetailsApi);
    } catch (error) {
      navigate("/notfound");
      pdata = null;
    }
    if (pdata != null) {
      pokemonAllData.name = pdata.data.name;

      let imagesrc =
        pdata.data.sprites.other.dream_world.front_default ||
        pdata.data.sprites.other.home.front_default ||
        pdata.data.sprites.other.home.front_shiny;
      // console.log(imagesrc);
      pokemonAllData.imgsrc = imagesrc;
      // console.log("imagelink", imagesrc);
      const rawheight = pdata.data.height;
      const rawweight = pdata.data.weight;
      pokemonAllData.height = rawheight / 10;
      pokemonAllData.weight = rawweight / 10;
      // console.log("height in m", Math.floor(rawheight / 10));
      // console.log("weight in kg", Math.floor(rawweight / 10));
      /////------is legendary-----------------------
      pokemonAllData.isLegendary = false;
      // const spaciesdata = await axios.get(
      //   `https://pokeapi.co/api/v2/pokemon-species/${pokemonname.toLowerCase()}`
      // );
      // if (spaciesdata.status != 200) {
      //   pokemonAllData.isLegendary = false;
      // } else {
      //   pokemonAllData.isLegendary = spaciesdata.data.is_legendary;
      // } // console.log("is legendary", spaciesdata.data.is_legendary);

      ///---------abilites--------------
      const abilityList = pdata.data.abilities;
      // // console.log(abilityList);
      // abilityList.forEach((e) => {
      //   // console.log(e.ability.name);
      //   // console.log(e.ability.url);
      // });

      const promises = abilityList.map(async (e) => {
        const result = await axios.get(e.ability.url);
        // console.log(result.data.flavor_text_entries[0]);
        // return result.data.flavor_text_entries[0].flavor_text;
        return {
          ablityName: e.ability.name,
          explation: result.data.flavor_text_entries[0].flavor_text,
        };
      });

      const results = await Promise.all(promises);
      pokemonAllData.abilities = results;
      // console.log("Ability List", results);

      //----------------------Strength & weakness-----------------------
      const typename = pdata.data.types[0].type.name;
      const typeUrl = pdata.data.types[0].type.url;
      pokemonAllData.type = typename;
      // console.log("pokemontype", typename);
      // // console.log(typeUrl);
      const powerData = await axios.get(typeUrl);
      // // console.log(powerData.data.damage_relations);
      const strong = powerData.data.damage_relations.double_damage_to;
      const strength = [];
      strong.forEach((e) => {
        strength.push(e.name);
      });
      // console.log("strong against", strength);
      pokemonAllData.strength = strength;
      const weak = powerData.data.damage_relations.double_damage_from;
      const weakness = [];
      weak.forEach((e) => {
        weakness.push(e.name);
      });
      pokemonAllData.weakness = weakness;
      // console.log("weak against", weakness);
      /////-----------------moves 5------------
      const movearray = pdata.data.moves;
      const topMoves = [];
      for (let i = 0; i < 5; i++) {
        // movearray[i].move.name;
        topMoves.push(movearray[i].move.name);
      }
      pokemonAllData.moves = topMoves;
      // console.log("top Moves", topMoves);

      /////-------------------------------------------------
      const pstates = pdata.data.stats;
      const statesData = [];
      pstates.forEach((e) => {
        statesData.push({ stateName: e.stat.name, stateValue: e.base_stat });
      });
      pokemonAllData.states = statesData;
      // console.log("stats", statesData);
      //-------------------------------------------------
      // console.log(pstates);
      ///-----evoluation data-----------
      const evoluationList = await getListofEvoluation(evoluationApi);
      // console.log("Evoluation means getlist success -", evoluationList);
      evoluationPokemonData = await showPokemons(evoluationList);
      // console.log(evoluationPokemonData);

      if (evoluationPokemonData.status == 404) {
        evoluationPokemonData = [];
        setPokemonList(evoluationPokemonData);
      }

      // setPokemonList(evoluationPokemonData);
      // setPokemonMaterData(pokemonAllData);
      // setTextColor(`${pokemontypeColor[`${pokemonAllData.type}`]}`);
      // console.log(pokemonAllData);
      setShowLoader(false);
      // console.log("evoluation-data success", evoluationPokemonData);
      // setPokemonList(evoluationPokemonData);
    }
  }

  async function setAllData() {
    await loadAllData();
    setPokemonList(evoluationPokemonData);
    setPokemonMaterData(pokemonAllData);
    setTextColor(`${pokemontypeColor[`${pokemonAllData.type}`]}`);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setAllData();
  }, [urlstateName]);

  return (
    <div className="pt-14 md:pl-14  ">
      {showLoder && (
        <div className="absolute w-full h-full backdrop-blur-lg   flex justify-center items-center z-10 left-0 top-0">
          <ClimbingBoxLoader color="#36d7b7" />
        </div>
      )}
      <div className="flex flex-col justify-center items-center md:flex-row  gap-16 border-b mb-8 border-white">
        <div className="flex flex-col mb-8 justify-center items-center rounded-md   drop-shadow-lg hover:drop-shadow-2xl">
          <img
            className="w-[300px] h-[300px]"
            src={pokemonMasterData.imgsrc}
            alt="not found"
          />
          <p className="text-[1.2rem]" style={{ color: textColor }}>
            {pokemonMasterData.name}
          </p>
        </div>
        <div>
          <div className="flex gap-16 mb-8">
            <p
              className="uppercase tracking-widest text-[1.5rem]"
              style={{ color: textColor }}
            >
              {pokemonMasterData.name}
            </p>
            <button
              className="rounded-md  px-3.5 py-1.5 text-base font-semibold leading-7 text-black "
              style={{ backgroundColor: textColor }}
            >
              {pokemonMasterData.type}
            </button>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 justify-center items-center">
              <i
                className="fa-solid fa-circle"
                style={{ color: textColor }}
              ></i>
              <p>Height : {pokemonMasterData.height} m</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <i
                className="fa-solid fa-circle"
                style={{ color: textColor }}
              ></i>
              <p>Weight : {pokemonMasterData.weight} kg</p>
            </div>
          </div>

          {/* {console.log("masterDataLoaded", pokemonMasterData)} */}
          <div className="flex flex-wrap justify-center items-start gap-4 mt-4">
            {pokemonMasterData.states.map((m, i) => (
              <div
                key={i * 1.23}
                className="flex gap-2 justify-center items-center"
              >
                {/* <p>{m.stateName}</p> */}
                <Tooltip content={m.stateName}>
                  <p className="text-[1.5rem] cursor-pointer">
                    {stateicons[i]}
                  </p>
                </Tooltip>
                <p>{m.stateValue}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <p className="text-[1.2rem]" style={{ color: textColor }}>
              Abilities
            </p>
            {pokemonMasterData.abilities.map((m, i) => (
              <Tooltip key={m.ablityName} content={m.explation}>
                <p className="cursor-pointer">{m.ablityName}</p>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        <p className="text-[1.2rem]" style={{ color: textColor }}>
          Moves :-
        </p>
        {pokemonMasterData.moves.map((m, i) => (
          <p key={m}>{m},</p>
        ))}
      </div>

      <div className="mb-4">
        <p style={{ color: textColor }} className="mb-2 text-[1.2rem]">
          Strong Against
        </p>
        {pokemonMasterData.strength.map((m, i) => (
          <button
            key={m}
            className="rounded-md  px-3.5 py-1.5 mr-4 text-base font-semibold leading-7 text-black "
            style={{ backgroundColor: `${pokemontypeColor[m]}` }}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="mb-4">
        <p style={{ color: textColor }} className="mb-2 text-[1.2rem]">
          Weak Against
        </p>
        {pokemonMasterData.weakness.map((m, i) => (
          <button
            key={m}
            className="rounded-md  px-3.5 py-1.5 mr-4 text-base font-semibold leading-7 text-black "
            style={{ backgroundColor: `${pokemontypeColor[m]}` }}
          >
            {m}
          </button>
        ))}
      </div>
      {pokemonList.length != 0 && (
        <div
          className="text-center text-[1.5rem] border-t border-white py-4"
          style={{ color: textColor }}
        >
          Evolution
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        {pokemonList.map((pokemon, i) => (
          // <Link key={i} to={`/pokemon/${pokemon.pokemonName}`}>
          //   <Card imgsrc={pokemon?.PokemonImgSrc} name={pokemon.pokemonName} />
          // </Link>
          <Link
            key={i}
            to={`/pokemon/${pokemon.id}`}
            state={pokemon}
            className="cursor-pointer"
          >
            <div>
              <Card
                imgsrc={pokemon?.PokemonImgSrc}
                name={pokemon.pokemonName}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PokemonDetails;
