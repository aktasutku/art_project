import React, { useState, useEffect, useContext } from "react";
//MUI
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
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
} from "firebase/storage";
import { db, storage } from "../../../../firebase";
import { ActiveAddDeleteEditContext } from "../../../../app/features/Context/AddEditDeleteActiveCxt";

const AdminPortfolio__Edit = ({ setClose, selectedItem }) => {
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
  const updateSelectedItemColRef = doc(db, "portfolioItems", selectedItem.id);
  const deleteExistingItemStorageRef = ref(storage, selectedItem.img);
  const addNewItemStorageRef = ref(
    storage,
    `portfolioItems/${newImage?.name + uuidv4()}`
  );
  const uploadTask = uploadBytesResumable(addNewItemStorageRef, newImage);

  const handleEdit = () => {
    if (newImage) {
      deleteObject(deleteExistingItemStorageRef)
        .then(() => {
          // If old image deleted from the storage upload new image
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              setProgress(
                // This not working properly sometimes dosent give me the value
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              console.log(snapshot);
            },
            (error) => {
              console.log(error);
            },
            async () => {
              // Get ImageURL
              await getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                  setNewImgURL(downloadURL);
                  //   Update Collection Document
                  setDoc(updateSelectedItemColRef, {
                    img: downloadURL,
                    title: newTitle.length > 0 ? newTitle : selectedItem.title,
                  })
                    .then(() => {
                      alert("Succesfully Added");
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!newImage && newTitle.trim() !== "") {
      setDoc(
        updateSelectedItemColRef,
        { title: newTitle.length > 0 ? newTitle.trim() : selectedItem.title },
        { merge: true }
      )
        .then(() => {
          setUploaded(true);
          alert("Succesfully Added");
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
          <p>Select Img : </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewImage(e.target.files[0])}
            style={{ width: "190px" }}
          />

          {progress && (
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
