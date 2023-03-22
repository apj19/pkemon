import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import TestPage from "./pages/TestPage";
import Test2 from "./pages/Test2";
import Test3 from "./pages/Test3";
import Test4 from "./pages/Test4";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Types from "./pages/Types";
import LeftNav from "./pages/LeftNav";
import TopNav from "./pages/TopNav";
import Evoluation from "./pages/Evoluation";
import PokemonDetails from "./pages/PokemonDetails";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className=" min-w-[375px] font-['Poppins']  max-w-[1440px] bg-[#f1f1f1] text-black p-8">
      <TopNav />
      {/* <LeftNav /> */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="type/:typeName" element={<Types />}></Route>
        <Route path="evoluation" element={<Evoluation />}></Route>
        <Route
          path="/pokemon/:pokemonname"
          element={<PokemonDetails />}
        ></Route>
      </Routes>
    </main>
  );
}

export default App;
