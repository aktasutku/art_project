import React, { useContext, useState } from "react";
import "./AdminImgCard.css";
//REACT ROUTER DOM
import { useLocation } from "react-router-dom";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, A11y, EffectFade, Mousewheel } from "swiper";
// CONTEXT
import { SelectedItemCtx } from "../../../app/features/Context/selectedItemCtx";

const AdminImgCard = ({ item, imageUrl, imagesUrl }) => {
  const url = useLocation();
  const pathname = url.pathname;

  const [selectedItem, setSelectedItem] = useContext(SelectedItemCtx);

  return (
    <div
      className={`AdminImgCard ${item.id == selectedItem.id && "active"}`}
      // onClick={() => sendSelected(item)}
      onClick={() => setSelectedItem(item)}
    >
      {pathname.includes("portfolio") ? (
        <img src={imageUrl} loading="lazy" alt="" />
      ) : (
        <Swiper
          modules={[Navigation, A11y, EffectFade, Mousewheel]}
          slidesPerView={1}
          loop
          zoom={true}
          effect={"fade"}
          navigation
          className="carousel__swiper"
        >
          {imagesUrl?.map((image) => (
            <SwiperSlide key={image}>
              <img src={image} alt="" loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default AdminImgCard;
