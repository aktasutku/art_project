import React, { useEffect } from "react";
import "./ShoppingBagPage__Item.css";
import { useSelector, useDispatch } from "react-redux";
//MUI
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";

import {
  updateExistingCartItemQty,
  selectAllCartItems,
  removeCartItem,
} from "../app/features/cartItem/cartItemSlice";
import { useState } from "react";
// import {  } from "../app/features/counter/cartCounterSlice";

const ShoppingBagPage__Item = ({
  id,
  title,
  eachPrice,
  qty,
  totalPrice,
  itemImg,
  theme,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectAllCartItems);
  const [itemQty, setItemQty] = useState(qty);
  const [total, setTotal] = useState(totalPrice);

  useEffect(() => {
    setTotal(itemQty * eachPrice);
  }, [itemQty]);

  const handleUpdate = () => {
    dispatch(updateExistingCartItemQty(id, itemQty, total));
  };

  const handleRemove = () => {
    dispatch(removeCartItem(id));
  };

  return (
    <div className="ShoppingBagPage__Item">
      <div className="ShoppingBagPage__Item__section">
        <div className="ShoppingBagPage__Item__img">
          <img src={itemImg} />
        </div>
        <h2>{title}</h2>
      </div>
      <div className="ShoppingBagPage__Item__price">
        <div className="sip__each">
          <h3>Each</h3>
          <p>$ {eachPrice}</p>
        </div>
        <div className="sip__quantity">
          <h3>Quantity</h3>
          <input
            type="number"
            defaultValue={itemQty}
            min={0}
            onChange={(e) => setItemQty(e.target.value)}
          />
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              onClick={handleUpdate}
              sx={{
                color: "#FFF",
                letterSpacing: 2,
                fontSize: 12,
                fontWeight: 400,
                padding: 0,
                "&:hover": { backgroundColor: "#FFF", color: "#FB8712" },
              }}
            >
              Update
            </Button>
          </ThemeProvider>
        </div>

        <div className="sip__price">
          <h3>Total</h3>
          <p>$ {total}</p>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              onClick={handleRemove}
              sx={{
                color: "#FFF",
                letterSpacing: 2,
                fontSize: 12,
                fontWeight: 400,
                padding: 0,
                "&:hover": { backgroundColor: "#FFF", color: "#FB8712" },
              }}
            >
              Remove
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBagPage__Item;
