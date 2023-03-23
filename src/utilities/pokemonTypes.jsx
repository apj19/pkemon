const pokemonTypes = [
  "normal",
  "fighting",
  "flying",
  "poison",
  "ground",
  "rock",
  "bug",
  "ghost",
  "steel",
  "fire",
  "water",
  "grass",
  "electric",
  "psychic ",
  "ice",
  "dragon",
  "fairy",
];

const pokemontypeColor = {
  grass: "#8bbe8a",
  fire: "#ffa756",
  water: "#58abf6",
  bug: "#8bd674",
  normal: "#b5b9c4",
  poison: "#9f6e97",
  electric: "#f2cb55",
  ground: "#f78551",

  fairy: "#eba8c3",

  flying: "#748fc9",

  fighting: "#eb4971",

  rock: "#6f6e78",

  ice: "#91d8df",

  psychic: "#ff6568",
  dragon: "#7383b9",
  ghost: "#8571be",
  steel: "#4c91b2",
  default: "#fafafa",
};
const stateicons = [
  <i className="fa-solid fa-heart text-green-600"></i>,
  <i className="fa-solid fa-fire text-red-400"></i>,
  <i className="fa-solid fa-shield text-blue-400"></i>,
  <i className="fa-solid fa-fire text-red-600"></i>,
  <i className="fa-solid fa-shield text-blue-600"></i>,

  <i className="fa-solid fa-bolt text-yellow-600 "></i>,
];
export { pokemonTypes, pokemontypeColor, stateicons };
