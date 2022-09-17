import React from "react";
import ShopCart from "../../components/ShopCart";
import "./Recent.css";

const Recent = () => {
  return (
    <div className="recent">
      <div className="recent__comment">
        <p>
          Recent <br />
          Art Projects
        </p>
        <button>View all Projects</button>
      </div>
      <div className="recent__img">
        <ShopCart />
        <ShopCart />
        <ShopCart />
      </div>
    </div>
  );
};

export default Recent;
