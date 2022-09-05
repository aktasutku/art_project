import React from "react";
import "./ShopCart.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const ShopCart = (props) => {
  return (
    <div className="shopCart">
      <img src={props.image} />
      <button>{props.name}</button>
    </div>
  );
};

export default ShopCart;
