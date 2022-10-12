import React, { useEffect, useState } from "react";
import "./Product_Page.css";
// Import Swiper React components -- Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Mousewheel, Pagination, A11y, EffectFade } from "swiper";
// Mui Components
import Button from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
//Redux
import { useSelector, useDispatch } from "react-redux";
// import { addValue } from "../app/features/counter/cartCounterSlice";
import {
  addItemtoCart,
  updateExistingCartItemQty,
  selectAllCartItems,
} from "../app/features/cartItem/cartItemSlice";
//FIREBASE
import { shopItemsCol } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
//React Router
import { useParams } from "react-router-dom";
// const myItems = require("../Items.json");
//Mui Palette
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

const Product_Page = () => {
  const { id } = useParams();

  const [currentData, setCurrentData] = useState([]);
  const [qty, setQty] = useState(0);
  let total = qty * (currentData.price - currentData.discount);
  //Redux
  const dispatch = useDispatch();
  const cartItems = useSelector(selectAllCartItems);
  const [discountedPrice, setDiscountedPrice] = useState(0);

  //fetch data from Firebase for shopItems
  useEffect(() => {
    const getShopItem = async () => {
      const docRef = doc(shopItemsCol, id);
      const fireStoreData = await getDoc(docRef);
      // console.log(fireStoreData.data());
      setCurrentData({ ...fireStoreData.data(), id: id });
      setDiscountedPrice(
        fireStoreData.data().price - fireStoreData.data().discount
      );
    };
    getShopItem();
  }, []);

  const handleAdd = () => {
    if (qty > 0) {
      if (Boolean(cartItems.find((item) => item.id === currentData.id))) {
        dispatch(updateExistingCartItemQty(currentData.id, qty, total));
      } else {
        dispatch(
          addItemtoCart(
            currentData.id,
            currentData.title,
            currentData.price,
            qty,
            total,
            currentData.images[0],
            currentData.discount,
            discountedPrice
          )
        );
      }
    }

    setQty(0);
  };

  return (
    <div className="product__page">
      <div className="productPage__image">
        <Swiper
          modules={[Navigation, Pagination, A11y, EffectFade, Mousewheel]}
          slidesPerView={1}
          pagination={{ clickable: true, dynamicBullets: true }}
          loop
          zoom={true}
          // mousewheel={true}
          effect={"fade"}
          navigation
          className="carousel__swiper"
        >
          {currentData?.images?.map((image) => (
            <SwiperSlide key={image}>
              <img src={image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="productPage__information">
        <h1>{currentData.title}</h1>
        <div className="productPage__information__price">
          {currentData.discount > 0 ? (
            <>
              <h2 className="strikethrough ">$ {currentData.price}</h2>
              <ArrowRightAltIcon />
              <h2 className="productPage__information__discountedPrice">
                $ {discountedPrice}
              </h2>
            </>
          ) : (
            <h2>$ {currentData.price}</h2>
          )}
        </div>
        <div className="productPage__information__Quantity">
          <p>Qty : </p>
          <input
            type="number"
            min="0"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
          />
        </div>
        <ThemeProvider theme={theme}>
          <Button
            onClick={handleAdd}
            variant="contained"
            startIcon={<AddShoppingCartIcon />}
            sx={{
              maxWidth: 200,
              color: "#FFF",
              letterSpacing: 3,
              "&:hover": { backgroundColor: "#FFF", color: "#FB8712" },
            }}
          >
            Add to Cart
          </Button>
        </ThemeProvider>
        <div className="productPage__information__description">
          <h3>Description</h3>
          <p>{currentData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product_Page;
