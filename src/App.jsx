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
import Footer from "./Components/Footer";
import Legendary from "./pages/Legendary";

function App() {
  const [count, setCount] = useState(0);
  // style={{ backgroundImage: "url(../bg1.jpg)" }}

  return (
    <main className=" min-w-[375px] font-['Poppins']  max-w-[1440px] bg-[#111]  p-8 bg-cover bg-center text-white">
      <TopNav />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="type/:typeName" element={<Types />}></Route>

        <Route
          path="/pokemon/:pokemonname"
          element={<PokemonDetails />}
        ></Route>
        <Route path="/legendary" element={<Legendary />}></Route>
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
