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

const AdminPortfolio__Edit = ({ selectedItem }) => {
  // CONTEXT
  const { editActive } = useContext(ActiveAddDeleteEditContext);
  const [editItemActive, setEditItemActive] = editActive;

  // VARIABLES
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState();
  const [newImgURL, setNewImgURL] = useState();
  const [progress, setProgress] = useState(false);
  const [uploaded, setUploaded] = useState("");

  //   FIREBASE VARIABLES
  const storage = getStorage();
  const selectedItemColRef = doc(db, "portfolioItems", selectedItem.id);
  const itemStorageRef = ref(storage, selectedItem.img);
  const newItemStorageRef = ref(
    storage,
    `portfolioItems/${newImage?.name + uuidv4()}`
  );

  console.log(newImage);
  const handleEdit = () => {
    if (newImage) {
      const uploadTask = uploadBytesResumable(newItemStorageRef, newImage);
      deleteObject(itemStorageRef)
        .then(() => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              setProgress(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
            },
            (err) => console.log(err),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                setNewImgURL(url);
                setDoc(selectedItemColRef, {
                  img: url,
                  title: newTitle.length > 0 ? newTitle : selectedItem.title,
                })
                  .then(() => {
                    // alert("Succesfully Added");
                    setUploaded(true);
                  })
                  .catch((err) => console.log(err));
              });
            }
          );
        })
        .catch((err) => console.log(err));
    } else if (!newImage && newTitle.trim() !== "") {
      setDoc(
        selectedItemColRef,
        { title: newTitle.length > 0 ? newTitle.trim() : selectedItem.title },
        { merge: true }
      )
        .then(() => {
          setUploaded(true);
        })
        .catch((err) => console.log(err));
    } else {
      alert("No Changes Made!");
    }
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
        <img src={newImgURL ? newImgURL : selectedItem.img} />
      </div>

      <div className="adminAddDeleteEdit__form">
        <p>Edit Mode</p>
        <div className="adminflexRow">
          <p>Title</p>
          <input
            type="text"
            placeholder={selectedItem.title}
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
          />
          {uploaded && (
            <p className="adminAddDeleteEdit__success">
              {uploaded} <DoneSharpIcon sx={{ color: "green" }} />
            </p>
          )}
        </div>

        <div>
          <label>
            <input
              className="adminAddDeleteEdit__form__file"
              type="file"
              accept="image/*"
              onChange={(e) => setNewImage(e.target.files[0])}
              required
            />
            <UploadIcon sx={{ cursor: "pointer" }} /> Upload Image
          </label>
          {uploaded && (
            <p className="adminAddDeleteEdit__success">
              img status : {progress} % uploaded
              <DoneSharpIcon sx={{ color: "green" }} />
            </p>
          )}
        </div>

        <div className="adminAddDeleteEdit__buttons ">
          <button onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPortfolio__Edit;
