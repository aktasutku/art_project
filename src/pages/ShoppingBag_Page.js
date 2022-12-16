import React from "react";
import "./ShoppingBag_Page.css";
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
  const totalItemsQty = useSelector((state) => state.cartItems.totalQuantity);

  let itemsTotalCost = 0;
  let subTotal = 0;
  let discount = 0;

  cartItems.map((item) => {
    itemsTotalCost += item.qty * item.price;
    discount += item.discount * item.qty;
  });

  console.log(itemsTotalCost);
  console.log(discount);
  //dont take this top of the mapped cartItems

  subTotal = itemsTotalCost - discount;

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
                eachPrice={item.price}
                qty={item.qty}
                totalPrice={item.totalPrice}
                itemImg={item.images}
                discount={item.discount}
                discountedPrice={item.discountedPrice}
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
            <p>$ {discount * -1}</p>
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
