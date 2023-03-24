import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import LeftNav from "./LeftNav";

import { pokemonTypes } from "../utilities/pokemonTypes";
import { pokemontypeColor } from "../utilities/pokemonTypes";

function TopNav() {
  const [showToggle, setShowToggle] = useState(false);

  function changToggel() {
    if (showToggle) {
      setShowToggle(false);
    } else {
      setShowToggle(true);
    }
  }
  return (
    <div className="fixed z-10 top-0 left-0 w-full px-4 py-2 flex justify-between items-center text-white ">
      <Link to="/">
        <img className="h-[40px]" src="../logo.png" alt="" />
      </Link>

      <i
        onClick={changToggel}
        className="fa-solid fa-bars text-[1.5rem] text-white cursor-pointer"
      ></i>
      {showToggle && (
        <div
          onClick={changToggel}
          className="  w-full h-full border border-red-500 fixed left-0 top-0 backdrop-blur-sm flex"
        >
          <div className="w-[40%] md:w-[80%]">1</div>
          <div className="min-w-[150px] w-[60%] md:w-[20%]">
            <div className="h-[50px] text-white flex justify-center items-center cursor-pointer">
              <i className="fa-solid fa-xmark text-[1.5rem]  "></i>
            </div>
            <LeftNav />
          </div>
        </div>
      )}
    </div>
  );
}

export default TopNav;
