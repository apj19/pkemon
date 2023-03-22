import React from "react";

function Card({ imgsrc, name, textColor }) {
  return (
    <div className="animate-scale-up-hor-center flex flex-col justify-center items-center rounded-md w-[200px] h-[200px] bg-white drop-shadow-lg hover:drop-shadow-2xl cursor-pointer">
      <img
        className="w-[150px] h-[150px]"
        src={imgsrc == null ? "../ball.png" : imgsrc}
        alt="Not Found"
      />
      <p
        className="animate-tracking-in-expand tracking-wider"
        style={{ color: textColor }}
      >
        {name}
      </p>
    </div>
  );
}

export default Card;
