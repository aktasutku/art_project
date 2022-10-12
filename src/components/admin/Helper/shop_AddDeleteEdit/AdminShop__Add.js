import React, { useState, useContext, useEffect } from "react";
//CONTEXT
import { ActiveAddDeleteEditContext } from "../../../../app/features/Context/AddEditDeleteActiveCxt";
// RANDOM CHARACTERS
import { v4 as uuidv4 } from "uuid";
//MUI
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import UploadIcon from "@mui/icons-material/Upload";
import { TextField } from "@mui/material";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, A11y, EffectFade, Mousewheel } from "swiper";
// FIREBASE
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage, shopItemsCol } from "../../../../firebase";
import { addDoc } from "firebase/firestore";

const AdminShop__Add = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //  For Firebase VARIABLES
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState("");
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  // Local VARIABLES
  const [localImages, setLocalImages] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  //   CONTEXT VARIABLES
  const { addActive } = useContext(ActiveAddDeleteEditContext);
  const [addItemActive, setAddItemActive] = addActive;
  // FIREBASE TOOLS
  const [storageImgsRef, setStorageImgsRef] = useState([]);
  const [storageImgsURL, setStorageImgsURL] = useState([]);

  const handleCleanForm = (e) => {
    e.preventDefault();
    setImages([]);
    setTitle("");
    setPrice("");
    setDiscount(0);
    setDescription("");
    setUploaded(false);
    setLocalImages([]);
  };
  useEffect(() => {
    let imgName = localImages[localImages.length - 1]?.name;
    if (imgName !== undefined) {
      setStorageImgsRef((prev) => [
        ...prev,
        ref(storage, `ShopImages/${imgName + uuidv4()}`),
      ]);
    }
  }, [localImages]);

  const handleAdd = (e) => {
    e.preventDefault();

    Promise.all(
      storageImgsRef.map((imgStorageRef) => {
        const image = localImages[storageImgsRef.indexOf(imgStorageRef)];
        const uploadTask = uploadBytesResumable(imgStorageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setStorageImgsURL((prev) => [...prev, url]);
            });
          }
        );
      })
    ).then(() => addToCol());

    const addToCol = () => {
      addDoc(shopItemsCol, {
        description: description,
        discount: discount,
        price: price,
        title: title,
        images: [storageImgsURL.map((url) => url)],
      });
    };
  };

  return (
    <div className="adminAddDeleteEdit">
      <div
        className="adminAddDeleteEdit__close"
        onClick={() => setAddItemActive(false)}
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
          {localImages?.map((image) => (
            <SwiperSlide key={image.name + uuidv4()}>
              <img src={URL.createObjectURL(image)} alt="" loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* ADD ITEM FORM */}
      <form className="adminAddDeleteEdit__form" onSubmit={(e) => handleAdd(e)}>
        {/*Add PANEL TITLE */}
        <div className="adminAdddeleteEdit__formTitle">
          <p>Add Mode</p>
          {uploaded && (
            <p className="adminAddDeleteEdit__success">
              ( {uploaded} <DoneSharpIcon sx={{ color: "green" }} />
              Uploaded)
            </p>
          )}
        </div>
        {/* ADD IMAGE */}
        <div>
          <label>
            <input
              className="adminAddDeleteEdit__form__file"
              type="file"
              accept="image/*"
              onChange={(e) => {
                e.target.files[0] &&
                  setLocalImages((prev) => [...prev, e.target.files[0]]);
              }}
              required
            />
            <UploadIcon sx={{ cursor: "pointer" }} />
            {localImages.length > 0
              ? `-${localImages.length}- Img Uploaded`
              : "Upload Img"}
          </label>
        </div>
        {/* TITLE */}
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
          placeholder="Title"
        />
        {/* PRICE */}
        <input
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          required
          placeholder="Price"
          min="0"
        />
        {/* DISCOUNT */}
        <input
          type="number"
          onChange={(e) => setDiscount(e.target.value)}
          value={discount}
          placeholder="Discount"
          min="0"
        />
        {/* DESCRIPTION */}
        <textarea
          rows="5"
          placeholder="Description..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <div className="adminAddDeleteEdit__buttons adminflexRow">
          {!uploaded && <button type="submit">Add</button>}
          <button onClick={handleCleanForm}>Clear Form</button>
        </div>
      </form>
    </div>
  );
};

export default AdminShop__Add;
