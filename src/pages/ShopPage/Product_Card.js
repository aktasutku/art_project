import React from "react";
import "./Product_Card.css";

// Animete css
import "animate.css";

// Import Swiper React components -- Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, A11y, EffectFade, Mousewheel } from "swiper";

const Product_Card = ({ title, price, description }) => {
  const imges = [
    {
      src: "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1598714805247-5dd440d87124?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1657299170207-d6df52b27811?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1574259392081-dbe3c19cd15e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=552&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];
  return (
    <div className="ShopPageCard">
      <div className="ShopPageCard__image">
        <Swiper
          modules={[Navigation, A11y, EffectFade, Mousewheel]}
          slidesPerView={1}
          loop
          zoom={true}
          mousewheel={true}
          effect={"fade"}
          navigation
          className="carousel__swiper"
        >
          {imges.map((item) => (
            <SwiperSlide>
              <img src={item.src} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <img src="https://raw.githubusercontent.com/itbruno/productpreview/master/assets/img/t-shirt.jpg" /> */}
      </div>
      <div className="ShopPageCard__description">
        <div className="ShopPageCard__title">
          <h3>{title}</h3>
          <h5>{description}</h5>
        </div>
        <div className="ShopPageCard__price">
          <p>$</p>
          <p>{price}</p>
        </div>
      </div>
      {/* <div className="ShopPageCard__QuickView">
        <button>View Item</button>
      </div> */}
    </div>
  );
};

export default Product_Card;

// <main role="main">
// <div class="product">
//   <figure>
//     <img
//       src="https://images.unsplash.com/photo-1661762241190-a743eb81fa5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
//       alt="Product Image"
//       class="product-image"
//     />
//   </figure>

//   <div class="product-description">
//     <div class="info">
//       <h1>LOREM IPSUM</h1>
//       <p>
//         Lorem Ipsum is simply dummy printing and typesetting industry
//       </p>
//     </div>

//     <div class="price">89</div>
//   </div>

//   <div class="product-sidebar">
//     <button class="buy">
//       <span>BUY ITEM</span>
//     </button>

//     <button class="info">
//       <span>MORE INFO</span>
//     </button>

//     <button class="size">
//       <span>SIZES</span>
//     </button>

//     <button class="colors">
//       <span>
//         <a href="" class="color black"></a>
//         <a href="" class="color white"></a>
//         <a href="" class="color red"></a>
//       </span>
//     </button>
//   </div>
// </div>
// </main>
