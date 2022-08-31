import React from "react";
import ShopCart from "./components/ShopCart";
import "./Shop.css";
import ShopImage from "./assets/Shop_side.png";
import imageOne from "./assets/ShopCart1.png"
import imageTwo from "./assets/ShopCart2.png"
import imageThree from "./assets/ShopCart3.png"

const Shop = () => {
  return (
    <div className="shop">
      <div className="halfBG"></div>
      <div className="shop__image">
        <img src={ShopImage} alt="" />
      </div>
      <div className="shop__cart">
        <ShopCart name={"Shop"} image={imageOne}/>
        <ShopCart name={"Costumized Portrait"} image={imageTwo} />
        <ShopCart name={"Portfolio"} image={imageThree}/>
      </div>
    </div>
  );
};

export default Shop;
