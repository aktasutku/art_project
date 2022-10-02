import React, { useState, useEffect } from "react";
import "./AdminPortfolioAdd.css";
//MUI
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
//Firebase
import { doc, addDoc } from "firebase/firestore/lite";
import { portfolioItemsCol, storage } from "../../../firebase";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const AdminPortfolioAdd = ({ setClose }) => {
  // VARIABLES
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [imgURL, setImgURL] = useState();
  const [progress, setProgress] = useState();
  const [uploaded, setUploaded] = useState("");

  const handleClose = () => {
    setClose(false);
    setTitle(null);
    setImage(null);
    setProgress(null);
  };
  //ADD-FIREBASE COLLECTION + STORAGE IMG
  const handleAdd = () => {
    const storageRef = ref(storage, `portfolioItems/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log();
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Get ImageURL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgURL(downloadURL);
          // Add new collection document to FIREBASE
          addDoc(portfolioItemsCol, {
            img: downloadURL,
            title: title,
          })
            .then((docRef) => {
              setUploaded("Document succesfully Added");
            })
            .catch((err) => console.log(err));
        });
      }
    );
  };

  return (
    <div className="adminPortfolioAdd">
      <div className="adminPortfolioAdd__close" onClick={handleClose}>
        <CloseSharpIcon />
      </div>
      <div className="adminPortfolioAdd__img">
        <img src={imgURL} />
      </div>
      <div className="adminPortfolioAdd__content">
        <div>
          <p>Select Img : </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
          {progress && (
            <p className="adminPortfolioAdd__upload">
              img status : {progress} % uploaded
              <DoneSharpIcon sx={{ color: "green" }} />
            </p>
          )}
        </div>
        <div>
          <p>Set Title</p>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          {uploaded && (
            <p className="adminPortfolioAdd__upload">
              {uploaded} <DoneSharpIcon sx={{ color: "green" }} />
            </p>
          )}
        </div>
        <div>
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPortfolioAdd;
