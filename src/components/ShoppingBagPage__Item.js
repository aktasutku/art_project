import React from "react";
import "./ShoppingBagPage__Item.css";

const ShoppingBagPage__Item = () => {
  return (
    <div className="ShoppingBagPage__Item">
      <div className="ShoppingBagPage__Item__img">
        <img src="https://images.unsplash.com/photo-1618042164219-62c820f10723?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
      </div>
      <h2>Title</h2>
      <div className="ShoppingBagPage__Item__price">
        <div className="sip__each">
          <h3>Each</h3>
          <p>$ 10</p>
        </div>
        <div className="sip__quantity">
          <h3>Quantity</h3>
          <input type="number" defaultValue={0} min={0}/>
        </div>

        <div className="sip__price">
          <h3>Total</h3>
          <p>$ 257</p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBagPage__Item;
