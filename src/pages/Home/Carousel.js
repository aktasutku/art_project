import React from "react";
import "./Carousel.css";

// IMAGES
import b1 from "../../assets/banner_1.png";
import b2 from "../../assets/banner_2.png";
import b3 from "../../assets/banner_3.png";
import b4 from "../../assets/banner_4.png";
import b5 from "../../assets/banner_5.png";

// REACT ICONS
import { FiYoutube } from "react-icons/fi";
import { FaTiktok, FaInstagram } from "react-icons/fa";

// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y, EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/autoplay";
const socialLinks = require("../../social.json");

const Carousel = () => {
  const instagramLink = socialLinks.social[0].instagram;
  const tiktokLink = socialLinks.social[1].tiktok;
  const youtubeLink = socialLinks.social[2].youtube;
  return (
    <div className="carousel">
      <Swiper
        modules={[Navigation, Pagination, A11y, EffectFade, Autoplay]}
        spaceBetween={5}
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop
        zoom={true}
        effect={"fade"}
        navigation
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        autoplay={{
          delay: 20000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: true,
        }}
        className="carousel__swiper"
      >
        <SwiperSlide>
          <img src={b1} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={b2} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={b3} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={b4} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={b5} />
        </SwiperSlide>
        <div className="carousel__social">
          <a href={instagramLink}>
            <FaInstagram className="icon" size="25px" />
          </a>
          <a href={tiktokLink}>
            <FaTiktok className="icon" size="25px" />
          </a>
          <a href={youtubeLink}>
            <FiYoutube className="icon" size="25px" />
          </a>
        </div>
      </Swiper>
    </div>
  );
};

export default Carousel;
