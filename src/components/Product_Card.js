import React from "react";
import "./Product_Card.css";
// Animete css
import "animate.css";
// Import Swiper React components -- Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, A11y, EffectFade, Mousewheel } from "swiper";

const Product_Card = ({ title, price, description, images, discount }) => {
  return (
    <div className="productCard">
      <div className="productCard__image">
        <Swiper
          modules={[Navigation, A11y, EffectFade, Mousewheel]}
          slidesPerView={1}
          loop
          zoom={true}
          // mousewheel={true}
          effect={"fade"}
          navigation
          className="carousel__swiper"
        >
          {images.map((image) => (
            <SwiperSlide key={image}>
              <img src={image} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="productCard__description">
        <div className="productCard__title">
          <h3>{title}</h3>
          <h5>{description}</h5>
        </div>
        <div className="productCard__price">
          <p>$</p>
          <p>{price - discount}</p>
        </div>
      </div>
    </div>
    // </Link>
  );
};

export default Product_Card;
