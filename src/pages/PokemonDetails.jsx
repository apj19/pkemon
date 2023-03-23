import React from "react";
import { useLocation, useParams } from "react-router-dom";
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

function PokemonDetails() {
  let { pokemonname } = useParams();
  const [pokemonMasterData, setPokemonMaterData] = useState({
    states: [],
    moves: [],
    strength: [],
    weakness: [],
  });
  const [pokemonList, setPokemonList] = useState([]);
  const [showLoder, setShowLoader] = useState(false);
  const [textColor, setTextColor] = useState();
  const urlState = useLocation();
  let urlstateName = urlState.state.pokemonName;
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
    const pdata = await axios.get(pokemonDetailsApi);

    // console.log(pdata.data.name);
    pokemonAllData.name = pdata.data.name;
    // console.log("Pokemon-name", pokemonname);
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
    const spaciesdata = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonname.toLowerCase()}`
    );
    // console.log("is legendary", spaciesdata.data.is_legendary);
    pokemonAllData.isLegendary = spaciesdata.data.is_legendary;
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

  async function setAllData() {
    await loadAllData();
    setPokemonList(evoluationPokemonData);
    setPokemonMaterData(pokemonAllData);
    setTextColor(`${pokemontypeColor[`${pokemonAllData.type}`]}`);
  }

  useEffect(() => {
    setAllData();
  }, []);

  return (
    <div className="pt-14 pl-14  ">
      {showLoder && (
        <div className="absolute w-full h-full backdrop-blur-lg   flex justify-center items-center z-10 left-0 top-0">
          <ClimbingBoxLoader color="#36d7b7" />
        </div>
      )}
      <div className="flex gap-4">
        <div className="flex flex-col mb-16 justify-center items-center rounded-md   border backdrop-blur-lg drop-shadow-lg hover:drop-shadow-2xl">
          <img
            className="w-[300px] h-[300px]"
            src={pokemonMasterData.imgsrc}
            alt="not found"
          />
          <p>{pokemonMasterData.name}</p>
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
            <p>
              <i class="fa-solid fa-circle" style={{ color: textColor }}></i>
              Height : {pokemonMasterData.height} m
            </p>
            <p>
              <i class="fa-solid fa-circle" style={{ color: textColor }}></i>
              Weight : {pokemonMasterData.weight} m
            </p>
          </div>

          {/* {console.log("masterDataLoaded", pokemonMasterData)} */}
          <div>
            {pokemonMasterData.states.map((m, i) => (
              <div key={i * 1.23} className="flex gap-2">
                <p>{m.stateName}</p>
                <p>{stateicons[i]}</p>
                <p>{m.stateValue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mb-8">
        <p className="">Moves :-</p>
        {pokemonMasterData.moves.map((m, i) => (
          <p key={m}>{m}</p>
        ))}
      </div>

      <div>
        <p>Strength</p>
        {pokemonMasterData.strength.map((m, i) => (
          <button
            key={m}
            className="rounded-md  px-3.5 py-1.5 text-base font-semibold leading-7 text-black "
            style={{ backgroundColor: `${pokemontypeColor[m]}` }}
          >
            {m}
          </button>
        ))}
      </div>
      <div>
        <p>Weak Against</p>
        {pokemonMasterData.weakness.map((m, i) => (
          <button
            key={m}
            className="rounded-md  px-3.5 py-1.5 text-base font-semibold leading-7 text-black "
            style={{ backgroundColor: `${pokemontypeColor[m]}` }}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {pokemonList.map((pokemon, i) => (
          // <Link key={i} to={`/pokemon/${pokemon.pokemonName}`}>
          //   <Card imgsrc={pokemon?.PokemonImgSrc} name={pokemon.pokemonName} />
          // </Link>
          <Card
            key={i}
            imgsrc={pokemon?.PokemonImgSrc}
            name={pokemon.pokemonName}
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonDetails;
