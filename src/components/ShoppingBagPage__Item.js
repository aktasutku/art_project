import React, { useEffect } from "react";
import "./ShoppingBagPage__Item.css";
import { useSelector, useDispatch } from "react-redux";
//MUI
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";

import {
  updateExistingCartItem,
  selectAllCartItems,
  removeItemFromCart,
} from "../app/features/cartItem/cartItemSlice";
import { useState } from "react";

const ShoppingBagPage__Item = ({
  id,
  title,
  eachPrice,
  qty,
  totalPrice,
  itemImg,
  discount,
  discountedPrice,
  theme,
}) => {
  const buttonStyle = {
    color: "#FFF",
    letterSpacing: 2,
    fontSize: 12,
    fontWeight: 400,
    padding: 0,
    "&:hover": { backgroundColor: "#FFF", color: "#FB8712" },
  };
  const dispatch = useDispatch();
  const cartItems = useSelector(selectAllCartItems);
  const [itemQty, setItemQty] = useState(Number(qty));

  const handleUpdate = () => {
    dispatch(updateExistingCartItem({ id, itemQty }));
  };

  const handleRemove = () => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <ThemeProvider theme={theme}>
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
          <div className="sip__discount">
            <h3>Discount</h3>
            <p>$ {discount}</p>
          </div>
          <div className="sip__quantity">
            <h3>Quantity</h3>
            <input
              type="number"
              defaultValue={itemQty}
              min={0}
              onChange={(e) => setItemQty(Number(e.target.value))}
            />
            <Button variant="contained" onClick={handleUpdate} sx={buttonStyle}>
              Update
            </Button>
          </div>

          <div className="sip__price">
            <h3>Total</h3>
            <p>$ {totalPrice}</p>
            <Button variant="contained" onClick={handleRemove} sx={buttonStyle}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ShoppingBagPage__Item;
