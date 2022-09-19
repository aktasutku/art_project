import React, { useState } from "react";
import "./ShoppingBagPage.css";
import ShoppingBagPage__Item from "../components/ShoppingBagPage__Item";
import { useDispatch, useSelector } from "react-redux";
import { setItemTotal } from "../app/features/counter/cartCounterSlice";

// Mui Components
import Button from "@mui/material/Button";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect } from "react";

const ShoppingBagPage = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#FB8712",
      },
      secondary: {
        main: "#FFF",
      },
    },
    typography: {
      fontFamily: ["DynaPuff"],
    },
  });
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);
  const itemTotal = useSelector((state) => state.counter.itemTotal);

  const discount = -25.99;
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    setSubTotal(total + discount);
  }, [total, discount]);
  return (
    <div className="ShoppingBagPage">
      <div className="ShoppingBagPage__Items">
        <h1>
          <ShoppingCartOutlinedIcon sx={{ fontSize: "40px" }} />
          My Cart
        </h1>
        {/* when you map include hr too */}
        <hr />
        <ShoppingBagPage__Item />
      </div>

      <div className="ShoppingBagPage__Checkout">
        <div className="ShoppingBagPage__Checkout__detail">
          <div className="sip__checkout">
            <p>Items ({count})</p>
            <p>$ {itemTotal}</p>
          </div>
          <div className="sip__checkout">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="sip__checkout">
            <p>Discount</p>
            <p>$ {discount}</p>
          </div>
        </div>
        <div className="ShoppingBagPage__Checkout__subtotal">
          <div className="sip__checkout">
            <p>SubTotal</p>
            <p>$ {subTotal}</p>
          </div>
        </div>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            // startIcon={<AddShoppingCartIcon />}
            sx={{
              color: "#FFF",
              letterSpacing: 3,
              "&:hover": { backgroundColor: "#FFF", color: "#FB8712" },
            }}
          >
            Go To Checkout
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default ShoppingBagPage;
