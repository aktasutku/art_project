import React from "react";
import "./Wall.css";
import wallone from "../../assets/wall1.png";
import walltwo from "../../assets/wall2.png";
import wallthree from "../../assets/wall3.png";
import wallfour from "../../assets/wall4.png";

const Wall = () => {
  return (
    <div className="wall">
      <h1>Wall Art Prints</h1>
      <div className="wall__img">
        <img src={wallone} />
        <img src={walltwo} />
        <img src={wallthree} />
        <img src={wallfour} />
      </div>
    </div>
  );
};

export default Wall;
