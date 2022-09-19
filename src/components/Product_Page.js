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

//Redux
import { useSelector, useDispatch } from "react-redux";
import { addValue } from "../app/features/counter/cartCounterSlice";

//React Router
import { useParams } from "react-router-dom";
const myItems = require("../Items.json");

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

  const [detailData, setDetailData] = useState({});
  const [qty, setQty] = useState(0);

  //Bring the item data by the id
  useEffect(() => {
    myItems.items.map((item) => {
      if (item.id == id) {
        setDetailData(item);
      }
    });
  }, [id]);

  //Redux
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addValue(qty));
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
          {detailData?.images?.map((item) => (
            <SwiperSlide>
              <img src={item.src} key={item.src} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="productPage__information">
        <h1>{detailData.title}</h1>
        <h2>$ {detailData.price}</h2>
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
          <p>{detailData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Product_Page;

// const [title, price, description] = [
//   "Title",
//   90,
//   "qwertyuiopqwertyuiopqwertyuiopqyuiopqwertyuioyuiopqwertyuioyuiopqwertyuioyuiopqwertyuioyuiopqwertyuiyuiopqwertyuioyuiopqwertyuioyuiopqwertyuioyuiopqwertyuioyuiopqwertyuioyuiopqwertyuiooyuiopqwertyuiowertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop",
// ];
// const imges = [
//   {
//     src: "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1598714805247-5dd440d87124?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1657299170207-d6df52b27811?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=552&q=80",
//   },
//   {
//     src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//   },
// ];
