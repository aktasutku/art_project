import React from "react";
import "./ShopPage.css";
import Product_Card from "../components/Product_Card";
import { Link } from "react-router-dom";

const myItems = require("../Items.json");

const ShopPage = () => {
  return (
    <div className="shopPage">
      {myItems.items.map((item) => {
        return (
          <Link to={"product/" + item.id}>
            <Product_Card
              key={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              images={item.images}
            />
          </Link>
        );
      })}
      {/* <Product_Card title={title} price={price} description={description} />
      <Product_Card title={title} price={price} description={description} />
      <Product_Card title={title} price={price} description={description} /> */}
    </div>
  );
};

export default ShopPage;
