import React, { useEffect } from "react";
import "./ShoppingBagPage__Item.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  setCount,
  setItemTotal,
} from "../app/features/counter/cartCounterSlice";
// import {  } from "../app/features/counter/cartCounterSlice";

const ShoppingBagPage__Item = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);

  const each = 99;
  const [total, setTotal] = useState();

  //set total
  useEffect(() => {
    setTotal(count * each);
  }, [count]);

  const handleChange = (e) => {
    dispatch(setCount(e.target.value));
  };
  return (
    <div className="ShoppingBagPage__Item">
      <div className="ShoppingBagPage__Item_section">
        <div className="ShoppingBagPage__Item__img">
          <img src="https://images.unsplash.com/photo-1618042164219-62c820f10723?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" />
        </div>
        <h2>TitleTitle</h2>
      </div>
      <div className="ShoppingBagPage__Item__price">
        <div className="sip__each">
          <h3>Each</h3>
          <p>$ {each}</p>
        </div>
        <div className="sip__quantity">
          <h3>Quantity</h3>
          <input
            type="number"
            defaultValue={count}
            min={0}
            onChange={handleChange}
          />
        </div>

        <div className="sip__price">
          <h3>Total</h3>
          <p>$ {total}</p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBagPage__Item;
