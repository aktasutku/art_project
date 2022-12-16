import React, { useState, useEffect, useContext } from "react";
// MUI
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
// FIREBASE
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject, getStorage } from "firebase/storage";
import { db } from "../../../../firebase";
import { ActiveAddDeleteEditContext } from "../../../../app/Context/AddEditDeleteActiveCxt";
// SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, A11y, EffectFade, Mousewheel } from "swiper";
// RANDOM CHARACTERS
import { v4 as uuidv4 } from "uuid";

const AdminShop__Delete = ({ selectedItem }) => {
  // CONTEXT VARIABLES
  const { deleteActive } = useContext(ActiveAddDeleteEditContext);
  const [deleteItemActive, setDeleteItemActive] = deleteActive;

  // FIREBASE VARIABLES
  const storage = getStorage();
  const selectedItemColRef = doc(db, "shopItems", selectedItem.id);
  const [selectedItemStorageRef, setSelectedItemStorageRef] = useState([]);
  const [activate, setActivate] = useState(false);

  // SET IMAGE STORAGE REF
  useEffect(() => {
    selectedItem?.images.map((image) => {
      setSelectedItemStorageRef((prev) => [...prev, ref(storage, image)]);
    });
  }, []);

  const [deleteButtonActive, setDeleteButtonActive] = useState(false);
  const [deleteSureActive, setDeleteSureActive] = useState(false);

  const handleDelete = () => {
    // DELETE IMG FROM STORAGE
    selectedItemStorageRef.map((imgRef) => {
      deleteObject(imgRef)
        .then(() => {
          //what is this mean utku ?
          // selectedItemStorageRef.indexOf(imgRef) ===
          //   selectedItemStorageRef.length - 1 && setActivate(true);
          setActivate(true);
        })
        .catch((err) => {
          console.log(err);
        });
    });
    setActivate(true);
  };
  useEffect(() => {
    // DELETE COLLECTION DOCUMENT FROM FIRESTORE
    selectedItemColRef &&
      activate === true && // turn this back to true
      deleteDoc(selectedItemColRef)
        .then(() => {
          setDeleteSureActive(true);
          setActivate(false);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [activate]);

  return (
    <div>
      <div className="adminAddDeleteEdit">
        <div
          className="adminAddDeleteEdit__close"
          onClick={() => setDeleteItemActive(false)}
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
            {selectedItem.images?.map((img) => (
              <SwiperSlide key={img.name + uuidv4()}>
                <img src={img} alt="" loading="lazy" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="adminAddDeleteEdit__form ">
          <p>Delete Mode</p>

          <div>
            <p>Title : </p>
            <p>{selectedItem.title}</p>
          </div>
          <div>
            <p>Price : </p>
            <p>${selectedItem.price}</p>
          </div>
          <div>
            <p>Discount : </p>
            <p>${selectedItem.discount}</p>
          </div>
          <div>
            <p>Total : </p>
            <p>${selectedItem.price - selectedItem.discount}</p>
          </div>
          <div>
            <p>Description : </p>
            <textarea
              rows="3"
              defaultValue={selectedItem.description}
              readOnly
            ></textarea>
          </div>

          <div className="adminAddDeleteEdit__buttons">
            {!deleteButtonActive && (
              <button onClick={() => setDeleteButtonActive(true)}>
                Delete
              </button>
            )}
            {deleteButtonActive && (
              <div style={{ display: "flex", gap: "20px" }}>
                {!deleteSureActive && (
                  <button onClick={handleDelete}>
                    Are you Sure (Delete) ?
                  </button>
                )}
                {deleteSureActive && (
                  <p className="adminAddDeleteEdit__success">
                    Deleted
                    <DoneSharpIcon sx={{ color: "green" }} />
                  </p>
                )}
                {!deleteSureActive && (
                  <button onClick={() => setDeleteButtonActive(false)}>
                    Cancel
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminShop__Delete;
