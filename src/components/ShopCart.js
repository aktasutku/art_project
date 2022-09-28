//Main Page element
import React from "react";
import "./ShopCart.css";
import { Link } from "react-router-dom";

const ShopCart = (props) => {
  const link = props.name.toLowerCase().replaceAll(" ", "-");

  return (
    <div className="shopCart">
      <Link to={`/${link}`}>
        <img src={props.image} />
        <button>{props.name}</button>
      </Link>
    </div>
  );
};

export default ShopCart;
