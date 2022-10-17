import React, { useState, useEffect, useContext } from "react";

//MUI
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import UploadIcon from "@mui/icons-material/Upload";
// random id generator
import { v4 as uuidv4 } from "uuid";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, A11y, EffectFade, Mousewheel } from "swiper";
//Firebase
import {
  doc,
  getFirestore,
  addDoc,
  collection,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { db } from "../../../../firebase";
import { ActiveAddDeleteEditContext } from "../../../../app/features/Context/AddEditDeleteActiveCxt";

const AdminShop__Edit = ({ selectedItem }) => {
  // CONTEXT
  const { editActive } = useContext(ActiveAddDeleteEditContext);
  const [editItemActive, setEditItemActive] = editActive;

  // VARIABLES
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImages, setNewImages] = useState();
  const [newImgsURL, setNewImgsURL] = useState();
  const [progress, setProgress] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  //   FIREBASE
  const storage = getStorage();
  const selectedItemColRef = doc(db, "shopItems", selectedItem.id);
  const itemStorageRef = ref(storage, "ShopImages", selectedItem.img);
  const newItemStorageRef = ref(
    storage,
    `ShopImages/${newImages?.name + uuidv4()}`
  );

  const handleCleanForm = () => {
    setNewTitle("");
    setNewDescription("");
    setNewDiscount("");
    setNewPrice("");
    setNewImages();
    setNewImgsURL("");
    setProgress(false);
    setUploaded(false);
  };
  const handleEdit = (e) => {
    e.preventDefault();
  };

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
          {selectedItem?.images.map((image) => (
            <SwiperSlide key={image.name + uuidv4()}>
              <img src={image} alt="" loading="lazy" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* ADD ITEM FORM */}
      <form
        className="adminAddDeleteEdit__form"
        onSubmit={(e) => handleEdit(e)}
      >
        {/*Add PANEL TITLE */}
        <div className="adminAdddeleteEdit__formTitle">
          <p>Add Mode</p>
          {uploaded && (
            <p className="adminAddDeleteEdit__success">
              ( {uploaded} <DoneSharpIcon sx={{ color: "green" }} />
              Added)
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
                  setNewImages((prev) => [...prev, e.target.files[0]]);
              }}
              required
            />
            <UploadIcon sx={{ cursor: "pointer" }} />
            {newImages?.length > 0
              ? `-${newImages?.length}- Img Uploaded`
              : "Upload Img"}
          </label>
        </div>
        {/* TITLE */}
        <input
          type="text"
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          required
          placeholder={selectedItem.title}
        />
        {/* PRICE */}
        <input
          type="number"
          onChange={(e) => setNewPrice(e.target.value)}
          value={newPrice}
          required
          placeholder={selectedItem.price}
          min="0"
        />
        {/* DISCOUNT */}
        <input
          type="number"
          onChange={(e) => setNewDiscount(e.target.value)}
          value={newDiscount}
          placeholder={selectedItem.discount}
          min="0"
        />
        {/* DESCRIPTION */}
        <textarea
          rows="5"
          placeholder={selectedItem.description}
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
        ></textarea>
        <div className="adminAddDeleteEdit__buttons adminflexRow">
          {!uploaded && <button type="submit">Add</button>}
          <button onClick={handleCleanForm}>Clear Form</button>
        </div>
      </form>
    </div>
  );
};

export default AdminShop__Edit;
