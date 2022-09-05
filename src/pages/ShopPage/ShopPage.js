import React from "react";
import "./ShopPage.css";
import Product_Card from "./Product_Card";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const ShopPage = () => {
  const [title, price, description] = [
    "Title",
    90,
    "qwertyuiopqwertyuiopqwertyuiopqyuiopqwertyuioyuiopqwertyuioyuiopqwertyuioyuiopqwertyuioyuiopqwertyuiyuiopqwertyuioyuiopqwertyuioyuiopqwertyuioyuiopqwertyuioyuiopqwertyuioyuiopqwertyuiooyuiopqwertyuiowertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop",
  ];
  return (
    <div className="shopPage">
      <Link to="/shop/product">
        <Product_Card
          key={title}
          title={title}
          price={price}
          description={description}
        />
      </Link>
      {/* <Product_Card title={title} price={price} description={description} />
      <Product_Card title={title} price={price} description={description} />
      <Product_Card title={title} price={price} description={description} /> */}
    </div>
  );
};

export default ShopPage;
