import React, { useState, useEffect, useContext } from "react";

//MUI
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
import UploadIcon from "@mui/icons-material/Upload";
// random id generator
import { v4 as uuidv4 } from "uuid";
//Firebase
import {
  doc,
  getFirestore,
  addDoc,
  collection,
  setDoc,
  updateDoc,
  Firestore,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { db, storage } from "../../../../firebase";
import { ActiveAddDeleteEditContext } from "../../../../app/Context/AddEditDeleteActiveCxt";

const AdminShop__Edit = ({ selectedItem }) => {
  // CONTEXT
  const { editActive } = useContext(ActiveAddDeleteEditContext);
  const [editItemActive, setEditItemActive] = editActive;

  // VARIABLES
  const [newTitle, setNewTitle] = useState(selectedItem?.title);
  const [newDescription, setNewDescription] = useState(
    selectedItem?.description
  );
  const [newDiscount, setNewDiscount] = useState(selectedItem?.discount);
  const [newPrice, setNewPrice] = useState(selectedItem?.price);
  const [newImages, setNewImages] = useState([]);
  const [newImgsURL, setNewImgsURL] = useState([]);
  const [progress, setProgress] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  //   FIREBASE
  const storage = getStorage();
  const selectedItemColRef = doc(db, "shopItems", selectedItem.id);
  const selectedImgStorageRef = ref(storage, selectedImage);
  const [storageImgsRef, setStorageImgsRef] = useState([]);
  // const newImgStorageRef = ref(
  //   storage,
  //   `ShopImages/${newImages?.name + uuidv4()}`
  // );

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

  // Reserve the spot from storage for upcoming images
  useEffect(() => {
    let imgName = newImages[newImages.length - 1]?.name;
    if (imgName !== undefined) {
      setStorageImgsRef((prev) => [
        ...prev,
        ref(storage, `ShopImages/${imgName + uuidv4()}`),
      ]);
    }
  }, [newImages]);

  const handleEdit = (e) => {
    e.preventDefault();

    storageImgsRef.map((imgStorageRef) => {
      const image = newImages[storageImgsRef.indexOf(imgStorageRef)];
      const uploadTask = uploadBytesResumable(imgStorageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => console.log(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              setNewImgsURL((prev) => [...prev, url]);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      );
    });

    (newDescription !== selectedItem.description ||
      newDiscount !== selectedItem.discount ||
      newPrice !== selectedItem.price ||
      newTitle !== selectedItem.title) &&
      updateDoc(selectedItemColRef, {
        description: newDescription,
        discount: newDiscount,
        price: newPrice,
        title: newTitle,
      });
  };

  useEffect(() => {
    newImgsURL.length > 0 &&
      newImgsURL.length === storageImgsRef.length &&
      updateDoc(selectedItemColRef, {
        images: arrayUnion(...newImgsURL),
      });
  }, [newImgsURL]);

  // useEffect(() => {
  //   newImgsURL.length > 0 &&
  //     newImgsURL.length === storageImgsRef.length &&
  //     updateDoc(selectedItemColRef, {
  //       images: arrayUnion(...newImgsURL),
  //     });
  //   // if new value is not equalt to old value ( if user typed)
  //   (newDescription !== selectedItem.description ||
  //     newDiscount !== selectedItem.discount ||
  //     newPrice !== selectedItem.price ||
  //     newTitle !== selectedItem.title) &&
  //     updateDoc(selectedItemColRef, {
  //       description: newDescription,
  //       discount: newDiscount,
  //       price: newPrice,
  //       title: newTitle,
  //     });
  // }, [newImgsURL, newDescription, newDiscount, newPrice, newTitle]);

  //Delete single image each time
  const handleDeleteImg = () => {
    // DELETE URL FROM COLLECTION
    updateDoc(selectedItemColRef, {
      images: arrayRemove(selectedImage),
    })
      .then(() => {
        console.log("image deleted from array");
      })
      .catch((err) => {
        console.log(err);
      });
    // DELETE FROM STORAGE
    deleteObject(selectedImgStorageRef)
      .then(() => {
        console.log("item deleted from storage");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="adminAddDeleteEdit">
      <div
        className="adminAddDeleteEdit__close"
        onClick={() => setEditItemActive(false)}
      >
        <CloseSharpIcon />
      </div>
      <div className="adminAddDeleteEditShop__img">
        {selectedItem?.images.map((image, i) => {
          return (
            <div
              className={`AdminImgCard ${image == selectedImage && "active"}`}
              onClick={() => setSelectedImage(image)}
              key={i}
            >
              <img src={image} />
            </div>
          );
        })}
        <button className="deleteImg" onClick={handleDeleteImg}>
          Delete Image
        </button>
      </div>
      {/* ADD ITEM FORM */}
      <form
        className="adminAddDeleteEdit__form"
        onSubmit={(e) => handleEdit(e)}
      >
        {/*Add PANEL TITLE */}
        <div className="adminAdddeleteEdit__formTitle">
          <p>Edit Mode</p>
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
        />
        {/* PRICE */}
        <input
          type="number"
          onChange={(e) => setNewPrice(e.target.value)}
          value={newPrice}
          min="0"
        />
        {/* DISCOUNT */}
        <input
          type="number"
          onChange={(e) => setNewDiscount(e.target.value)}
          value={newDiscount}
          min="0"
        />
        {/* DESCRIPTION */}
        <textarea
          rows="5"
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
        ></textarea>
        {/* BUTTONS */}
        <div className="adminAddDeleteEdit__buttons adminflexRow">
          {!uploaded && <button type="submit">Update</button>}
          <button onClick={handleCleanForm}>Clear Form</button>
        </div>
      </form>
    </div>
  );
};

export default AdminShop__Edit;
