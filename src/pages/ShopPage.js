import React, { useState, useEffect } from "react";
import "./ShopPage.css";
import Product_Card from "../components/Product_Card";
//React-Router
import { Link } from "react-router-dom";
//Firebase
import { shopItemsCol } from "../firebase";
import { getDocs } from "firebase/firestore/lite";

//If you want to use Json file fetch data this way
// const myItems = require("../Items.json");
// myItems.items.map(item=>())

const ShopPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [shopItems, setShopItems] = useState([]);

  //fetch data from Firebase for shopItems
  useEffect(() => {
    const getShopItems = async () => {
      const fireStoreData = await getDocs(shopItemsCol);
      setShopItems(
        fireStoreData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getShopItems();
  }, []);

  return (
    <div className="shopPage">
      {shopItems.map((item) => {
        return (
          <Link to={"product/" + item.id} key={item.id}>
            <Product_Card
              // key={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              images={item.images}
              discount={item.discount}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ShopPage;
