import React from "react";
import "./ShoppingBagPage.css";
import ShoppingBagPage__Item from "../components/ShoppingBagPage__Item";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCartItems } from "../app/features/cartItem/cartItemSlice";

// Mui Components
import Button from "@mui/material/Button";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

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
  const cartItems = useSelector(selectAllCartItems);

  let totalItemsQty = 0;
  let itemsTotalCost = 0;
  let subTotal = 0;

  cartItems.map((item) => {
    totalItemsQty += Number(item.qty);
    itemsTotalCost += item.total;
  });
  //dont take this top of the mapped cartItems
  const discount = totalItemsQty > 0 ? -25.95 : 0;
  subTotal = itemsTotalCost + discount;

  return (
    <div className="ShoppingBagPage">
      <div className="ShoppingBagPage__Items">
        <h1>
          <ShoppingCartOutlinedIcon sx={{ fontSize: "40px" }} />
          My Cart
        </h1>
        {/* when you map include hr too */}
        {cartItems.map((item) => {
          return (
            <>
              <hr />
              <ShoppingBagPage__Item
                key={item.id}
                id={item.id}
                title={item.title}
                eachPrice={item.eachPrice}
                qty={item.qty}
                totalPrice={item.total}
                itemImg={item.img}
                theme={theme}
              />
            </>
          );
        })}
      </div>

      <div className="ShoppingBagPage__Checkout">
        <div className="ShoppingBagPage__Checkout__detail">
          <div className="sip__checkout">
            <p>Items ({totalItemsQty})</p>
            <p>$ {itemsTotalCost}</p>
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
