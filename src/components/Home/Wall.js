import React from "react";
import "./Wall.css";
import wallone from "../../assets/wall1.png";
import walltwo from "../../assets/wall2.png";
import wallthree from "../../assets/wall3.png";
import wallfour from "../../assets/wall4.png";
import LazyLoad from "react-lazy-load";

const Wall = () => {
  const images = [wallone, walltwo, wallthree, wallfour];
  return (
    <div className="wall">
      <h1>Wall Art Prints</h1>
      <div className="wall__img">
        {images.map((img) => (
          <LazyLoad key={img}>
            <img src={img} />
          </LazyLoad>
        ))}
      </div>
    </div>
  );
};

export default Wall;
