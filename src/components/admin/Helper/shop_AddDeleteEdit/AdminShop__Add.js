import React, { useState, useContext, useEffect } from "react";
//CONTEXT
import { ActiveAddDeleteEditContext } from "../../../../app/features/Context/AddEditDeleteActiveCxt";
// RANDOM CHARACTERS
import { v4 as uuidv4 } from "uuid";
//MUI
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import UploadIcon from "@mui/icons-material/Upload";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, A11y, EffectFade, Mousewheel } from "swiper";

const AdminShop__Add = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //  VARIABLES
  const [description, setDescription] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(null);
  const [title, setTitle] = useState(null);

  //   CONTEXT VARIABLES
  const { editActive } = useContext(ActiveAddDeleteEditContext);
  const [editItemActive, setEditItemActive] = editActive;

  const handleAdd = (e) => {
    e.preventDefault();
  };
  console.log(images);

  return (
    <div className="adminAddDeleteEdit">
      <div
        className="adminAddDeleteEdit__close"
        onClick={() => setEditItemActive(false)}
      >
        <CloseSharpIcon />
      </div>
      <div className="adminAddDeleteEdit__img">
        <Swiper
          modules={[Navigation, A11y, EffectFade, Mousewheel]}
          slidesPerView={1}
          loop
          zoom={true}
          effect={"fade"}
          navigation
          className="carousel__swiper"
        >
          {images?.map((image) => {
            return (
              <SwiperSlide key={image.name + uuidv4()}>
                <img src={image} alt="" loading="lazy" />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <form className="adminAddDeleteEdit__form" onSubmit={(e) => handleAdd(e)}>
        <p>Add Mode</p>
        <div>
          <label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImages((prev) => [...prev, e.target.files[0]])
              }
              required
            />
            <UploadIcon sx={{ cursor: "pointer" }} /> Upload Image
          </label>
        </div>
      </form>
    </div>
  );
};

export default AdminShop__Add;
