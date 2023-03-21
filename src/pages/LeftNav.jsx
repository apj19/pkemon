import React from "react";
import { Link } from "react-router-dom";
import { pokemonTypes } from "../utilities/pokemonTypes";

function LeftNav() {
  return (
    <div className="fixed left-0 top-10 w-[150px] h-full bg-white pl-4 py-2 overflow-y-scroll scrollbar-hide">
      {pokemonTypes.map((m, i) => (
        <Link key={i} to={`/type/${m}`}>
          <p className="py-2 pl-2">{m}</p>
        </Link>
      ))}
    </div>
  );
}

export default LeftNav;
