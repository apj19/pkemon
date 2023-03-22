import React from "react";
import { Link } from "react-router-dom";

function TopNav() {
  return (
    <div className="fixed top-0 left-0 w-full px-4 py-2 ">
      <Link to="/">
        <img className="h-[40px]" src="../logo.png" alt="" />
      </Link>
    </div>
  );
}

export default TopNav;
