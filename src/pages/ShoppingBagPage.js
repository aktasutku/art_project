import React from "react";
import "./ShoppingBagPage.css";
import ShoppingBagPage__Item from "../components/ShoppingBagPage__Item";

// Mui Components
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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
            <p>Items (8)</p>
            <p>$ 53</p>
          </div>
          <div className="sip__checkout">
            <p>Shipping</p>
            <p>Free</p>
          </div>
          <div className="sip__checkout">
            <p>Discount</p>
            <p>$ -25.49</p>
          </div>
        </div>
        <div className="ShoppingBagPage__Checkout__subtotal">Subtotal</div>
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
